import { useLanguage } from "../../contexts/LanguageContext.jsx";
import { useUnits } from "../../contexts/UnitsContext.jsx";
import {
    formatTemperature,
    getWeatherIconUrl,
} from "../../utils/formatters.js";

const CurrentWeatherCard = ({ data }) => {
    const { t } = useLanguage();
    const { units } = useUnits();
    const { weather, main } = data;
    const weatherInfo = weather[0];

    return (
        <div className="glass-card">
            <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                {/* Temperature and Description */}
                <div className="flex-1">
                    <div className="text-6xl md:text-8xl font-bold text-white">
                        {formatTemperature(main.temp, units)}
                    </div>
                    <div className="text-xl text-white/80 capitalize mt-2">
                        {weatherInfo.description}
                    </div>
                    <div className="text-lg text-white/60 mt-1">
                        {t("feelsLike")}{" "}
                        {formatTemperature(main.feels_like, units)}
                    </div>
                </div>

                {/* Weather Icon */}
                <div className="flex-1 flex justify-center -my-4 sm:-my-8">
                    <img
                        src={getWeatherIconUrl(weatherInfo.icon, 4)}
                        alt={weatherInfo.description}
                        className="w-32 h-32 sm:w-48 sm:h-48 object-contain drop-shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default CurrentWeatherCard;
