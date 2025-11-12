import { useEffect, useRef } from "react";
import { useLanguage } from "../../contexts/LanguageContext.jsx";
import { useHistory } from "../../contexts/HistoryContext.jsx";

const HistoryDrawer = ({ isOpen, onClose, onSelect }) => {
    const { t } = useLanguage();
    const { history, clearHistory } = useHistory();
    const drawerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen &&
                drawerRef.current &&
                !drawerRef.current.contains(event.target)
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const handleSelect = (location) => {
        onSelect(location);
        onClose();
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                ref={drawerRef}
                className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {t("searchHistory")}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="p-4 h-full overflow-y-auto">
                    {history.length > 0 ? (
                        <>
                            <ul className="space-y-2">
                                {history.map((location, index) => (
                                    <li
                                        key={`${location.lat}-${location.lon}-${index}`}
                                    >
                                        <button
                                            onClick={() =>
                                                handleSelect(location)
                                            }
                                            className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <div className="font-medium">
                                                {location.name}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {location.country}
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={clearHistory}
                                className="w-full mt-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                            >
                                {t("clearHistory")}
                            </button>
                        </>
                    ) : (
                        <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                            <svg
                                className="w-12 h-12 mx-auto mb-4 opacity-50"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p>{t("noHistory")}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default HistoryDrawer;
