import React, { useState, useEffect } from 'react';
import { fetchSumbarWeather, LocationWeather } from '../utils/weather';
import { CloudSun, Waves, Wind, Droplets, Compass, RefreshCw, ChevronRight, Sparkles } from 'lucide-react';

interface WeatherWidgetProps {
  lang: 'id' | 'en';
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ lang }) => {
  const [weatherData, setWeatherData] = useState<LocationWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const loadWeather = async () => {
    setLoading(true);
    try {
      const data = await fetchSumbarWeather();
      setWeatherData(data);
    } catch (e) {
      console.warn("Failed to load weather:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, []);

  const active = weatherData[selectedIdx] || weatherData[0];

  return (
    <div className="bg-gradient-to-br from-neutral-900/90 via-neutral-900/80 to-neutral-950/90 backdrop-blur-md border border-white/10 text-white rounded-2xl p-4 shadow-xl font-jakarta h-full flex flex-col justify-between">
      <div>
        {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <CloudSun className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <span>{lang === 'en' ? 'Live Weather & Marine Waves' : 'Cuaca & Gelombang Laut Real-Time'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </h4>
            <p className="text-[10px] text-gray-400">
              {lang === 'en' ? 'Open-Meteo & BMKG Satellite Sync' : 'Sinkronisasi Satelit Open-Meteo & BMKG'}
            </p>
          </div>
        </div>

        <button
          onClick={loadWeather}
          disabled={loading}
          className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          title="Segarkan Cuaca"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Location Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none text-[11px]">
        {weatherData.map((item, idx) => (
          <button
            key={item.locationId}
            onClick={() => setSelectedIdx(idx)}
            className={`px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedIdx === idx
                ? 'bg-amber-500 text-black font-bold shadow-sm'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <span>{item.icon}</span>
            <span>{lang === 'en' ? item.nameEn : item.name}</span>
            <span className="text-[10px] opacity-80">{item.temp}°C</span>
          </button>
        ))}
      </div>

      {/* Active Location Detail Card */}
      {active && (
        <div className="bg-white/5 rounded-xl p-3.5 border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{active.icon}</span>
                <div>
                  <h5 className="font-black text-sm text-white">{lang === 'en' ? active.nameEn : active.name}</h5>
                  <p className="text-xs text-amber-300 font-semibold">{lang === 'en' ? active.conditionEn : active.condition}</p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-3xl font-black tracking-tight">{active.temp}°<span className="text-lg font-normal text-gray-400">C</span></span>
              <p className="text-[10px] text-gray-400">{lang === 'en' ? 'Feels like' : 'Terasa'} {active.apparentTemp}°C</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-[11px]">
            <div className="bg-white/5 p-2 rounded-lg flex items-center gap-2">
              <Droplets className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <div>
                <span className="text-[9px] text-gray-400 block">{lang === 'en' ? 'Humidity' : 'Kelembaban'}</span>
                <span className="font-bold text-white">{active.humidity}%</span>
              </div>
            </div>

            <div className="bg-white/5 p-2 rounded-lg flex items-center gap-2">
              <Wind className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[9px] text-gray-400 block">{lang === 'en' ? 'Wind' : 'Angin'}</span>
                <span className="font-bold text-white">{active.windSpeed} km/h</span>
              </div>
            </div>

            <div className="bg-white/5 p-2 rounded-lg flex items-center gap-2">
              <Waves className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <div>
                <span className="text-[9px] text-gray-400 block">{lang === 'en' ? 'Wave Height' : 'Tinggi Ombak'}</span>
                <span className="font-bold text-white">
                  {active.waveHeight !== undefined ? `${active.waveHeight.toFixed(1)}m` : 'Normal (<1m)'}
                </span>
              </div>
            </div>
          </div>

          {/* Smart AI Tourism Advice */}
          <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-lg p-2.5 flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-200/90 leading-relaxed">
              {lang === 'en' ? active.adviceEn : active.advice}
            </p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
