import { useLanguage } from "../../contexts/LanguageContext.jsx";
import { formatTime } from "../../utils/formatters.js";

const SunCycle = ({ sunrise, sunset, timezone }) => {
    const { t, language } = useLanguage();

    const formattedSunrise = formatTime(sunrise, timezone, language);
    const formattedSunset = formatTime(sunset, timezone, language);

    return (
        <div className="glass-card">
            <h3 className="text-lg font-semibold text-white mb-4">
                {t("sunrise")} & {t("sunset")}
            </h3>

            <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-yellow-500/20 rounded-xl">
                    <div className="flex justify-center mb-2">
                        <svg
                            className="w-8 h-8 text-yellow-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                    </div>
                    <div className="text-2xl font-bold text-white">
                        {formattedSunrise}
                    </div>
                    <div className="text-white/60 text-sm mt-1">
                        {t("sunrise")}
                    </div>
                </div>

                <div className="text-center p-4 bg-orange-500/20 rounded-xl">
                    <div className="flex justify-center mb-2">
                        <svg
                            className="w-8 h-8 text-orange-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                        </svg>
                    </div>
                    <div className="text-2xl font-bold text-white">
                        {formattedSunset}
                    </div>
                    <div className="text-white/60 text-sm mt-1">
                        {t("sunset")}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SunCycle;
