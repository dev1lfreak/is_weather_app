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

            <div className="flex flex-col gap-4">
            <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="flex justify-center mb-2">
                    <svg
                        className="w-8 h-8 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="12" cy="12" r="5" strokeWidth={2.5} />

                        <line x1="12" y1="1" x2="12" y2="4" strokeWidth={2} strokeLinecap="round" />
                        <line x1="12" y1="20" x2="12" y2="23" strokeWidth={2} strokeLinecap="round" />
                        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" strokeWidth={2} strokeLinecap="round" />
                        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" strokeWidth={2} strokeLinecap="round" />
                        <line x1="1" y1="12" x2="4" y2="12" strokeWidth={2} strokeLinecap="round" />
                        <line x1="20" y1="12" x2="23" y2="12" strokeWidth={2} strokeLinecap="round" />
                        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" strokeWidth={2} strokeLinecap="round" />
                        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" strokeWidth={2} strokeLinecap="round" />
                    </svg>
                </div>
                <div className="text-2xl font-bold text-white">
                    {formattedSunrise}
                </div>
                <div className="text-white/60 text-sm mt-1">
                    {t("sunrise")}
                </div>
            </div>

            <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="flex justify-center mb-2">
                    <svg
                        className="w-8 h-8 text-orange-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M16 12a6 6 0 1 1-8-5.656 7 7 0 1 0 8 5.656z"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
