import { useLanguage } from "../../contexts/LanguageContext.jsx";

export const Card = ({ children, className = "" }) => (
    <div className={`glass-card ${className}`}>{children}</div>
);

export const Loader = () => {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="mt-4 text-white/80 text-lg">{t("loading")}</p>
        </div>
    );
};

export const Error = ({ message, onRetry }) => {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center py-12 text-center text-white">
            <svg
                className="w-16 h-16 text-red-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
            </svg>
            <h3 className="text-xl font-semibold mb-2">{t("error")}</h3>
            <p className="text-white/60 mb-6 max-w-md">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
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
        <div className="flex flex-col items-center justify-center py-12 text-center text-white">
            <svg
                className="w-16 h-16 text-white/40 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
            <h3 className="text-xl font-semibold mb-2">No Location Selected</h3>
            <p className="text-white/60 max-w-md">
                Search for a city or use your current location to see weather
                information.
            </p>
        </div>
    );
};

export const Offline = () => {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center py-12 text-center text-white">
            <svg
                className="w-16 h-16 text-yellow-400 mb-4"
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
            <h3 className="text-xl font-semibold mb-2">Offline</h3>
            <p className="text-white/60 mb-4">You are currently offline.</p>
            <p className="text-white/40 text-sm">
                Please check your internet connection.
            </p>
        </div>
    );
};

const States = {
    Card,
    Loader,
    Error,
    Empty,
    Offline,
};

export default States;
