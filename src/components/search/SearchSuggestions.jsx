import { useLanguage } from "../../contexts/LanguageContext.jsx";

const SearchSuggestions = ({ suggestions, onSelect, loading }) => {
    const { t } = useLanguage();

    if (loading) {
        return (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-lg z-50 p-4 text-center text-gray-600 dark:text-gray-300">
                <svg
                    className="w-5 h-5 inline-block animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 2v4m0 12v4m8-10h-4M6 12H2m15.364-6.364l-2.828 2.828M6.343 17.657l-2.828 2.828M17.657 6.343l2.828 2.828M17.657 17.657l2.828-2.828"
                    />
                </svg>
            </div>
        );
    }

    if (suggestions.length === 0) {
        return null;
    }

    return (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
            {suggestions.map((city, index) => (
                <li key={`${city.lat}-${city.lon}-${index}`}>
                    <button
                        onClick={() => onSelect(city)}
                        className="flex items-center w-full px-4 py-3 text-left text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-xl last:rounded-b-xl"
                    >
                        <svg
                            className="w-5 h-5 mr-3 text-gray-400"
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
                        <div>
                            <span className="font-medium">{city.name}</span>
                            {city.state && (
                                <span className="text-gray-500">
                                    , {city.state}
                                </span>
                            )}
                            <span className="text-gray-500">
                                , {city.country}
                            </span>
                        </div>
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default SearchSuggestions;
