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
        if (geoLoading && !selectedLocation) return <States.Loader />
        if (geoError && !selectedLocation)
            return <States.Error message={t('errorGeolocation')} onRetry={handleGeolocate} />
        if (loading) return <States.Loader />
        if (error) return <States.Error message={error.message} onRetry={refetch} />
        if (isEmpty) return <States.Empty />
        if (data) {
            const { current, forecast, airPollution, location } = data

            return (
                <div className="space-y-8 animate-fade-in">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        <div className="lg:col-span-1 space-y-8">
                            <AQICard data={airPollution} />
                            <WeatherMetrics data={current} />
                            <SunCycle
                                sunrise={current.sys.sunrise}
                                sunset={current.sys.sunset}
                                timezone={current.timezone}
                            />
                        </div>

                        <div className="lg:col-span-2 space-y-8">
                            <LocationBadge city={location} date={current.dt} timezone={current.timezone} />
                            <CurrentWeatherCard data={current} />
                            <ForecastList daily={forecast.daily} hourly={forecast.hourly} timezone={current.timezone} />
                            <div className="hidden sm:grid grid-cols-1 lg:grid-cols-2 gap-8">

                            </div>
                        </div>
                    </div>
                    <div className="sm:hidden space-y-6">
                        <WeatherMetrics data={current} />
                        <SunCycle sunrise={current.sys.sunrise} sunset={current.sys.sunset} timezone={current.timezone} />
                    </div>
                </div>
            )
        }
        return null
    }

    return (
        <div className="min-h-screen relative overflow-hidden text-white transition-colors duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-500 dark:from-[#0d0d10] dark:via-[#192339] dark:to-[#4b2658]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(58,99,255,0.15),transparent_60%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,99,179,0.12),transparent_70%)]"></div>
            <div className="absolute inset-0 backdrop-blur-[100px]"></div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                <Header onHistoryClick={() => setIsHistoryOpen(true)} />

                <main className="mt-8 space-y-8">
                    <SearchBar onSelectCity={handleLocationSelect} onGeolocate={handleGeolocate} />
                    <div className="rounded-2xl p-6 bg-white/5 shadow-inner border border-white/10 backdrop-blur-xl">
                        {renderContent()}
                    </div>
                </main>

                <footer className="mt-10 text-center text-sm text-white/50 tracking-wider">
                    <div className="opacity-70">{t('appName')} • {new Date().getFullYear()}</div>
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
