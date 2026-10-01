import { useState, useEffect, useCallback, useRef } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc, writeBatch, getDocs, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, SOUVENIR_ITEMS, EVENTS_SCHEDULE, DOWNLOAD_ITEMS, HOT_INFO_ITEMS, BG_IMAGE_1, BG_IMAGE_2, getDirectDriveUrl } from './content';
import { Destination, CultureItem, CulinaryItem, SouvenirItem, EventItem, DownloadItem, HotInfoItem, AppSettings, PendingEventItem } from '../types';
import { deduplicateNewsItems, parseNewsTimestamp } from '../utils/ai';
import { optimizeImageUrl } from '../utils/imageOptimizer';
import { getLocalCache, setLocalCache } from '../utils/localCache';

const CATALOG_CACHE_KEY = 'malala_full_catalog_v2';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours Time-To-Live for public visitors

interface CatalogCachePayload {
  destinations: Destination[];
  cultureItems: CultureItem[];
  culinaryItems: CulinaryItem[];
  souvenirItems: SouvenirItem[];
  eventItems: EventItem[];
  downloadItems: DownloadItem[];
  hotInfoItems: HotInfoItem[];
  appSettings: AppSettings;
}

export function useData() {
  const [destinations, setDestinations] = useState<Destination[]>(DESTINATIONS);
  const [cultureItems, setCultureItems] = useState<CultureItem[]>(CULTURE_ITEMS);
  const [culinaryItems, setCulinaryItems] = useState<CulinaryItem[]>(CULINARY_ITEMS);
  const [souvenirItems, setSouvenirItems] = useState<SouvenirItem[]>(SOUVENIR_ITEMS);
  const [eventItems, setEventItems] = useState<EventItem[]>(EVENTS_SCHEDULE);
  const [pendingEvents, setPendingEvents] = useState<PendingEventItem[]>([]);
  const [downloadItems, setDownloadItems] = useState<DownloadItem[]>(DOWNLOAD_ITEMS);
  const [hotInfoItems, setHotInfoItems] = useState<HotInfoItem[]>(HOT_INFO_ITEMS);
  const [appSettings, setAppSettings] = useState<AppSettings>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('malala_app_settings');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse appSettings from localStorage:', e);
      }
    }
    return {
      bgMediaType: 'image',
      baseImage: BG_IMAGE_1,
      revealImage: BG_IMAGE_2,
      baseVideo: '',
      spotlightDisplayMode: 'both',
      tiketAffiliateId: '6a893170239c5bf8a8b71930',
      travelokaAffiliateId: '',
      activeBookingPartner: 'dual',
      isAutonomousSyncEnabled: true,
    };
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Keep a ref to the latest state for cache synchronization
  const stateRef = useRef<CatalogCachePayload>({
    destinations,
    cultureItems,
    culinaryItems,
    souvenirItems,
    eventItems,
    downloadItems,
    hotInfoItems,
    appSettings,
  });

  useEffect(() => {
    stateRef.current = {
      destinations,
      cultureItems,
      culinaryItems,
      souvenirItems,
      eventItems,
      downloadItems,
      hotInfoItems,
      appSettings,
    };
  }, [destinations, cultureItems, culinaryItems, souvenirItems, eventItems, downloadItems, hotInfoItems, appSettings]);

  // Helper to persist current state to IndexedDB cache
  const persistCurrentToCache = useCallback(async (overrides?: Partial<CatalogCachePayload>) => {
    const payload: CatalogCachePayload = {
      ...stateRef.current,
      ...overrides,
    };
    await setLocalCache(CATALOG_CACHE_KEY, payload);
  }, []);

  // Monitor Firebase Authentication to separate Public visitors from Admin sessions
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setIsAdminLoggedIn(!!user);
    });
    return () => unsubAuth();
  }, []);

  // Transformation helper: map Firestore docs into clean objects with direct image URLs
  const processDestinationDocs = (docs: any[]): Destination[] => {
    const firestoreData = docs
      .map(docSnap => {
        const item = docSnap.data() as Destination;
        return { id: docSnap.id, ...item, imageUrl: item.imageUrl ? getDirectDriveUrl(item.imageUrl) : '' };
      })
      .filter(item => item.title && item.title.trim().length > 0);

    const firestoreIds = new Set(firestoreData.map(d => d.id));
    const missing = DESTINATIONS.filter(d => !firestoreIds.has(d.id));
    const combined = [...firestoreData, ...missing];
    return combined.length > 0 ? combined : DESTINATIONS;
  };

  const processCultureDocs = (docs: any[]): CultureItem[] => {
    const firestoreData = docs
      .map(docSnap => {
        const item = docSnap.data() as CultureItem;
        return { id: docSnap.id, ...item, imageUrl: item.imageUrl ? getDirectDriveUrl(item.imageUrl) : '' };
      })
      .filter(item => item.title && item.title.trim().length > 0);

    const firestoreIds = new Set(firestoreData.map(d => d.id));
    const missing = CULTURE_ITEMS.filter(d => !firestoreIds.has(d.id));
    const combined = [...firestoreData, ...missing];
    return combined.length > 0 ? combined : CULTURE_ITEMS;
  };

  const processCulinaryDocs = (docs: any[]): CulinaryItem[] => {
    const firestoreData = docs
      .map(docSnap => {
        const item = docSnap.data() as CulinaryItem;
        return { id: docSnap.id, ...item, imageUrl: item.imageUrl ? getDirectDriveUrl(item.imageUrl) : '' };
      })
      .filter(item => item.title && item.title.trim().length > 0);

    const firestoreIds = new Set(firestoreData.map(d => d.id));
    const missing = CULINARY_ITEMS.filter(d => !firestoreIds.has(d.id));
    const combined = [...firestoreData, ...missing];
    return combined.length > 0 ? combined : CULINARY_ITEMS;
  };

  const processSouvenirDocs = (docs: any[]): SouvenirItem[] => {
    const firestoreData = docs
      .map(docSnap => {
        const item = docSnap.data() as SouvenirItem;
        return { id: docSnap.id, ...item, imageUrl: item.imageUrl ? getDirectDriveUrl(item.imageUrl) : '' };
      })
      .filter(item => item.title && item.title.trim().length > 0);

    return firestoreData.length > 0 ? firestoreData : SOUVENIR_ITEMS;
  };

  const processEventDocs = (docs: any[]): EventItem[] => {
    const firestoreData = docs
      .map(docSnap => {
        const item = docSnap.data() as EventItem;
        return { id: docSnap.id, ...item, imageUrl: item.imageUrl ? getDirectDriveUrl(item.imageUrl) : '' };
      })
      .filter(item => item.title && item.title.trim().length > 0);

    const firestoreIds = new Set(firestoreData.map(d => d.id));
    const missing = EVENTS_SCHEDULE.filter(d => !firestoreIds.has(d.id));
    const combined = [...firestoreData, ...missing];
    return combined.length > 0 ? combined : EVENTS_SCHEDULE;
  };

  const processDownloadDocs = (docs: any[]): DownloadItem[] => {
    const firestoreData = docs
      .map(docSnap => {
        const item = docSnap.data() as DownloadItem;
        return { id: docSnap.id, ...item };
      })
      .filter(item => item.title && item.title.trim().length > 0);

    return firestoreData.length > 0 ? firestoreData : DOWNLOAD_ITEMS;
  };

  const processHotInfoDocs = (docs: any[]): HotInfoItem[] => {
    const data = docs
      .map(docSnap => {
        const item = docSnap.data() as HotInfoItem;
        let img = item.imageUrl ? getDirectDriveUrl(item.imageUrl).trim() : '';

        const isUserUploaded = Boolean(
          (item as any).isUserUploadedImage === true || 
          (img && img.startsWith('data:image/'))
        );

        if (!isUserUploaded) {
          img = '';
          if (item.imageUrl) {
            updateDoc(docSnap.ref, { imageUrl: '', isUserUploadedImage: false }).catch(() => {});
          }
        }

        return { id: docSnap.id, ...item, imageUrl: img };
      })
      .filter(item => {
        if (!item.title || !item.title.trim()) return false;
        const lower = (item.title + ' ' + (item.description || '') + ' ' + item.id).toLowerCase();
        if (lower.includes('thailand') || lower.includes('bangkok') || lower.includes('phuket') || lower.includes('chiang mai') || item.id.startsWith('th-')) {
          return false;
        }
        return true;
      });

    const mergedList = deduplicateNewsItems([...data, ...HOT_INFO_ITEMS])
      .sort((a: any, b: any) => parseNewsTimestamp(b.date, b.createdAt) - parseNewsTimestamp(a.date, a.createdAt));
    const fallbackSorted = deduplicateNewsItems(HOT_INFO_ITEMS)
      .sort((a: any, b: any) => parseNewsTimestamp(b.date, b.createdAt) - parseNewsTimestamp(a.date, a.createdAt));
    return mergedList.length > 0 ? mergedList : fallbackSorted;
  };

  const processSettingsDoc = (docSnap: any): AppSettings | null => {
    if (!docSnap || !docSnap.exists()) return null;
    const data = docSnap.data() as AppSettings;
    const effectiveMediaType = (data.bgMediaType === 'video' || data.bgMediaType === 'image') ? data.bgMediaType : 'image';
    const effectiveBaseVideo = data.baseVideo || '';
    const effectiveBaseImage = data.baseImage ? optimizeImageUrl(getDirectDriveUrl(data.baseImage), 1920) : BG_IMAGE_1;
    const effectiveRevealImage = data.revealImage ? optimizeImageUrl(getDirectDriveUrl(data.revealImage), 1920) : BG_IMAGE_2;

    const liveSettings: AppSettings = {
      bgMediaType: effectiveMediaType,
      baseImage: effectiveBaseImage,
      revealImage: effectiveRevealImage,
      baseVideo: effectiveBaseVideo,
      spotlightDisplayMode: data.spotlightDisplayMode || 'both',
      featuredVideoEventId: data.featuredVideoEventId || 'auto',
      allowedAdminEmails: data.allowedAdminEmails && data.allowedAdminEmails.length > 0 ? data.allowedAdminEmails : ['aldoaldiles@gmail.com'],
      heroTextColor: data.heroTextColor || '#000000',
      heroTextTheme: data.heroTextTheme || 'black',
      heroTextShadow: data.heroTextShadow !== undefined ? data.heroTextShadow : true,
      tiketAffiliateId: data.tiketAffiliateId || '6a893170239c5bf8a8b71930',
      travelokaAffiliateId: data.travelokaAffiliateId || '',
      activeBookingPartner: data.activeBookingPartner || 'dual',
      isAutonomousSyncEnabled: data.isAutonomousSyncEnabled !== undefined ? data.isAutonomousSyncEnabled : true,
      lastAutonomousSync: data.lastAutonomousSync || '',
    };

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('malala_app_settings', JSON.stringify(liveSettings));
      } catch (e) {}
    }
    return liveSettings;
  };

  // Perform a single, one-time read pass for all collections and persist to local cache
  const fetchFromFirestoreOnce = useCallback(async () => {
    setIsSyncing(true);
    try {
      const [
        destSnap,
        cultSnap,
        culSnap,
        souvSnap,
        evSnap,
        dlSnap,
        hotSnap,
        settSnap,
      ] = await Promise.all([
        getDocs(collection(db, 'destinations')).catch(() => null),
        getDocs(collection(db, 'cultures')).catch(() => null),
        getDocs(collection(db, 'culinaries')).catch(() => null),
        getDocs(collection(db, 'souvenirs')).catch(() => null),
        getDocs(collection(db, 'events')).catch(() => null),
        getDocs(collection(db, 'downloads')).catch(() => null),
        getDocs(collection(db, 'hotinfo')).catch(() => null),
        getDoc(doc(db, 'settings', 'hero')).catch(() => null),
      ]);

      const updatedDest = destSnap && !destSnap.empty ? processDestinationDocs(destSnap.docs) : DESTINATIONS;
      const updatedCult = cultSnap && !cultSnap.empty ? processCultureDocs(cultSnap.docs) : CULTURE_ITEMS;
      const updatedCul = culSnap && !culSnap.empty ? processCulinaryDocs(culSnap.docs) : CULINARY_ITEMS;
      const updatedSouv = souvSnap && !souvSnap.empty ? processSouvenirDocs(souvSnap.docs) : SOUVENIR_ITEMS;
      const updatedEv = evSnap && !evSnap.empty ? processEventDocs(evSnap.docs) : EVENTS_SCHEDULE;
      const updatedDl = dlSnap && !dlSnap.empty ? processDownloadDocs(dlSnap.docs) : DOWNLOAD_ITEMS;
      const updatedHot = hotSnap && !hotSnap.empty ? processHotInfoDocs(hotSnap.docs) : deduplicateNewsItems(HOT_INFO_ITEMS);
      const updatedSett = settSnap ? processSettingsDoc(settSnap) : null;

      setDestinations(updatedDest);
      setCultureItems(updatedCult);
      setCulinaryItems(updatedCul);
      setSouvenirItems(updatedSouv);
      setEventItems(updatedEv);
      setDownloadItems(updatedDl);
      setHotInfoItems(updatedHot);
      if (updatedSett) setAppSettings(updatedSett);

      // Save to local cache
      const cachePayload: CatalogCachePayload = {
        destinations: updatedDest,
        cultureItems: updatedCult,
        culinaryItems: updatedCul,
        souvenirItems: updatedSouv,
        eventItems: updatedEv,
        downloadItems: updatedDl,
        hotInfoItems: updatedHot,
        appSettings: updatedSett || appSettings,
      };
      await setLocalCache(CATALOG_CACHE_KEY, cachePayload);
    } catch (err) {
      console.warn('[useData] fetchFromFirestoreOnce error (using fallback defaults):', err);
    } finally {
      setIsSyncing(false);
    }
  }, [appSettings]);

  // FASE 2: Cache-First strategy for general visitors
  useEffect(() => {
    let isCancelled = false;

    async function initCatalog() {
      // 1. Check local persistent cache
      try {
        const cached = await getLocalCache<CatalogCachePayload>(CATALOG_CACHE_KEY, CACHE_TTL_MS);
        if (cached && !isCancelled) {
          if (cached.destinations?.length) setDestinations(cached.destinations);
          if (cached.cultureItems?.length) setCultureItems(cached.cultureItems);
          if (cached.culinaryItems?.length) setCulinaryItems(cached.culinaryItems);
          if (cached.souvenirItems?.length) setSouvenirItems(cached.souvenirItems);
          if (cached.eventItems?.length) setEventItems(cached.eventItems);
          if (cached.downloadItems?.length) setDownloadItems(cached.downloadItems);
          if (cached.hotInfoItems?.length) setHotInfoItems(cached.hotInfoItems);
          if (cached.appSettings) setAppSettings(cached.appSettings);
          // Cache hit: 0 Firestore reads used!
          return;
        }
      } catch (err) {
        console.warn('[useData] LocalCache read warning:', err);
      }

      // 2. Cache miss or expired: fetch once in background without websocket listener
      if (!isCancelled && !isAdminLoggedIn) {
        await fetchFromFirestoreOnce();
      }
    }

    initCatalog();

    return () => {
      isCancelled = true;
    };
  }, [isAdminLoggedIn, fetchFromFirestoreOnce]);

  // FASE 3: Active Realtime Listeners (ONLY attached when Admin is logged in)
  useEffect(() => {
    if (!isAdminLoggedIn) return;

    // 1. Destinations
    const unsubDest = onSnapshot(collection(db, 'destinations'), (snapshot) => {
      const items = !snapshot.empty ? processDestinationDocs(snapshot.docs) : DESTINATIONS;
      setDestinations(items);
      persistCurrentToCache({ destinations: items });
    }, (err) => console.warn('Admin Firestore destinations error:', err));

    // 2. Cultures
    const unsubCult = onSnapshot(collection(db, 'cultures'), (snapshot) => {
      const items = !snapshot.empty ? processCultureDocs(snapshot.docs) : CULTURE_ITEMS;
      setCultureItems(items);
      persistCurrentToCache({ cultureItems: items });
    }, (err) => console.warn('Admin Firestore cultures error:', err));

    // 3. Culinaries
    const unsubCul = onSnapshot(collection(db, 'culinaries'), (snapshot) => {
      const items = !snapshot.empty ? processCulinaryDocs(snapshot.docs) : CULINARY_ITEMS;
      setCulinaryItems(items);
      persistCurrentToCache({ culinaryItems: items });
    }, (err) => console.warn('Admin Firestore culinaries error:', err));

    // 4. Souvenirs
    const unsubSouv = onSnapshot(collection(db, 'souvenirs'), (snapshot) => {
      const items = !snapshot.empty ? processSouvenirDocs(snapshot.docs) : SOUVENIR_ITEMS;
      setSouvenirItems(items);
      persistCurrentToCache({ souvenirItems: items });
    }, (err) => console.warn('Admin Firestore souvenirs error:', err));

    // 5. Events
    const unsubEv = onSnapshot(collection(db, 'events'), (snapshot) => {
      const items = !snapshot.empty ? processEventDocs(snapshot.docs) : EVENTS_SCHEDULE;
      setEventItems(items);
      persistCurrentToCache({ eventItems: items });
    }, (err) => console.warn('Admin Firestore events error:', err));

    // 6. Downloads
    const unsubDl = onSnapshot(collection(db, 'downloads'), (snapshot) => {
      const items = !snapshot.empty ? processDownloadDocs(snapshot.docs) : DOWNLOAD_ITEMS;
      setDownloadItems(items);
      persistCurrentToCache({ downloadItems: items });
    }, (err) => console.warn('Admin Firestore downloads error:', err));

    // 7. Hot Info
    const unsubHot = onSnapshot(collection(db, 'hotinfo'), (snapshot) => {
      const items = !snapshot.empty ? processHotInfoDocs(snapshot.docs) : deduplicateNewsItems(HOT_INFO_ITEMS);
      setHotInfoItems(items);
      persistCurrentToCache({ hotInfoItems: items });
    }, (err) => console.warn('Admin Firestore hotinfo error:', err));

    // 8. Settings
    const unsubSett = onSnapshot(doc(db, 'settings', 'hero'), (docSnap) => {
      const sett = processSettingsDoc(docSnap);
      if (sett) {
        setAppSettings(sett);
        persistCurrentToCache({ appSettings: sett });
      }
    }, (err) => console.warn('Admin Firestore settings error:', err));

    // 9. Pending AI Events (Discovery queue)
    const unsubPending = onSnapshot(collection(db, 'pending_events'), (snapshot) => {
      if (snapshot.empty) {
        setPendingEvents([]);
        return;
      }
      const data = snapshot.docs
        .map(docSnap => {
          const item = docSnap.data() as PendingEventItem;
          return { id: docSnap.id, ...item, imageUrl: item.imageUrl ? getDirectDriveUrl(item.imageUrl) : '' };
        })
        .filter(item => item.title && item.status !== 'rejected');
      setPendingEvents(data);
    }, (err) => console.warn('Admin Firestore pending_events error:', err));

    return () => {
      unsubDest();
      unsubCult();
      unsubCul();
      unsubSouv();
      unsubEv();
      unsubDl();
      unsubHot();
      unsubSett();
      unsubPending();
    };
  }, [isAdminLoggedIn, persistCurrentToCache]);

  const saveItem = async (colName: string, item: any) => {
    try {
      // Save item directly to Cloud Firestore with merge support
      await setDoc(doc(db, colName, item.id), item, { merge: true });

      // Immediate state update & cache sync
      if (colName === 'destinations') {
        const updated = destinations.map(d => d.id === item.id ? { ...d, ...item } : d);
        if (!destinations.some(d => d.id === item.id)) updated.push(item);
        setDestinations(updated);
        persistCurrentToCache({ destinations: updated });
      } else if (colName === 'cultures') {
        const updated = cultureItems.map(c => c.id === item.id ? { ...c, ...item } : c);
        if (!cultureItems.some(c => c.id === item.id)) updated.push(item);
        setCultureItems(updated);
        persistCurrentToCache({ cultureItems: updated });
      } else if (colName === 'culinaries') {
        const updated = culinaryItems.map(c => c.id === item.id ? { ...c, ...item } : c);
        if (!culinaryItems.some(c => c.id === item.id)) updated.push(item);
        setCulinaryItems(updated);
        persistCurrentToCache({ culinaryItems: updated });
      } else if (colName === 'souvenirs') {
        const updated = souvenirItems.map(s => s.id === item.id ? { ...s, ...item } : s);
        if (!souvenirItems.some(s => s.id === item.id)) updated.push(item);
        setSouvenirItems(updated);
        persistCurrentToCache({ souvenirItems: updated });
      } else if (colName === 'events') {
        const updated = eventItems.map(e => e.id === item.id ? { ...e, ...item } : e);
        if (!eventItems.some(e => e.id === item.id)) updated.push(item);
        setEventItems(updated);
        persistCurrentToCache({ eventItems: updated });
      } else if (colName === 'downloads') {
        const updated = downloadItems.map(d => d.id === item.id ? { ...d, ...item } : d);
        if (!downloadItems.some(d => d.id === item.id)) updated.push(item);
        setDownloadItems(updated);
        persistCurrentToCache({ downloadItems: updated });
      }
    } catch (e) {
      console.error("Error saving to Firebase: ", e);
      throw e;
    }
  };

  const saveSettings = async (newSettings: AppSettings) => {
    try {
      const formatted: AppSettings = {
        bgMediaType: newSettings.bgMediaType || 'image',
        baseImage: newSettings.baseImage ? optimizeImageUrl(getDirectDriveUrl(newSettings.baseImage), 1920) : BG_IMAGE_1,
        revealImage: newSettings.revealImage ? optimizeImageUrl(getDirectDriveUrl(newSettings.revealImage), 1920) : BG_IMAGE_2,
        baseVideo: newSettings.baseVideo || '',
        spotlightDisplayMode: newSettings.spotlightDisplayMode || 'both',
        featuredVideoEventId: newSettings.featuredVideoEventId || 'auto',
        allowedAdminEmails: newSettings.allowedAdminEmails && newSettings.allowedAdminEmails.length > 0 ? newSettings.allowedAdminEmails : ['aldoaldiles@gmail.com'],
        heroTextColor: newSettings.heroTextColor || '#000000',
        heroTextTheme: newSettings.heroTextTheme || 'black',
        heroTextShadow: newSettings.heroTextShadow !== undefined ? newSettings.heroTextShadow : true,
        tiketAffiliateId: newSettings.tiketAffiliateId || '6a893170239c5bf8a8b71930',
        travelokaAffiliateId: newSettings.travelokaAffiliateId || '',
        activeBookingPartner: newSettings.activeBookingPartner || 'dual',
      };
      setAppSettings(formatted);
      persistCurrentToCache({ appSettings: formatted });

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('malala_app_settings', JSON.stringify(formatted));
        } catch (e) {
          console.warn('Failed to save settings to localStorage:', e);
        }
      }

      // Safe payload for Firestore
      const firestorePayload: any = {
        bgMediaType: formatted.bgMediaType,
        spotlightDisplayMode: formatted.spotlightDisplayMode,
        featuredVideoEventId: formatted.featuredVideoEventId,
        allowedAdminEmails: formatted.allowedAdminEmails,
        heroTextColor: formatted.heroTextColor,
        heroTextTheme: formatted.heroTextTheme,
        heroTextShadow: formatted.heroTextShadow,
        tiketAffiliateId: formatted.tiketAffiliateId,
        travelokaAffiliateId: formatted.travelokaAffiliateId,
        activeBookingPartner: formatted.activeBookingPartner,
      };
      if (formatted.baseImage && (!formatted.baseImage.startsWith('data:') || formatted.baseImage.length < 800000)) {
        firestorePayload.baseImage = formatted.baseImage;
      }
      if (formatted.revealImage && (!formatted.revealImage.startsWith('data:') || formatted.revealImage.length < 800000)) {
        firestorePayload.revealImage = formatted.revealImage;
      }
      if (formatted.baseVideo && (!formatted.baseVideo.startsWith('data:') || formatted.baseVideo.length < 800000)) {
        firestorePayload.baseVideo = formatted.baseVideo;
      }

      await setDoc(doc(db, 'settings', 'hero'), firestorePayload, { merge: true });
    } catch (e) {
      console.warn("Cloud settings sync notice (saved locally): ", e);
      throw e;
    }
  };

  const deleteItem = async (colName: string, id: string) => {
    try {
      await deleteDoc(doc(db, colName, id));

      if (colName === 'destinations') {
        const updated = destinations.filter(d => d.id !== id);
        setDestinations(updated);
        persistCurrentToCache({ destinations: updated });
      } else if (colName === 'cultures') {
        const updated = cultureItems.filter(c => c.id !== id);
        setCultureItems(updated);
        persistCurrentToCache({ cultureItems: updated });
      } else if (colName === 'culinaries') {
        const updated = culinaryItems.filter(c => c.id !== id);
        setCulinaryItems(updated);
        persistCurrentToCache({ culinaryItems: updated });
      } else if (colName === 'souvenirs') {
        const updated = souvenirItems.filter(s => s.id !== id);
        setSouvenirItems(updated);
        persistCurrentToCache({ souvenirItems: updated });
      } else if (colName === 'events') {
        const updated = eventItems.filter(e => e.id !== id);
        setEventItems(updated);
        persistCurrentToCache({ eventItems: updated });
      } else if (colName === 'downloads') {
        const updated = downloadItems.filter(d => d.id !== id);
        setDownloadItems(updated);
        persistCurrentToCache({ downloadItems: updated });
      }
    } catch (e) {
      console.error("Error deleting from Firebase: ", e);
      throw e;
    }
  };

  const seedData = async () => {
    const batch = writeBatch(db);
    DESTINATIONS.forEach(item => batch.set(doc(db, 'destinations', item.id), {
      ...item,
      titleEn: item.titleEn || item.title,
      categoryEn: item.categoryEn || item.category,
      tagEn: item.tagEn || item.tag,
      descriptionEn: item.descriptionEn || item.description,
      highlightsEn: item.highlightsEn || item.highlights,
      bestTimeEn: item.bestTimeEn || item.bestTime,
      locationDetailsEn: item.locationDetailsEn || item.locationDetails
    }));
    CULTURE_ITEMS.forEach(item => batch.set(doc(db, 'cultures', item.id), {
      ...item,
      titleEn: item.titleEn || item.title,
      categoryEn: item.categoryEn || item.category,
      descriptionEn: item.descriptionEn || item.description,
      philosophyEn: item.philosophyEn || item.philosophy,
      originEn: item.originEn || item.origin
    }));
    CULINARY_ITEMS.forEach(item => batch.set(doc(db, 'culinaries', item.id), {
      ...item,
      titleEn: item.titleEn || item.title,
      typeEn: item.typeEn || item.type,
      originEn: item.originEn || item.origin,
      descriptionEn: item.descriptionEn || item.description,
      flavorProfileEn: item.flavorProfileEn || item.flavorProfile
    }));
    SOUVENIR_ITEMS.forEach(item => batch.set(doc(db, 'souvenirs', item.id), {
      ...item,
      titleEn: item.titleEn || item.title,
      categoryEn: item.categoryEn || item.category,
      originEn: item.originEn || item.origin,
      descriptionEn: item.descriptionEn || item.description,
      priceRangeEn: item.priceRangeEn || item.priceRange,
      highlightsEn: item.highlightsEn || item.highlights
    }));
    EVENTS_SCHEDULE.forEach(item => batch.set(doc(db, 'events', item.id), {
      ...item,
      titleEn: item.titleEn || item.title,
      scheduleEn: item.scheduleEn || item.schedule,
      locationEn: item.locationEn || item.location,
      descriptionEn: item.descriptionEn || item.description
    }));
    DOWNLOAD_ITEMS.forEach(item => batch.set(doc(db, 'downloads', item.id), item));
    HOT_INFO_ITEMS.forEach(item => batch.set(doc(db, 'hotinfo', item.id), item));
    batch.set(doc(db, 'settings', 'hero'), {
      baseImage: BG_IMAGE_1,
      revealImage: BG_IMAGE_2,
      allowedAdminEmails: ['aldoaldiles@gmail.com'],
    });
    await batch.commit();

    // Re-sync local cache
    await persistCurrentToCache({
      destinations: DESTINATIONS,
      cultureItems: CULTURE_ITEMS,
      culinaryItems: CULINARY_ITEMS,
      souvenirItems: SOUVENIR_ITEMS,
      eventItems: EVENTS_SCHEDULE,
      downloadItems: DOWNLOAD_ITEMS,
      hotInfoItems: HOT_INFO_ITEMS,
    });
  };

  const getDestinationsWithEn = () => DESTINATIONS.map(item => ({
    ...item,
    titleEn: item.titleEn || item.title,
    categoryEn: item.categoryEn || item.category,
    tagEn: item.tagEn || item.tag,
    descriptionEn: item.descriptionEn || item.description,
    highlightsEn: item.highlightsEn || item.highlights,
    bestTimeEn: item.bestTimeEn || item.bestTime,
    locationDetailsEn: item.locationDetailsEn || item.locationDetails
  }));

  const getCultureWithEn = () => CULTURE_ITEMS.map(item => ({
    ...item,
    titleEn: item.titleEn || item.title,
    categoryEn: item.categoryEn || item.category,
    descriptionEn: item.descriptionEn || item.description,
    philosophyEn: item.philosophyEn || item.philosophy,
    originEn: item.originEn || item.origin
  }));

  const getCulinaryWithEn = () => CULINARY_ITEMS.map(item => ({
    ...item,
    titleEn: item.titleEn || item.title,
    typeEn: item.typeEn || item.type,
    originEn: item.originEn || item.origin,
    descriptionEn: item.descriptionEn || item.description,
    flavorProfileEn: item.flavorProfileEn || item.flavorProfile
  }));

  const getEventsWithEn = () => EVENTS_SCHEDULE.map(item => ({
    ...item,
    titleEn: item.titleEn || item.title,
    scheduleEn: item.scheduleEn || item.schedule,
    locationEn: item.locationEn || item.location,
    descriptionEn: item.descriptionEn || item.description
  }));

  const updateHotInfoItems = async (newItems: HotInfoItem[]) => {
    const cleanItems = deduplicateNewsItems(newItems)
      .filter(item => {
        if (!item.title || !item.title.trim()) return false;
        const lower = (item.title + ' ' + (item.description || '') + ' ' + (item.id || '')).toLowerCase();
        return !(lower.includes('thailand') || lower.includes('bangkok') || lower.includes('phuket') || lower.includes('chiang mai') || item.id?.startsWith('th-'));
      })
      .map(item => {
        const img = item.imageUrl ? item.imageUrl.trim() : '';
        const isUserUploaded = Boolean(
          (item as any).isUserUploadedImage === true || 
          (img && img.startsWith('data:image/'))
        );
        return {
          ...item,
          imageUrl: isUserUploaded ? img : '',
          isUserUploadedImage: isUserUploaded
        };
      });
    setHotInfoItems(cleanItems);
    persistCurrentToCache({ hotInfoItems: cleanItems });

    try {
      const batch = writeBatch(db);
      // Simpan berita permanen ke Firestore tanpa menghapus arsip berita historis
      cleanItems.forEach(item => {
        if (item.id) {
          batch.set(doc(db, 'hotinfo', item.id), item, { merge: true });
        }
      });
      await batch.commit();
    } catch (e) {
      console.warn("Failed to sync hotinfo to firestore:", e);
    }
  };

  const approvePendingEvent = async (item: PendingEventItem) => {
    try {
      const { status, discoveredAt, sourceName, changeType, originalSchedule, ...eventData } = item;
      await setDoc(doc(db, 'events', item.id), eventData, { merge: true });
      await deleteDoc(doc(db, 'pending_events', item.id));

      const updated = eventItems.map(e => e.id === item.id ? { ...e, ...eventData } : e);
      if (!eventItems.some(e => e.id === item.id)) updated.push(eventData as EventItem);
      setEventItems(updated);
      persistCurrentToCache({ eventItems: updated });
    } catch (e) {
      console.error("Error approving pending event:", e);
      throw e;
    }
  };

  const rejectPendingEvent = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'pending_events', id));
      setPendingEvents(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      console.error("Error rejecting pending event:", e);
      throw e;
    }
  };

  const savePendingEvent = async (item: PendingEventItem) => {
    try {
      await setDoc(doc(db, 'pending_events', item.id), item, { merge: true });
      setPendingEvents(prev => {
        const exists = prev.some(p => p.id === item.id);
        return exists ? prev.map(p => p.id === item.id ? item : p) : [...prev, item];
      });
    } catch (e) {
      console.error("Error saving pending event:", e);
      throw e;
    }
  };

  return {
    destinations: destinations.length > 0 ? destinations : getDestinationsWithEn(),
    cultureItems: cultureItems.length > 0 ? cultureItems : getCultureWithEn(),
    culinaryItems: culinaryItems.length > 0 ? culinaryItems : getCulinaryWithEn(),
    souvenirItems: souvenirItems.length > 0 ? souvenirItems : SOUVENIR_ITEMS,
    eventItems: eventItems.length > 0 ? eventItems : getEventsWithEn(),
    pendingEvents,
    downloadItems: downloadItems.length > 0 ? downloadItems : DOWNLOAD_ITEMS,
    hotInfoItems: hotInfoItems.length > 0 ? hotInfoItems : HOT_INFO_ITEMS,
    appSettings,
    isSyncing,
    isAdminLoggedIn,
    refreshData: fetchFromFirestoreOnce,
    saveItem,
    saveSettings,
    deleteItem,
    seedData,
    updateHotInfoItems,
    approvePendingEvent,
    rejectPendingEvent,
    savePendingEvent
  };
}
