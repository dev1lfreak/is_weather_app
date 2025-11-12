import { useLanguage } from "../../contexts/LanguageContext.jsx";
import { useUnits } from "../../contexts/UnitsContext.jsx";
import {
    formatWindSpeed,
    formatPressure,
    formatHumidity,
} from "../../utils/formatters.js";

const WeatherMetrics = ({ data }) => {
    const { t } = useLanguage();
    const { units } = useUnits();
    const { main, wind, visibility } = data;

    const metrics = [
        {
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                </svg>
            ),
            title: t("humidity"),
            value: formatHumidity(main.humidity),
            color: "text-blue-300",
        },
        {
            icon: (
                <svg
                    className="w-6 h-6"
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
            ),
            title: t("wind"),
            value: formatWindSpeed(wind.speed, units),
            color: "text-green-300",
        },
        {
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                </svg>
            ),
            title: t("pressure"),
            value: formatPressure(main.pressure),
            color: "text-purple-300",
        },
        {
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                </svg>
            ),
            title: t("visibility"),
            value: `${(visibility / 1000).toFixed(1)} km`,
            color: "text-yellow-300",
        },
    ];

    return (
        <div className="glass-card">
            <div className="grid grid-cols-2 gap-4">
                {metrics.map((metric, index) => (
                    <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg"
                    >
                        <div
                            className={`p-2 rounded-lg bg-white/10 ${metric.color}`}
                        >
                            {metric.icon}
                        </div>
                        <div>
                            <div className="text-sm text-white/60">
                                {metric.title}
                            </div>
                            <div className="text-lg font-semibold text-white">
                                {metric.value}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherMetrics;
