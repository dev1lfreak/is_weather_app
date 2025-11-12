import { useState } from "react";
import ForecastDayCard from "./ForecastDayCard.jsx";
import HourlyForecastCard from "./HourlyForecastCard.jsx";
import { useLanguage } from "../../contexts/LanguageContext.jsx";

const ForecastList = ({ daily, hourly, timezone }) => {
    const { t } = useLanguage();
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);

    const selectedDay = daily[selectedDayIndex];
    const hourlyData = selectedDayIndex === 0 ? hourly : [];

    return (
        <div className="glass-card">
            <h2 className="text-xl font-semibold text-white mb-4">
                {t("dailyForecast")}
            </h2>

            {/* Daily Forecast */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                {daily.map((day, index) => (
                    <ForecastDayCard
                        key={day.dt}
                        day={day}
                        isSelected={index === selectedDayIndex}
                        onClick={() => setSelectedDayIndex(index)}
                    />
                ))}
            </div>

            {/* Hourly Forecast (only for today) */}
            {selectedDayIndex === 0 && hourlyData.length > 0 && (
                <>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        {t("hourlyForecast")}
                    </h3>
                    <div className="flex overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
                        <div className="flex space-x-3">
                            {hourlyData.map((hour, index) => (
                                <HourlyForecastCard
                                    key={`${hour.dt}-${index}`}
                                    hour={hour}
                                    timezone={timezone}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ForecastList;
