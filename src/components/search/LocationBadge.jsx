import { useLanguage } from "../../contexts/LanguageContext.jsx";
import { formatDate } from "../../utils/formatters.js";

const LocationBadge = ({ city, date, timezone }) => {
    const { t, language } = useLanguage();

    if (!city || !city.name) {
        return <div className="h-20"></div>;
    }

    return (
        <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold">{city.name}</h1>
            <p className="text-lg md:text-xl text-white/80 mt-1">
                {formatDate(date, language)}
            </p>
            <p className="text-white/60 mt-1">{city.country}</p>
        </div>
    );
};

export default LocationBadge;
