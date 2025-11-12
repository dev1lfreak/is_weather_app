import { useLanguage } from "../../contexts/LanguageContext.jsx";
import { getAqiLevel } from "../../utils/formatters.js";

const AQICard = ({ data }) => {
    const { t } = useLanguage();

    if (!data || !data.list || data.list.length === 0) {
        return null;
    }

    const airData = data.list[0];
    const aqi = airData.main.aqi;
    const components = airData.components;

    const aqiInfo = getAqiLevel(aqi);
    const aqiText = t("aqiLevels")[aqi];

    return (
        <div className="glass-card">
            <h2 className="text-xl font-semibold text-white mb-4">
                {t("airQuality")}
            </h2>

            <div
                className={`text-white`}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-2xl font-bold">{aqiText}</div>
                        <div className="text-white/80">
                            {t("aqi")}: {aqi}
                        </div>
                    </div>
                    <div className="text-4xl font-bold">{aqi}</div>
                </div>

                <div className="mt-4 relative h-2 bg-white/30 rounded-full">
                    <div
                        className={`absolute top-0 left-0 h-full rounded-full bg-white transition-all duration-300`}
                        style={{ width: `${(aqi / 5) * 100}%` }}
                    />
                    <div
                        className="absolute top-1/2 w-3 h-3 bg-white rounded-full border-2 border-gray-600 transform -translate-y-1/2 transition-all duration-300"
                        style={{ left: `${(aqi / 5) * 100}%` }}
                    />
                </div>

                <div className="flex justify-between text-xs mt-1 text-white/80">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                </div>
            </div>

            <div className="mt-4 p-3 bg-white/5 rounded-lg">
                <div className="text-sm text-white/80">
                    {t("aqiDescription")[aqi]}
                </div>
            </div>
        </div>
    );
};

export default AQICard;
