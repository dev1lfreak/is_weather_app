import { useLanguage } from "../../contexts/LanguageContext.jsx";
import { useUnits } from "../../contexts/UnitsContext.jsx";
import {
    formatTemperature,
    formatTime,
    getWeatherIconUrl,
    formatWindSpeed,
} from "../../utils/formatters.js";

const HourlyForecastCard = ({ hour, timezone }) => {
    const { language } = useLanguage();
    const { units } = useUnits();

    return (
        <div className="flex flex-col items-center p-3 bg-white/5 rounded-xl min-w-[80px]">
            <div className="text-sm font-medium text-white/80">
                {formatTime(hour.dt, timezone, language)}
            </div>

            <img
                src={getWeatherIconUrl(hour.weather[0].icon, 2)}
                alt={hour.weather[0].description}
                className="w-10 h-10 my-2 object-contain"
            />

            <div className="text-lg font-bold text-white">
                {formatTemperature(hour.main.temp, units)}
            </div>

            <div className="flex items-center space-x-1 mt-1">
                <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    >

                    <path
                        d="M2 8h14a3 3 0 010 6H4"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                      <path
                        d="M2 18h6a1.5 1.5 0 010 3H4"
                        strokeWidth={1.8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span className="text-xs text-white/60">
                    {formatWindSpeed(hour.wind.speed, units)}
                </span>
            </div>
        </div>
    );
};

export default HourlyForecastCard;
