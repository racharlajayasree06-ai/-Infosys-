import React, { useState } from 'react';
import { 
  CloudSun, 
  CloudRain, 
  Sun, 
  Thermometer, 
  Droplets, 
  Wind, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  Sparkles,
  ShoppingBag,
  Truck
} from 'lucide-react';

interface CityWeatherInfo {
  city: string;
  temp: number;
  condition: 'Heavy Rain' | 'Pleasant' | 'Extreme Heat' | 'Thunderstorm';
  humidity: number;
  windSpeed: number;
  footfallImpact: number; // percentage change
  revenueImpact: number;
  deliverySurge: number;
  recommendedAction: string;
}

const INITIAL_CITIES: CityWeatherInfo[] = [
  {
    city: 'Mumbai',
    temp: 28,
    condition: 'Heavy Rain',
    humidity: 92,
    windSpeed: 24,
    footfallImpact: -26,
    revenueImpact: -14,
    deliverySurge: 42,
    recommendedAction: 'Boost online delivery partner dispatch, launch "Rainy Day Special" combos, and increase packaging box buffers by 30%.'
  },
  {
    city: 'Delhi',
    temp: 41,
    condition: 'Extreme Heat',
    humidity: 38,
    windSpeed: 12,
    footfallImpact: -18,
    revenueImpact: -8,
    deliverySurge: 25,
    recommendedAction: 'Pre-stock cold beverage dispensers, extend evening hours till 11 PM, and run iced coffee promotions.'
  },
  {
    city: 'Bengaluru',
    temp: 24,
    condition: 'Pleasant',
    humidity: 65,
    windSpeed: 14,
    footfallImpact: 16,
    revenueImpact: 18,
    deliverySurge: 5,
    recommendedAction: 'Expand patio seating capacity, feature outdoor dining promotions, and stock extra fresh bakery inventories.'
  },
  {
    city: 'Hyderabad',
    temp: 34,
    condition: 'Pleasant',
    humidity: 58,
    windSpeed: 16,
    footfallImpact: 8,
    revenueImpact: 10,
    deliverySurge: 12,
    recommendedAction: 'Maintain standard inventory reorder levels. Optimize staffing during peak lunch hour rush.'
  },
  {
    city: 'Chennai',
    temp: 36,
    condition: 'Extreme Heat',
    humidity: 82,
    windSpeed: 18,
    footfallImpact: -12,
    revenueImpact: -5,
    deliverySurge: 20,
    recommendedAction: 'Ensure HVAC units operate at peak efficiency. Offer complimentary bottled water with orders above ₹500.'
  },
  {
    city: 'Pune',
    temp: 26,
    condition: 'Thunderstorm',
    humidity: 88,
    windSpeed: 28,
    footfallImpact: -22,
    revenueImpact: -11,
    deliverySurge: 35,
    recommendedAction: 'Activate monsoon safety guidelines for delivery personnel and issue automated stock alerts.'
  }
];

