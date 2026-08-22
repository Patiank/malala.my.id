import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc, writeBatch, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, SOUVENIR_ITEMS, EVENTS_SCHEDULE, DOWNLOAD_ITEMS, HOT_INFO_ITEMS, BG_IMAGE_1, BG_IMAGE_2, getDirectDriveUrl } from './content';
import { Destination, CultureItem, CulinaryItem, SouvenirItem, EventItem, DownloadItem, HotInfoItem, AppSettings, PendingEventItem } from '../types';
import { isWithinLast30Days, deduplicateNewsItems, parseNewsTimestamp } from '../utils/ai';

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

  useEffect(() => {
    // 1. Destinations listener (Real-time Cloud Sync)
    const unsubDest = onSnapshot(collection(db, 'destinations'), (snapshot) => {
      if (snapshot.empty) {
        setDestinations(DESTINATIONS);
        return;
      }
      const firestoreData = snapshot.docs
        .map(doc => {
          const item = doc.data() as Destination;
          return { id: doc.id, ...item, imageUrl: item.imageUrl ? getDirectDriveUrl(item.imageUrl) : '' };
        })
        .filter(item => item.title && item.title.trim().length > 0);

      const mergedMap = new Map<string, Destination>();
      DESTINATIONS.forEach(item => mergedMap.set(item.id, item));
      firestoreData.forEach(item => mergedMap.set(item.id, { ...(mergedMap.get(item.id) || {}), ...item }));
      const merged = Array.from(mergedMap.values());
      setDestinations(merged.length > 0 ? merged : DESTINATIONS);
    }, (err) => {
      console.warn("Firestore destinations error:", err);
      setDestinations(DESTINATIONS);
    });

    // 2. Cultures listener
    const unsubCult = onSnapshot(collection(db, 'cultures'), (snapshot) => {
      if (snapshot.empty) {
        setCultureItems(CULTURE_ITEMS);
        return;
      }
      const firestoreData = snapshot.docs
        .map(doc => {
          const item = doc.data() as CultureItem;
          return { id: doc.id, ...item, imageUrl: item.imageUrl ? getDirectDriveUrl(item.imageUrl) : '' };
        })
        .filter(item => item.title && item.title.trim().length > 0);

      const mergedMap = new Map<string, CultureItem>();
      CULTURE_ITEMS.forEach(item => mergedMap.set(item.id, item));
      firestoreData.forEach(item => mergedMap.set(item.id, { ...(mergedMap.get(item.id) || {}), ...item }));
      const merged = Array.from(mergedMap.values());
      setCultureItems(merged.length > 0 ? merged : CULTURE_ITEMS);
    }, (err) => {
      console.warn("Firestore cultures error:", err);
      setCultureItems(CULTURE_ITEMS);
    });

    // 3. Culinaries listener
    const unsubCul = onSnapshot(collection(db, 'culinaries'), (snapshot) => {
      if (snapshot.empty) {
        setCulinaryItems(CULINARY_ITEMS);
        return;
      }
      const firestoreData = snapshot.docs
        .map(doc => {
          const item = doc.data() as CulinaryItem;
          return { id: doc.id, ...item, imageUrl: item.imageUrl ? getDirectDriveUrl(item.imageUrl) : '' };
        })
        .filter(item => item.title && item.title.trim().length > 0);

      const mergedMap = new Map<string, CulinaryItem>();
      CULINARY_ITEMS.forEach(item => mergedMap.set(item.id, item));
      firestoreData.forEach(item => mergedMap.set(item.id, { ...(mergedMap.get(item.id) || {}), ...item }));
      const merged = Array.from(mergedMap.values());
      setCulinaryItems(merged.length > 0 ? merged : CULINARY_ITEMS);
    }, (err) => {
      console.warn("Firestore culinaries error:", err);
      setCulinaryItems(CULINARY_ITEMS);
    });

    // 4. Souvenirs listener
    const unsubSouv = onSnapshot(collection(db, 'souvenirs'), (snapshot) => {
      if (snapshot.empty) {
        setSouvenirItems(SOUVENIR_ITEMS);
        return;
      }
      const firestoreData = snapshot.docs
        .map(doc => {
          const item = doc.data() as SouvenirItem;
          return { id: doc.id, ...item, imageUrl: item.imageUrl ? getDirectDriveUrl(item.imageUrl) : '' };
        })
        .filter(item => item.title && item.title.trim().length > 0);

      const mergedMap = new Map<string, SouvenirItem>();
      SOUVENIR_ITEMS.forEach(item => mergedMap.set(item.id, item));
      firestoreData.forEach(item => mergedMap.set(item.id, { ...(mergedMap.get(item.id) || {}), ...item }));
      const merged = Array.from(mergedMap.values());
      setSouvenirItems(merged.length > 0 ? merged : SOUVENIR_ITEMS);
    }, (err) => {
      console.warn("Firestore souvenirs error:", err);
      setSouvenirItems(SOUVENIR_ITEMS);
    });

    // 5. Events listener (Real-time Cloud Sync with schedule updates)
    const unsubEv = onSnapshot(collection(db, 'events'), (snapshot) => {
      if (snapshot.empty) {
        setEventItems(EVENTS_SCHEDULE);
        return;
      }
      const firestoreData = snapshot.docs
        .map(doc => {
          const item = doc.data() as EventItem;
          return { id: doc.id, ...item, imageUrl: item.imageUrl ? getDirectDriveUrl(item.imageUrl) : '' };
        })
        .filter(item => item.title && item.title.trim().length > 0);

      const mergedMap = new Map<string, EventItem>();
      EVENTS_SCHEDULE.forEach(item => mergedMap.set(item.id, item));
      firestoreData.forEach(item => mergedMap.set(item.id, { ...(mergedMap.get(item.id) || {}), ...item }));
      const merged = Array.from(mergedMap.values());
      setEventItems(merged.length > 0 ? merged : EVENTS_SCHEDULE);
    }, (err) => {
      console.warn("Firestore events error:", err);
      setEventItems(EVENTS_SCHEDULE);
    });

    // 6. Downloads listener
    const unsubDl = onSnapshot(collection(db, 'downloads'), (snapshot) => {
      if (snapshot.empty) {
        setDownloadItems(DOWNLOAD_ITEMS);
        return;
      }
      const firestoreData = snapshot.docs
        .map(doc => {
          const item = doc.data() as DownloadItem;
          return { id: doc.id, ...item };
        })
        .filter(item => item.title && item.title.trim().length > 0);

      const mergedMap = new Map<string, DownloadItem>();
      DOWNLOAD_ITEMS.forEach(item => mergedMap.set(item.id, item));
      firestoreData.forEach(item => mergedMap.set(item.id, { ...(mergedMap.get(item.id) || {}), ...item }));
      const merged = Array.from(mergedMap.values());
      setDownloadItems(merged.length > 0 ? merged : DOWNLOAD_ITEMS);
    }, (err) => {
      console.warn("Firestore downloads error:", err);
      setDownloadItems(DOWNLOAD_ITEMS);
    });

    // 7. Hot Info listener
    const unsubHot = onSnapshot(collection(db, 'hotinfo'), (snapshot) => {
      if (snapshot.empty) {
        setHotInfoItems(deduplicateNewsItems(HOT_INFO_ITEMS));
        return;
      }
      const data = snapshot.docs
        .map(doc => {
          const item = doc.data() as HotInfoItem;
          return { id: doc.id, ...item, imageUrl: item.imageUrl ? getDirectDriveUrl(item.imageUrl) : '' };
        })
        .filter(item => item.title && item.title.trim().length > 0 && isWithinLast30Days(item.date || item.createdAt));

      const dedupedMerged = deduplicateNewsItems(data.length > 0 ? data : HOT_INFO_ITEMS)
        .sort((a: any, b: any) => parseNewsTimestamp(b.date, b.createdAt) - parseNewsTimestamp(a.date, a.createdAt));
      setHotInfoItems(dedupedMerged.length > 0 ? dedupedMerged : deduplicateNewsItems(HOT_INFO_ITEMS));
    }, (err) => {
      console.warn("Firestore hotinfo error:", err);
      const fallbackSorted = deduplicateNewsItems(HOT_INFO_ITEMS)
        .sort((a: any, b: any) => parseNewsTimestamp(b.date, b.createdAt) - parseNewsTimestamp(a.date, a.createdAt));
      setHotInfoItems(fallbackSorted);
    });

    // 8. Settings listener (Cloud Firestore is the Master Authority)
    const unsubSett = onSnapshot(doc(db, 'settings', 'hero'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as AppSettings;
        const effectiveMediaType = (data.bgMediaType === 'video' || data.bgMediaType === 'image') ? data.bgMediaType : 'image';
        const effectiveBaseVideo = data.baseVideo || '';
        const effectiveBaseImage = data.baseImage ? getDirectDriveUrl(data.baseImage) : BG_IMAGE_1;
        const effectiveRevealImage = data.revealImage ? getDirectDriveUrl(data.revealImage) : BG_IMAGE_2;
        const effectiveSpotlightDisplayMode = data.spotlightDisplayMode || 'both';
        const effectiveFeaturedVideoEventId = data.featuredVideoEventId || 'auto';
        const effectiveHeroTextColor = data.heroTextColor || '#000000';
        const effectiveHeroTextTheme = data.heroTextTheme || 'black';
        const effectiveHeroTextShadow = data.heroTextShadow !== undefined ? data.heroTextShadow : true;
        const effectiveTiketAffiliateId = data.tiketAffiliateId || '6a893170239c5bf8a8b71930';
        const effectiveTravelokaAffiliateId = data.travelokaAffiliateId || '';
        const effectiveActiveBookingPartner = data.activeBookingPartner || 'dual';

        const liveSettings: AppSettings = {
          bgMediaType: effectiveMediaType,
          baseImage: effectiveBaseImage,
          revealImage: effectiveRevealImage,
          baseVideo: effectiveBaseVideo,
          spotlightDisplayMode: effectiveSpotlightDisplayMode,
          featuredVideoEventId: effectiveFeaturedVideoEventId,
          allowedAdminEmails: data.allowedAdminEmails && data.allowedAdminEmails.length > 0 ? data.allowedAdminEmails : ['aldoaldiles@gmail.com'],
          heroTextColor: effectiveHeroTextColor,
          heroTextTheme: effectiveHeroTextTheme,
          heroTextShadow: effectiveHeroTextShadow,
          tiketAffiliateId: effectiveTiketAffiliateId,
          travelokaAffiliateId: effectiveTravelokaAffiliateId,
          activeBookingPartner: effectiveActiveBookingPartner,
          isAutonomousSyncEnabled: data.isAutonomousSyncEnabled !== undefined ? data.isAutonomousSyncEnabled : true,
          lastAutonomousSync: data.lastAutonomousSync || '',
        };

        setAppSettings(liveSettings);

        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem('malala_app_settings', JSON.stringify(liveSettings));
          } catch (e) {}
        }
      }
    }, (err) => console.warn("Firestore settings error:", err));

    // 9. Pending AI Events listener (Autonomous Discovery Queue)
    const unsubPending = onSnapshot(collection(db, 'pending_events'), (snapshot) => {
      if (snapshot.empty) {
        setPendingEvents([]);
        return;
      }
      const data = snapshot.docs
        .map(doc => {
          const item = doc.data() as PendingEventItem;
          return { id: doc.id, ...item, imageUrl: item.imageUrl ? getDirectDriveUrl(item.imageUrl) : '' };
        })
        .filter(item => item.title && item.status !== 'rejected');
      setPendingEvents(data);
    }, (err) => console.warn("Firestore pending_events error:", err));

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
  }, []);

  const saveItem = async (colName: string, item: any) => {
    try {
      // Save item directly to Cloud Firestore with merge support
      await setDoc(doc(db, colName, item.id), item, { merge: true });
    } catch (e) {
      console.error("Error saving to Firebase: ", e);
      throw e;
    }
  };

  const saveSettings = async (newSettings: AppSettings) => {
    try {
      const formatted: AppSettings = {
        bgMediaType: newSettings.bgMediaType || 'image',
        baseImage: newSettings.baseImage ? getDirectDriveUrl(newSettings.baseImage) : BG_IMAGE_1,
        revealImage: newSettings.revealImage ? getDirectDriveUrl(newSettings.revealImage) : BG_IMAGE_2,
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
    const cleanItems = deduplicateNewsItems(
      newItems.filter(item => isWithinLast30Days(item.date || item.createdAt))
    );
    setHotInfoItems(cleanItems);
    try {
      const snapshot = await getDocs(collection(db, 'hotinfo'));
      const batch = writeBatch(db);
      // Remove obsolete/duplicate documents from Firestore
      snapshot.docs.forEach(d => {
        if (!cleanItems.some(ci => ci.id === d.id)) {
          batch.delete(d.ref);
        }
      });
      cleanItems.forEach(item => {
        if (item.id) {
          batch.set(doc(db, 'hotinfo', item.id), item);
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
    } catch (e) {
      console.error("Error approving pending event:", e);
      throw e;
    }
  };

  const rejectPendingEvent = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'pending_events', id));
    } catch (e) {
      console.error("Error rejecting pending event:", e);
      throw e;
    }
  };

  const savePendingEvent = async (item: PendingEventItem) => {
    try {
      await setDoc(doc(db, 'pending_events', item.id), item, { merge: true });
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

