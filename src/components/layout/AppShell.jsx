import { useState, useEffect } from 'react'
import Header from './Header.jsx'
import SearchBar from '../search/SearchBar.jsx'
import LocationBadge from '../search/LocationBadge.jsx'
import CurrentWeatherCard from '../weather/CurrentWeatherCard.jsx'
import WeatherMetrics from '../weather/WeatherMetrics.jsx'
import SunCycle from '../weather/SunCycle.jsx'
import ForecastList from '../weather/ForecastList.jsx'
import AQICard from '../weather/AQICard.jsx'
import HistoryDrawer from '../search/HistoryDrawer.jsx'
import States from '../common/States.jsx'
import { useWeather } from '../../hooks/useWeather.js'
import { useGeolocation } from '../../hooks/useGeolocation.js'
import { useLanguage } from '../../contexts/LanguageContext.jsx'
import { useUnits } from '../../contexts/UnitsContext.jsx'
import { useHistory } from '../../contexts/HistoryContext.jsx'
import { apiService } from '../../services/apiService.js'

const AppShell = () => {
    const { t } = useLanguage()
    const { units } = useUnits()
    const { language } = useLanguage()
    const { history, addToHistory } = useHistory()

    const [selectedLocation, setSelectedLocation] = useState(null)
    const [isHistoryOpen, setIsHistoryOpen] = useState(false)

    const { loading: geoLoading, error: geoError, data: geoData } = useGeolocation()
    const { loading, error, data, isEmpty, refetch } = useWeather(selectedLocation, units, language)

    // Auto-detect location on mount
    useEffect(() => {
        if (geoData && !selectedLocation) {
            apiService.getReverseGeocoding(geoData.lat, geoData.lon)
                .then(location => {
                    if (location) {
                        const locationData = {
                            name: location.name,
                            country: location.country,
                            lat: geoData.lat,
                            lon: geoData.lon
                        }
                        setSelectedLocation(locationData)
                        addToHistory(locationData)
                    }
                })
                .catch(console.error)
        }
    }, [geoData, selectedLocation, addToHistory])

    const handleLocationSelect = (location) => {
        setSelectedLocation(location)
        addToHistory(location)
    }

    const handleGeolocate = () => {
        if (geoData) {
            apiService.getReverseGeocoding(geoData.lat, geoData.lon)
                .then(location => {
                    if (location) {
                        const locationData = {
                            name: location.name,
                            country: location.country,
                            lat: geoData.lat,
                            lon: geoData.lon
                        }
                        setSelectedLocation(locationData)
                        addToHistory(locationData)
                    }
                })
                .catch(console.error)
        }
    }

    const renderContent = () => {
        // Initial geolocation loading
        if (geoLoading && !selectedLocation) {
            return <States.Loader />
        }

        // Geolocation error
        if (geoError && !selectedLocation) {
            return (
                <States.Error
                    message={t('errorGeolocation')}
                    onRetry={handleGeolocate}
                />
            )
        }

        // Weather data loading
        if (loading) {
            return <States.Loader />
        }

        // Weather data error
        if (error) {
            return (
                <States.Error
                    message={error.message}
                    onRetry={refetch}
                />
            )
        }

        // No location selected
        if (isEmpty) {
            return <States.Empty />
        }

        // Weather data available
        if (data) {
            const { current, forecast, airPollution, location } = data

            return (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            <LocationBadge
                                city={location}
                                date={current.dt}
                                timezone={current.timezone}
                            />
                            <CurrentWeatherCard data={current} />

                            {/* Metrics for desktop */}
                            <div className="hidden sm:grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <WeatherMetrics data={current} />
                                <SunCycle
                                    sunrise={current.sys.sunrise}
                                    sunset={current.sys.sunset}
                                    timezone={current.timezone}
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-1 space-y-6">
                            <ForecastList
                                daily={forecast.daily}
                                hourly={forecast.hourly}
                                timezone={current.timezone}
                            />
                            <AQICard data={airPollution} />
                        </div>
                    </div>

                    {/* Metrics for mobile */}
                    <div className="sm:hidden space-y-4">
                        <WeatherMetrics data={current} />
                        <SunCycle
                            sunrise={current.sys.sunrise}
                            sunset={current.sys.sunset}
                            timezone={current.timezone}
                        />
                    </div>
                </div>
            )
        }

        return null
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-300 via-blue-500 to-purple-700 dark:from-gray-800 dark:via-gray-900 dark:to-black text-white transition-colors duration-300">
            <div className="container mx-auto px-4 py-6">
                <Header onHistoryClick={() => setIsHistoryOpen(true)} />

                <main className="mt-6 space-y-6">
                    <SearchBar
                        onSelectCity={handleLocationSelect}
                        onGeolocate={handleGeolocate}
                    />

                    {renderContent()}
                </main>

                <footer className="mt-8 text-center text-sm text-white/60">
                    {t('appName')} • {new Date().getFullYear()}
                </footer>
            </div>

            <HistoryDrawer
                isOpen={isHistoryOpen}
                onClose={() => setIsHistoryOpen(false)}
                onSelect={handleLocationSelect}
            />
        </div>
    )
}

export default AppShell