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
    const debouncedSearch = useDebounce(searchInput, 500);
    const wrapperRef = useRef(null);

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
                            className="w-5 h-5 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <circle cx="11" cy="11" r="7" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="16" y1="16" x2="21" y2="21" strokeWidth={2.5} strokeLinecap="round" />
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
                className="flex-shrink-0 px-4 py-3 bg-blue-400 hover:bg-blue-800 text-white rounded-full transition-colors flex items-center gap-2 backdrop-blur-sm"
                title={t("currentLocation")}
            >
                <span className="hidden sm:inline">{t("currentLocation")}</span>
            </button>
        </div>
    );
};

export default SearchBar;