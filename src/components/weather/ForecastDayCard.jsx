import { useLanguage } from "../../contexts/LanguageContext.jsx";
import { useUnits } from "../../contexts/UnitsContext.jsx";
import {
    formatTemperature,
    formatShortDay,
    getWeatherIconUrl,
} from "../../utils/formatters.js";

const ForecastDayCard = ({ day, isSelected, onClick }) => {
    const { t, language } = useLanguage();
    const { units } = useUnits();

    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
                isSelected
                    ? "bg-blue-500 text-white shadow-lg scale-105"
                    : "bg-white/10 text-white hover:bg-white/20"
            }`}
        >
            <div
                className={`font-medium ${
                    isSelected ? "text-white" : "text-white/80"
                }`}
            >
                {formatShortDay(day.dt, language)}
            </div>

            <img
                src={getWeatherIconUrl(day.icon, 2)}
                alt={day.description}
                className="w-12 h-12 my-2 object-contain"
            />

            <div className="flex items-center space-x-2">
                <div className="font-bold text-lg">
                    {formatTemperature(day.temp.max, units)}
                </div>
                <div
                    className={`text-sm ${
                        isSelected ? "text-white/80" : "text-white/60"
                    }`}
                >
                    {formatTemperature(day.temp.min, units)}
                </div>
            </div>
        </button>
    );
};

export default ForecastDayCard;
