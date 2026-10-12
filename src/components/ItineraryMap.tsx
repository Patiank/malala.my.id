import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Destination, CultureItem, CulinaryItem, EventItem, FormAIResponse } from '../types';

interface ItineraryMapProps {
  aiResponse: FormAIResponse;
  destinations: Destination[];
  cultureItems: CultureItem[];
  culinaryItems: CulinaryItem[];
  eventItems: EventItem[];
  lang: string;
  fullHeight?: boolean;
}

export const ItineraryMap: React.FC<ItineraryMapProps> = ({
  aiResponse,
  destinations,
  cultureItems,
  culinaryItems,
  eventItems,
  lang,
  fullHeight = false,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const lastItineraryKeyRef = useRef<string>('');

  // 1. Inisialisasi peta Leaflet HANYA SEKALI (Mencegah map hancur & re-create berulang kali)
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Aktifkan scrollWheelZoom pada peta sesuai instruksi
    const map = L.map(mapContainerRef.current, {
      scrollWheelZoom: true,
      touchZoom: true,
      doubleClickZoom: true,
      zoomControl: true,
    }).setView([-0.9471, 100.4172], 8);

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
      crossOrigin: true,
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = layerGroup;

    // Pastikan ukuran peta pas setelah animasi drawer selesai
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 300);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  // 2. Render marker & fitBounds HANYA saat data itinerary benar-benar baru
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = markersLayerRef.current;
    if (!map || !layerGroup || !aiResponse?.itinerary) return;

    // Kunci unik itinerary saat ini untuk mendeteksi perubahan nyata
    const currentKey = `${aiResponse.itinerary.length}-${aiResponse.itinerary.map(d => (d.activities || []).map(a => a.location).join(',')).join('|')}`;
    const isNewItinerary = currentKey !== lastItineraryKeyRef.current;

    // Bersihkan marker lama tanpa merusak instance peta
    layerGroup.clearLayers();

    const bounds = L.latLngBounds([]);
    const allItems = [...destinations, ...cultureItems, ...culinaryItems, ...eventItems];
    let markerCount = 0;

    aiResponse.itinerary.forEach((day) => {
      (day.activities || []).forEach((act) => {
        const query = (act.location || '').toLowerCase();
        
        let matchedItem = allItems.find((item: any) => 
          (item.title && item.title.toLowerCase() === query) ||
          (item.titleEn && item.titleEn.toLowerCase() === query)
        );

        if (!matchedItem) {
          matchedItem = allItems.find((item: any) => 
            query.includes(item.title?.toLowerCase() || 'xxxxx') ||
            (item.title?.toLowerCase() || 'xxxxx').includes(query)
          );
        }

        if (matchedItem && matchedItem.lat && matchedItem.lng) {
          const lat = matchedItem.lat;
          const lng = matchedItem.lng;
          
          const iconHtml = `
            <div style="
              background-color: #ef4444;
              width: 30px;
              height: 30px;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              border: 2px solid white;
              box-shadow: 0 4px 8px rgba(0,0,0,0.35);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            ">
              <div style="
                transform: rotate(45deg);
                color: white;
                font-weight: 800;
                font-size: 13px;
                line-height: 1;
              ">
                ${day.day}
              </div>
            </div>
          `;

          const customIcon = L.divIcon({
            className: 'custom-itinerary-pin bg-transparent border-none',
            html: iconHtml,
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30],
          });

          const marker = L.marker([lat, lng], { icon: customIcon });
          marker.bindPopup(`
            <div style="font-family: system-ui, -apple-system, sans-serif; font-size: 13px; max-width: 220px; line-height: 1.4;">
              <div style="font-weight: 700; font-size: 13.5px; margin-bottom: 4px; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; color: #111827;">
                Hari ${day.day}: ${act.location}
              </div>
              <div style="color: #4b5563; font-size: 12px;">${act.activity}</div>
            </div>
          `);

          layerGroup.addLayer(marker);
          bounds.extend([lat, lng]);
          markerCount++;
        }
      });
    });

    // fitBounds HANYA dipanggil 1 kali saat itinerary baru dimuat (tidak re-zoom berulang kali)
    if (markerCount > 0 && isNewItinerary) {
      lastItineraryKeyRef.current = currentKey;
      // Gunakan timeout kecil agar ukuran kontainer stabil, tanpa animasi berulang
      setTimeout(() => {
        map.invalidateSize();
        map.fitBounds(bounds, { padding: [35, 35], maxZoom: 13 });
      }, 150);
    }
  }, [aiResponse, destinations, cultureItems, culinaryItems, eventItems]);

  return (
    <div className={`w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm relative z-0 flex flex-col ${fullHeight ? 'h-full mb-0' : 'mb-6'}`}>
      <div ref={mapContainerRef} className={`w-full z-0 relative flex-1 ${fullHeight ? 'h-full min-h-[300px]' : 'h-[400px]'}`}></div>
    </div>
  );
};
