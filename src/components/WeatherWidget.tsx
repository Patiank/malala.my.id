import React, { useState, useEffect, useCallback } from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudFog,
  Wind,
  Droplets,
  Thermometer,
  RefreshCw,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { Language } from '../lib/translations';

interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  isDay: boolean;
  time: string;
}

interface WeatherWidgetProps {
  lang: Language;
  textColor?: string;
  textShadow?: boolean;
  compact?: boolean;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  lang,
  textColor = '#000000',
  textShadow = true,
  compact = false,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      // Coordinates for Padang, West Sumatra
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=-0.9492&longitude=100.3543&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=Asia%2FJakarta'
      );
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const data = await response.json();

      if (data.current) {
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          apparentTemperature: Math.round(data.current.apparent_temperature),
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          weatherCode: data.current.weather_code,
          isDay: data.current.is_day === 1,
          time: data.current.time,
        });
        setLastUpdated(new Date());
      } else {
        throw new Error('Invalid weather data structure');
      }
    } catch (err) {
      console.warn('Weather fetch error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
    // Auto refresh every 10 minutes
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, [fetchWeather]);

  const getWeatherInfo = (code: number, isDay: boolean) => {
    // WMO Weather interpretation codes (WW)
    if (code === 0) {
      return {
        label: lang === 'en' ? 'Clear & Sunny' : 'Cerah',
        icon: isDay ? Sun : Sun,
        color: 'text-amber-500',
        bgGradient: 'from-amber-50 to-orange-50',
      };
    }
    if (code === 1 || code === 2) {
      return {
        label: lang === 'en' ? 'Partly Cloudy' : 'Cerah Berawan',
        icon: CloudSun,
        color: 'text-amber-600',
        bgGradient: 'from-blue-50 to-amber-50',
      };
    }
    if (code === 3) {
      return {
        label: lang === 'en' ? 'Overcast' : 'Berawan',
        icon: Cloud,
        color: 'text-slate-600',
        bgGradient: 'from-slate-50 to-gray-100',
      };
    }
    if (code === 45 || code === 48) {
      return {
        label: lang === 'en' ? 'Foggy' : 'Berkabut',
        icon: CloudFog,
        color: 'text-slate-500',
        bgGradient: 'from-slate-100 to-gray-200',
      };
    }
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67].includes(code)) {
      return {
        label: lang === 'en' ? 'Rainy' : 'Hujan',
        icon: CloudRain,
        color: 'text-blue-600',
        bgGradient: 'from-blue-50 to-indigo-100',
      };
    }
    if ([80, 81, 82].includes(code)) {
      return {
        label: lang === 'en' ? 'Heavy Rain' : 'Hujan Deras',
        icon: CloudRain,
        color: 'text-blue-700',
        bgGradient: 'from-blue-100 to-indigo-200',
      };
    }
    if ([95, 96, 99].includes(code)) {
      return {
        label: lang === 'en' ? 'Thunderstorm' : 'Hujan Petir',
        icon: CloudLightning,
        color: 'text-purple-600',
        bgGradient: 'from-purple-50 to-indigo-100',
      };
    }
    return {
      label: lang === 'en' ? 'Partly Cloudy' : 'Cerah Berawan',
      icon: CloudSun,
      color: 'text-amber-600',
      bgGradient: 'from-amber-50 to-blue-50',
    };
  };

  const isDarkText = textColor.toLowerCase() === '#000000' || textColor.toLowerCase() === '#000';

  const shadowStyle: React.CSSProperties = textShadow
    ? {
        textShadow: isDarkText
          ? '0 1px 4px rgba(255,255,255,0.8)'
          : '0 1px 6px rgba(0,0,0,0.85)',
      }
    : {};

  if (loading && !weather) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-xl p-3.5 shadow-md flex items-center gap-3 animate-pulse">
        <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center">
          <RefreshCw className="w-4 h-4 text-gray-400 animate-spin" />
        </div>
        <div className="space-y-1">
          <div className="h-3 w-28 bg-gray-200 rounded" />
          <div className="h-2.5 w-20 bg-gray-100 rounded" />
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-xl p-3 shadow-sm flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-red-600" />
          <span>Padang, Sumatera Barat</span>
        </div>
        <button
          onClick={fetchWeather}
          className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
          title="Retry"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  const weatherInfo = getWeatherInfo(weather.weatherCode, weather.isDay);
  const WeatherIcon = weatherInfo.icon;

  return (
    <div className="group relative bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-2xl p-3.5 sm:p-4 shadow-md hover:shadow-xl transition-all duration-300 font-jakarta max-w-sm w-full">
      {/* Header Badge */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="p-1 rounded-md bg-red-50 border border-red-100 text-red-600 shrink-0">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <div className="truncate">
            <h4 className="font-orbitron font-bold text-xs uppercase tracking-wider text-black truncate">
              Padang, West Sumatra
            </h4>
            <p className="text-[10px] text-gray-500 truncate">
              {lang === 'en' ? 'Live Weather Portal' : 'Cuaca Realtime Padang'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LIVE
          </span>
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-black transition-all cursor-pointer focus:outline-none"
            title={lang === 'en' ? 'Refresh weather' : 'Perbarui cuaca'}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-red-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Temperature & Weather Info */}
      <div className="pt-3 pb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${weatherInfo.bgGradient} border border-gray-200/60 flex items-center justify-center shadow-inner`}>
            <WeatherIcon className={`w-7 h-7 sm:w-8 sm:h-8 ${weatherInfo.color}`} />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-orbitron font-black text-2xl sm:text-3xl tracking-tight text-black">
                {weather.temperature}°C
              </span>
              <span className="text-xs font-semibold text-gray-500">
                / {weather.apparentTemperature}°C
              </span>
            </div>
            <p className="font-bold text-xs text-gray-800 leading-tight mt-0.5">
              {weatherInfo.label}
            </p>
          </div>
        </div>

        {/* Secondary Details (Humidity & Wind) */}
        <div className="flex flex-col gap-1.5 text-[11px] text-gray-600 border-l border-gray-100 pl-3 shrink-0">
          <div className="flex items-center gap-1.5" title={lang === 'en' ? 'Humidity' : 'Kelembapan'}>
            <Droplets className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="font-medium">{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-1.5" title={lang === 'en' ? 'Wind Speed' : 'Kecepatan Angin'}>
            <Wind className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span className="font-medium">{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>

      {/* Footer Note / Last Updated */}
      <div className="mt-1 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
        <span className="flex items-center gap-1 text-gray-500">
          <Sparkles className="w-3 h-3 text-amber-500" />
          {lang === 'en' ? 'Ideal for travel planning' : 'Sangat baik untuk panduan wisata'}
        </span>
        {lastUpdated && (
          <span>
            {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
};
