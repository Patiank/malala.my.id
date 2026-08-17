import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE, DOWNLOAD_ITEMS, HOT_INFO_ITEMS, BG_IMAGE_1, BG_IMAGE_2, getDirectDriveUrl } from './content';
import { Destination, CultureItem, CulinaryItem, EventItem, DownloadItem, HotInfoItem, AppSettings } from '../types';

export function useData() {
  const [destinations, setDestinations] = useState<Destination[]>(DESTINATIONS);
  const [cultureItems, setCultureItems] = useState<CultureItem[]>(CULTURE_ITEMS);
  const [culinaryItems, setCulinaryItems] = useState<CulinaryItem[]>(CULINARY_ITEMS);
  const [eventItems, setEventItems] = useState<EventItem[]>(EVENTS_SCHEDULE);
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
    };
  });

  useEffect(() => {
    // We subscribe to all collections and merge missing default items automatically
    const unsubDest = onSnapshot(collection(db, 'destinations'), (snapshot) => {
      const data = snapshot.docs
        .map(doc => {
          const item = doc.data() as Destination;
          return { id: doc.id, ...item, imageUrl: item.imageUrl ? getDirectDriveUrl(item.imageUrl) : '' };
        })
        .filter(item => item.title && item.title.trim().length > 0);
      
      const firestoreIds = new Set(data.map(i => i.id));
      const missingDefaults = DESTINATIONS.filter(item => !firestoreIds.has(item.id));
      const merged = [...data, ...missingDefaults];
      setDestinations(merged.length > 0 ? merged : DESTINATIONS);

      if (missingDefaults.length > 0) {
        missingDefaults.forEach(item => {
          setDoc(doc(db, 'destinations', item.id), {
            ...item,
            titleEn: item.titleEn || item.title,
            categoryEn: item.categoryEn || item.category,
            tagEn: item.tagEn || item.tag,
            descriptionEn: item.descriptionEn || item.description,
            highlightsEn: item.highlightsEn || item.highlights,
            bestTimeEn: item.bestTimeEn || item.bestTime,
            locationDetailsEn: item.locationDetailsEn || item.locationDetails
          }).catch(() => {});
        });
      }
    }, (err) => {
      console.warn("Firestore destinations error:", err);
      setDestinations(DESTINATIONS);
    });

    const unsubCult = onSnapshot(collection(db, 'cultures'), (snapshot) => {
      const data = snapshot.docs
        .map(doc => {
          const item = doc.data() as CultureItem;
          return { id: doc.id, ...item, imageUrl: item.imageUrl ? getDirectDriveUrl(item.imageUrl) : '' };
        })
        .filter(item => item.title && item.title.trim().length > 0);
      
      const firestoreIds = new Set(data.map(i => i.id));
      const missingDefaults = CULTURE_ITEMS.filter(item => !firestoreIds.has(item.id));
      const merged = [...data, ...missingDefaults];
      setCultureItems(merged.length > 0 ? merged : CULTURE_ITEMS);

      if (missingDefaults.length > 0) {
        missingDefaults.forEach(item => {
          setDoc(doc(db, 'cultures', item.id), {
            ...item,
            titleEn: item.titleEn || item.title,
            categoryEn: item.categoryEn || item.category,
            descriptionEn: item.descriptionEn || item.description,
            philosophyEn: item.philosophyEn || item.philosophy,
            originEn: item.originEn || item.origin
          }).catch(() => {});
        });
      }
    }, (err) => {
      console.warn("Firestore cultures error:", err);
      setCultureItems(CULTURE_ITEMS);
    });

    const unsubCul = onSnapshot(collection(db, 'culinaries'), (snapshot) => {
      const data = snapshot.docs
        .map(doc => {
          const item = doc.data() as CulinaryItem;
          return { id: doc.id, ...item, imageUrl: item.imageUrl ? getDirectDriveUrl(item.imageUrl) : '' };
        })
        .filter(item => item.title && item.title.trim().length > 0);

      const firestoreIds = new Set(data.map(i => i.id));
      const missingDefaults = CULINARY_ITEMS.filter(item => !firestoreIds.has(item.id));
      const merged = [...data, ...missingDefaults];
      setCulinaryItems(merged.length > 0 ? merged : CULINARY_ITEMS);

      if (missingDefaults.length > 0) {
        missingDefaults.forEach(item => {
          setDoc(doc(db, 'culinaries', item.id), {
            ...item,
            titleEn: item.titleEn || item.title,
            typeEn: item.typeEn || item.type,
            originEn: item.originEn || item.origin,
            descriptionEn: item.descriptionEn || item.description,
            flavorProfileEn: item.flavorProfileEn || item.flavorProfile
          }).catch(() => {});
        });
      }
    }, (err) => {
      console.warn("Firestore culinaries error:", err);
      setCulinaryItems(CULINARY_ITEMS);
    });

    const unsubEvt = onSnapshot(collection(db, 'events'), (snapshot) => {
      const data = snapshot.docs
        .map(doc => {
          const item = doc.data() as EventItem;
          return { id: doc.id, ...item, imageUrl: item.imageUrl ? getDirectDriveUrl(item.imageUrl) : '' };
        })
        .filter(item => item.title && item.title.trim().length > 0);

      const firestoreIds = new Set(data.map(i => i.id));
      const missingDefaults = EVENTS_SCHEDULE.filter(item => !firestoreIds.has(item.id));
      const merged = [...data, ...missingDefaults];
      setEventItems(merged.length > 0 ? merged : EVENTS_SCHEDULE);

      if (missingDefaults.length > 0) {
        missingDefaults.forEach(item => {
          setDoc(doc(db, 'events', item.id), {
            ...item,
            titleEn: item.titleEn || item.title,
            scheduleEn: item.scheduleEn || item.schedule,
            locationEn: item.locationEn || item.location,
            descriptionEn: item.descriptionEn || item.description
          }).catch(() => {});
        });
      }
    }, (err) => {
      console.warn("Firestore events error:", err);
      setEventItems(EVENTS_SCHEDULE);
    });

    const unsubDl = onSnapshot(collection(db, 'downloads'), (snapshot) => {
      const data = snapshot.docs
        .map(doc => {
          const item = doc.data() as DownloadItem;
          return { id: doc.id, ...item };
        })
        .filter(item => item.title && item.title.trim().length > 0);

      const firestoreIds = new Set(data.map(i => i.id));
      const missingDefaults = DOWNLOAD_ITEMS.filter(item => !firestoreIds.has(item.id));
      const merged = [...data, ...missingDefaults];
      setDownloadItems(merged.length > 0 ? merged : DOWNLOAD_ITEMS);

      if (missingDefaults.length > 0) {
        missingDefaults.forEach(item => {
          setDoc(doc(db, 'downloads', item.id), item).catch(() => {});
        });
      }
    }, (err) => {
      console.warn("Firestore downloads error:", err);
      setDownloadItems(DOWNLOAD_ITEMS);
    });

    const unsubHot = onSnapshot(collection(db, 'hotinfo'), (snapshot) => {
      const data = snapshot.docs
        .map(doc => {
          const item = doc.data() as HotInfoItem;
          return { id: doc.id, ...item, imageUrl: item.imageUrl ? getDirectDriveUrl(item.imageUrl) : '' };
        })
        .filter(item => item.title && item.title.trim().length > 0);

      const firestoreIds = new Set(data.map(i => i.id));
      const missingDefaults = HOT_INFO_ITEMS.filter(item => !firestoreIds.has(item.id));
      const merged = [...data, ...missingDefaults];
      setHotInfoItems(merged.length > 0 ? merged : HOT_INFO_ITEMS);

      if (missingDefaults.length > 0) {
        missingDefaults.forEach(item => {
          setDoc(doc(db, 'hotinfo', item.id), item).catch(() => {});
        });
      }
    }, (err) => {
      console.warn("Firestore hotinfo error:", err);
      setHotInfoItems(HOT_INFO_ITEMS);
    });

    const unsubSett = onSnapshot(doc(db, 'settings', 'hero'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as AppSettings;
        
        let localSettings: AppSettings | null = null;
        if (typeof window !== 'undefined') {
          try {
            const localSaved = localStorage.getItem('malala_app_settings');
            if (localSaved) {
              localSettings = JSON.parse(localSaved);
            }
          } catch (e) {}
        }

        // Prioritize local user choices for media type and videos to prevent reverting during initial sync
        const effectiveMediaType = localSettings?.bgMediaType || data.bgMediaType || 'image';
        const effectiveBaseVideo = localSettings?.baseVideo || data.baseVideo || '';
        const effectiveBaseImage = localSettings?.baseImage || (data.baseImage ? getDirectDriveUrl(data.baseImage) : BG_IMAGE_1);
        const effectiveRevealImage = localSettings?.revealImage || (data.revealImage ? getDirectDriveUrl(data.revealImage) : BG_IMAGE_2);
        const effectiveHeroTextColor = localSettings?.heroTextColor || data.heroTextColor || '#000000';
        const effectiveHeroTextTheme = localSettings?.heroTextTheme || data.heroTextTheme || 'black';
        const effectiveHeroTextShadow = localSettings?.heroTextShadow !== undefined ? localSettings.heroTextShadow : (data.heroTextShadow !== undefined ? data.heroTextShadow : true);

        const mergedSettings: AppSettings = {
          bgMediaType: effectiveMediaType,
          baseImage: effectiveBaseImage,
          revealImage: effectiveRevealImage,
          baseVideo: effectiveBaseVideo,
          allowedAdminEmails: data.allowedAdminEmails && data.allowedAdminEmails.length > 0 ? data.allowedAdminEmails : (localSettings?.allowedAdminEmails || ['aldoaldiles@gmail.com']),
          heroTextColor: effectiveHeroTextColor,
          heroTextTheme: effectiveHeroTextTheme,
          heroTextShadow: effectiveHeroTextShadow,
        };

        setAppSettings(mergedSettings);

        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem('malala_app_settings', JSON.stringify(mergedSettings));
          } catch (e) {
            console.warn('Failed to save merged settings to localStorage:', e);
          }
        }
      }
    }, (err) => console.warn("Firestore settings error:", err));

    return () => {
      unsubDest();
      unsubCult();
      unsubCul();
      unsubEvt();
      unsubDl();
      unsubHot();
      unsubSett();
    };
  }, []);

  const saveItem = async (colName: string, item: any) => {
    try {
      // Save imageUrl as-is (raw URL). Transformation via getDirectDriveUrl
      // is only applied on read (onSnapshot), not on write.
      await setDoc(doc(db, colName, item.id), item);
    } catch (e) {
      console.error("Error saving to Firebase: ", e);
    }
  };

  const saveSettings = async (newSettings: AppSettings) => {
    try {
      const formatted: AppSettings = {
        bgMediaType: newSettings.bgMediaType || 'image',
        baseImage: newSettings.baseImage ? getDirectDriveUrl(newSettings.baseImage) : BG_IMAGE_1,
        revealImage: newSettings.revealImage ? getDirectDriveUrl(newSettings.revealImage) : BG_IMAGE_2,
        baseVideo: newSettings.baseVideo || '',
        allowedAdminEmails: newSettings.allowedAdminEmails && newSettings.allowedAdminEmails.length > 0 ? newSettings.allowedAdminEmails : ['aldoaldiles@gmail.com'],
        heroTextColor: newSettings.heroTextColor || '#000000',
        heroTextTheme: newSettings.heroTextTheme || 'black',
        heroTextShadow: newSettings.heroTextShadow !== undefined ? newSettings.heroTextShadow : true,
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
        allowedAdminEmails: formatted.allowedAdminEmails,
        heroTextColor: formatted.heroTextColor,
        heroTextTheme: formatted.heroTextTheme,
        heroTextShadow: formatted.heroTextShadow,
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
    }
  };

  const deleteItem = async (colName: string, id: string) => {
    try {
      await deleteDoc(doc(db, colName, id));
    } catch (e) {
      console.error("Error deleting from Firebase: ", e);
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
    setHotInfoItems(newItems);
    try {
      const batch = writeBatch(db);
      newItems.forEach(item => {
        if (item.id) {
          batch.set(doc(db, 'hotinfo', item.id), item);
        }
      });
      await batch.commit();
    } catch (e) {
      console.warn("Failed to sync hotinfo to firestore:", e);
    }
  };

  return {
    destinations: destinations.length > 0 ? destinations : getDestinationsWithEn(),
    cultureItems: cultureItems.length > 0 ? cultureItems : getCultureWithEn(),
    culinaryItems: culinaryItems.length > 0 ? culinaryItems : getCulinaryWithEn(),
    eventItems: eventItems.length > 0 ? eventItems : getEventsWithEn(),
    downloadItems: downloadItems.length > 0 ? downloadItems : DOWNLOAD_ITEMS,
    hotInfoItems: hotInfoItems.length > 0 ? hotInfoItems : HOT_INFO_ITEMS,
    appSettings,
    saveItem,
    saveSettings,
    deleteItem,
    seedData,
    updateHotInfoItems
  };
}

