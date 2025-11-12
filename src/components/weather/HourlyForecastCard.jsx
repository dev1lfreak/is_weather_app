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
                    className="w-3 h-3 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"
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
