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

    const componentList = [
        { name: "PM2.5", value: components.pm2_5, unit: "μg/m³" },
        { name: "PM10", value: components.pm10, unit: "μg/m³" },
        { name: "NO₂", value: components.no2, unit: "μg/m³" },
        { name: "O₃", value: components.o3, unit: "μg/m³" },
        { name: "SO₂", value: components.so2, unit: "μg/m³" },
        { name: "CO", value: components.co, unit: "mg/m³" },
    ];

    const getAqiColor = (level) => {
        const colors = {
            1: "from-green-500 to-green-400",
            2: "from-yellow-500 to-yellow-400",
            3: "from-orange-500 to-orange-400",
            4: "from-red-500 to-red-400",
            5: "from-purple-500 to-purple-400",
        };
        return colors[level] || colors[1];
    };

    return (
        <div className="glass-card">
            <h2 className="text-xl font-semibold text-white mb-4">
                {t("airQuality")}
            </h2>

            {/* AQI Main Indicator */}
            <div
                className={`bg-gradient-to-r ${getAqiColor(
                    aqi
                )} rounded-xl p-4 mb-4 text-white`}
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

                {/* AQI Scale */}
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

            {/* Pollutants */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {componentList.map((component, index) => (
                    <div
                        key={index}
                        className="text-center p-3 bg-white/5 rounded-lg"
                    >
                        <div className="text-sm font-medium text-white/80">
                            {component.name}
                        </div>
                        <div className="text-lg font-bold text-white">
                            {component.value.toFixed(1)}
                        </div>
                        <div className="text-xs text-white/60">
                            {component.unit}
                        </div>
                    </div>
                ))}
            </div>

            {/* Description */}
            <div className="mt-4 p-3 bg-white/5 rounded-lg">
                <div className="text-sm text-white/80">
                    {t("aqiDescription")[aqi]}
                </div>
            </div>
        </div>
    );
};

export default AQICard;