export const WeatherDemoView: React.FC = () => {
  const [cities, setCities] = useState<CityWeatherInfo[]>(INITIAL_CITIES);
  const [selectedCityName, setSelectedCityName] = useState<string>('Mumbai');

  const selectedCity = cities.find(c => c.city === selectedCityName) || cities[0];

  const handleSimulateScenario = (scenario: 'Heavy Rain' | 'Extreme Heat' | 'Pleasant') => {
    setCities(prev => prev.map(c => {
      if (c.city === selectedCityName) {
        if (scenario === 'Heavy Rain') {
          return {
            ...c,
            condition: 'Heavy Rain',
            temp: 26,
            humidity: 94,
            footfallImpact: -28,
            revenueImpact: -16,
            deliverySurge: 45,
            recommendedAction: 'Heavy rainfall alert activated! Shift 80% focus to delivery apps and send instant push discounts.'
          };
        } else if (scenario === 'Extreme Heat') {
          return {
            ...c,
            condition: 'Extreme Heat',
            temp: 42,
            humidity: 40,
            footfallImpact: -20,
            revenueImpact: -9,
            deliverySurge: 28,
            recommendedAction: 'Heatwave warning! Focus on cold drinks, iced desserts, and air-conditioned evening dining.'
          };
        } else {
          return {
            ...c,
            condition: 'Pleasant',
            temp: 25,
            humidity: 60,
            footfallImpact: 18,
            revenueImpact: 22,
            deliverySurge: 8,
            recommendedAction: 'Optimal weather conditions! Expect peak walk-in dining footfall across all city outlets.'
          };
        }
      }
      return c;
    }));
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Heavy Rain':
      case 'Thunderstorm':
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      case 'Extreme Heat':
        return <Sun className="w-6 h-6 text-amber-500" />;
      default:
        return <CloudSun className="w-6 h-6 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-orange-100 text-orange-600 border border-orange-200">
              <CloudSun className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Indian City Weather Impact Simulator</h2>
          </div>
          <p className="text-xs text-slate-500">
            Real-time weather telemetry forecasting footfall fluctuations and recommending AI-driven mitigation steps.
          </p>
        </div>

        {/* City Selector Buttons */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {cities.map(c => (
            <button
              key={c.city}
              onClick={() => setSelectedCityName(c.city)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCityName === c.city
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              {c.city}
            </button>
          ))}
        </div>
      </div>

      {/* Main Selected City Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* City Weather & Footfall Spotlight Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 border border-orange-200/80 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-orange-100">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                <h3 className="text-2xl font-black text-slate-900">{selectedCity.city} Metro Region</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium mt-0.5 block">
                Live Telemetry & Footfall Forecast Model
              </span>
            </div>

            {/* Weather Condition Badge */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-orange-200 shadow-sm">
              {getWeatherIcon(selectedCity.condition)}
              <div>
                <div className="text-sm font-bold text-slate-900">{selectedCity.condition}</div>
                <div className="text-xs text-slate-500 font-mono">{selectedCity.temp}°C Temperature</div>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="bg-white p-4 rounded-xl border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Temperature</span>
              <div className="text-xl font-black text-slate-900 font-mono flex items-center gap-1">
                <Thermometer className="w-4 h-4 text-orange-500" />
                <span>{selectedCity.temp}°C</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Humidity</span>
              <div className="text-xl font-black text-slate-900 font-mono flex items-center gap-1">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span>{selectedCity.humidity}%</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Footfall Impact</span>
              <div className={`text-xl font-black font-mono flex items-center gap-1 ${
                selectedCity.footfallImpact < 0 ? 'text-rose-600' : 'text-emerald-600'
              }`}>
                {selectedCity.footfallImpact < 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                <span>{selectedCity.footfallImpact > 0 ? `+${selectedCity.footfallImpact}%` : `${selectedCity.footfallImpact}%`}</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Delivery Surge</span>
              <div className="text-xl font-black text-orange-600 font-mono flex items-center gap-1">
                <Truck className="w-4 h-4 text-orange-500" />
                <span>+{selectedCity.deliverySurge}%</span>
              </div>
            </div>

          </div>

          {/* AI Recommendation Alert Box */}
          <div className="bg-white p-5 rounded-xl border border-orange-200 space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-700 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>AI Operational Recommendation:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              "{selectedCity.recommendedAction}"
            </p>
          </div>

          {/* Weather Scenario Tester */}
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-600 block mb-2">Simulate Weather Change for {selectedCity.city}:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSimulateScenario('Heavy Rain')}
                className="py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <CloudRain className="w-4 h-4 text-blue-600" />
                <span>Simulate Heavy Rain</span>
              </button>

              <button
                onClick={() => handleSimulateScenario('Extreme Heat')}
                className="py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Sun className="w-4 h-4 text-amber-600" />
                <span>Simulate Summer Heatwave</span>
              </button>

              <button
                onClick={() => handleSimulateScenario('Pleasant')}
                className="py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <CloudSun className="w-4 h-4 text-emerald-600" />
                <span>Simulate Clear Weather</span>
              </button>
            </div>
          </div>

        </div>

        {/* All Cities Status Overview List */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-600" />
            <span>Regional Outlets Summary</span>
          </h3>

          <div className="space-y-3">
            {cities.map(c => (
              <div
                key={c.city}
                onClick={() => setSelectedCityName(c.city)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedCityName === c.city
                    ? 'bg-orange-50/80 border-orange-300 ring-2 ring-orange-200'
                    : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-900 text-xs">{c.city}</span>
                  <span className="text-xs font-mono font-bold text-slate-700">{c.temp}°C</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">{c.condition}</span>
                  <span className={`font-bold ${c.footfallImpact < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    Footfall: {c.footfallImpact > 0 ? `+${c.footfallImpact}%` : `${c.footfallImpact}%`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
