import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import SearchSuggestions from "./SearchSuggestions.jsx";
import { useDebounce } from "../../hooks/useDebounce.js";
import { useLanguage } from "../../contexts/LanguageContext.jsx";
import { apiService } from "../../services/apiService.js";

const SearchBar = ({ onSelectCity, onGeolocate }) => {
    const { t } = useLanguage();
    const { control, watch, setValue, handleSubmit } = useForm({
        defaultValues: { search: "" },
    });

    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchInput = watch("search");
    // задержка 500мс для уменьшения кол-ва запросов в API при поиске (стандартно ставят 200-300мс)
    const debouncedSearch = useDebounce(searchInput, 500);
    const wrapperRef = useRef(null);

    // Fetch suggestions
    useEffect(() => {
        if (debouncedSearch && debouncedSearch.length > 2) {
            setIsLoading(true);
            apiService
                .getGeocoding(debouncedSearch)
                .then((data) => {
                    setSuggestions(
                        data.map((item) => ({
                            name: item.name,
                            country: item.country,
                            state: item.state,
                            lat: item.lat,
                            lon: item.lon,
                        }))
                    );
                })
                .catch(console.error)
                .finally(() => setIsLoading(false));
        } else {
            setSuggestions([]);
        }
    }, [debouncedSearch]);

    const handleSelect = (city) => {
        onSelectCity(city);
        setValue("search", "");
        setSuggestions([]);
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setSuggestions([]);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const onFormSubmit = () => {
        if (suggestions.length > 0) {
            handleSelect(suggestions[0]);
        }
    };

    return (
        <div className="flex gap-4 w-full">
            <div ref={wrapperRef} className="relative flex-grow">
                <form onSubmit={handleSubmit(onFormSubmit)} className="flex">
                    <Controller
                        name="search"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder={t("searchPlaceholder")}
                                className="w-full pl-12 pr-4 py-3 bg-white/20 dark:bg-black/20 text-white placeholder-white/60 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
                                autoComplete="off"
                            />
                        )}
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </form>

                <SearchSuggestions
                    suggestions={suggestions}
                    onSelect={handleSelect}
                    loading={isLoading}
                />
            </div>

            <button
                onClick={onGeolocate}
                className="flex-shrink-0 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors flex items-center gap-2 backdrop-blur-sm"
                title={t("currentLocation")}
            >
                <svg
                    className="w-5 h-5"
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
                <span className="hidden sm:inline">{t("currentLocation")}</span>
            </button>
        </div>
    );
};

export default SearchBar;
