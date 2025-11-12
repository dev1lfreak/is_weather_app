import { useState, useEffect, useCallback } from 'react'
import { useFetchJson } from './useFetchJson.js'
import { apiService } from '../services/apiService.js'

export const useWeather = (location, units = 'metric', language = 'en') => {
    const [weatherData, setWeatherData] = useState(null)

    const fetchWeatherData = useCallback(async () => {
        if (!location?.lat || !location?.lon) {
            return null
        }

        try {
            const data = await apiService.getWeatherData(location, units, language)

            // Process forecast data to group by day
            const dailyForecast = processDailyForecast(data.forecast.list)
            const hourlyForecast = data.forecast.list.slice(0, 8) // Next 24 hours

            return {
                current: data.current,
                forecast: {
                    daily: dailyForecast,
                    hourly: hourlyForecast
                },
                airPollution: data.airPollution,
                location: data.location
            }
        } catch (error) {
            throw error
        }
    }, [location?.lat, location?.lon, units, language])

    const { loading, error, data, refetch } = useFetchJson(fetchWeatherData, [
        location?.lat,
        location?.lon,
        units,
        language
    ])

    useEffect(() => {
        if (data) {
            setWeatherData(data)
        }
    }, [data])

    const isEmpty = !location || (!loading && !error && !data)

    return {
        loading,
        error,
        data: weatherData,
        isEmpty,
        refetch
    }
}

const processDailyForecast = (forecastList) => {
    const daily = {}

    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000)
        const dateString = date.toDateString()

        if (!daily[dateString]) {
            daily[dateString] = {
                date: item.dt,
                temps: [],
                feelsLike: [],
                humidity: [],
                pressure: [],
                wind: [],
                icons: [],
                descriptions: []
            }
        }

        const day = daily[dateString]
        day.temps.push(item.main.temp)
        day.feelsLike.push(item.main.feels_like)
        day.humidity.push(item.main.humidity)
        day.pressure.push(item.main.pressure)
        day.wind.push(item.wind.speed)
        day.icons.push(item.weather[0].icon)
        day.descriptions.push(item.weather[0].description)
    })

    return Object.values(daily).slice(0, 5).map(day => ({
        dt: day.date,
        temp: {
            min: Math.min(...day.temps),
            max: Math.max(...day.temps),
            avg: day.temps.reduce((a, b) => a + b) / day.temps.length
        },
        feels_like: day.feelsLike.reduce((a, b) => a + b) / day.feelsLike.length,
        humidity: Math.round(day.humidity.reduce((a, b) => a + b) / day.humidity.length),
        pressure: Math.round(day.pressure.reduce((a, b) => a + b) / day.pressure.length),
        wind: day.wind.reduce((a, b) => a + b) / day.wind.length,
        // Use the icon from midday for better representation
        icon: day.icons[Math.floor(day.icons.length / 2)] || day.icons[0],
        description: day.descriptions[Math.floor(day.descriptions.length / 2)] || day.descriptions[0]
    }))
}