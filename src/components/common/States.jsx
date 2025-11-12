import { useLanguage } from "../../contexts/LanguageContext.jsx";

export const Card = ({ children, className = "" }) => (
    <div
        className={`glass-card relative overflow-hidden p-6 rounded-2xl shadow-[inset_2px_2px_10px_rgba(255,255,255,0.05),inset_-2px_-2px_8px_rgba(0,0,0,0.5)] 
        bg-gradient-to-br from-gray-800/60 to-gray-900/90 backdrop-blur-2xl border border-gray-700/30 hover:border-gray-500/50 transition-all duration-300
        ${className}`}
    >
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-40"></div>
        {children}
    </div>
);

export const Loader = () => {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center text-white animate-fade-in">
            <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-400/40 to-pink-400/40 blur-xl"></div>
                <div className="animate-spin h-16 w-16 border-[3px] border-white/20 border-t-transparent rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]"></div>
            </div>
            <p className="text-lg tracking-widest text-white/70 uppercase">{t("loading")}...</p>
        </div>
    );
};

export const Error = ({ message, onRetry }) => {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center text-white animate-fade-in">
            <div className="relative mb-6">
                <div className="absolute inset-0 blur-xl bg-red-500/20 rounded-full"></div>
                <svg
                    className="w-16 h-16 text-red-400 relative z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01M9.172 16.828a4 4 0 115.656 0L12 20l-2.828-3.172z"
                    />
                </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2 tracking-tight text-red-300">{t("error")}</h3>
            <p className="text-white/60 mb-6 max-w-sm leading-relaxed">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500/60 to-orange-500/60 hover:from-red-500 hover:to-orange-500 transition-all text-white font-medium shadow-md"
                >
                    {t("retry")}
                </button>
            )}
        </div>
    );
};

export const Empty = () => {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center text-white animate-fade-in">
            <svg
                className="w-20 h-20 text-white/30 mb-5 drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
            <h3 className="text-2xl font-semibold mb-3 text-white/90">No Location Selected</h3>
            <p className="text-white/50 max-w-sm leading-relaxed">
                Search for a city or use your current location to see live weather data.
            </p>
        </div>
    );
};

export const Offline = () => {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center text-white animate-fade-in">
            <div className="relative mb-6">
                <div className="absolute inset-0 blur-xl bg-yellow-400/10 rounded-full"></div>
                <svg
                    className="w-16 h-16 text-yellow-400 relative z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    />
                </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-yellow-300">Offline</h3>
            <p className="text-white/70 mb-3">You are currently offline.</p>
            <p className="text-white/40 text-sm">Please check your internet connection.</p>
        </div>
    );
};

const States = { Card, Loader, Error, Empty, Offline };
export default States;
