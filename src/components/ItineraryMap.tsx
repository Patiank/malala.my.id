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
}

export const ItineraryMap: React.FC<ItineraryMapProps> = ({
  aiResponse,
  destinations,
  cultureItems,
  culinaryItems,
  eventItems,
  lang,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Default center (Sumatera Barat)
    const map = L.map(mapContainerRef.current).setView([-0.9471, 100.4172], 8);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const markers: L.Marker[] = [];
    const bounds = L.latLngBounds([]);

    const allItems = [...destinations, ...cultureItems, ...culinaryItems, ...eventItems];

    // Match locations from AI itinerary to catalog items
    aiResponse.itinerary.forEach((day) => {
      day.activities.forEach((act) => {
        const query = act.location.toLowerCase();
        
        // Find matching item based on location string from AI
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
              width: 32px;
              height: 32px;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              border: 2px solid white;
              box-shadow: 0 4px 6px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <div style="
                transform: rotate(45deg);
                color: white;
                font-weight: bold;
                font-size: 14px;
                line-height: 1;
              ">
                ${day.day}
              </div>
            </div>
          `;

          const customIcon = L.divIcon({
            className: 'custom-itinerary-pin bg-transparent border-none',
            html: iconHtml,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });

          const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
          marker.bindPopup(`
            <div style="font-family: sans-serif; font-size: 13px; max-width: 200px;">
              <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px;">Hari ${day.day}: ${act.location}</div>
              <div style="color: #4b5563;">${act.activity}</div>
            </div>
          `);

          markers.push(marker);
          bounds.extend([lat, lng]);
        }
      });
    });

    if (markers.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [aiResponse, destinations, cultureItems, culinaryItems, eventItems, lang]);

  return (
    <div className="w-full rounded-xl overflow-hidden border border-gray-200 mb-6 shadow-sm relative z-0">
      <div className="bg-black text-white px-4 py-3 font-orbitron font-bold text-xs uppercase tracking-wider flex items-center justify-between">
        <span>{lang === 'en' ? 'Interactive Itinerary Route Map' : 'Peta Rute Itinerary Interaktif'}</span>
      </div>
      <div ref={mapContainerRef} className="w-full h-[400px] z-0 relative"></div>
    </div>
  );
};
