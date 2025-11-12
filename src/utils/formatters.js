export const formatTemperature = (temp, units) => {
    return units === 'metric' ? `${Math.round(temp)}°C` : `${Math.round(temp)}°F`
}

export const formatWindSpeed = (speed, units) => {
    return units === 'metric'
        ? `${(speed * 3.6).toFixed(1)} km/h`
        : `${speed.toFixed(1)} mph`
}

export const formatPressure = (pressure) => {
    return `${pressure} hPa`
}

export const formatHumidity = (humidity) => {
    return `${humidity}%`
}

export const formatTime = (timestamp, timezone, language = 'en') => {
    const date = new Date((timestamp + timezone) * 1000)
    return date.toLocaleTimeString(language === 'ru' ? 'ru-RU' : 'en-US', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
}

export const formatDate = (timestamp, language = 'en') => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

export const formatDay = (timestamp, language = 'en') => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    })
}

export const formatShortDay = (timestamp, language = 'en') => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
        weekday: 'short'
    })
}

export const getWeatherIconUrl = (iconCode, size = 4) => {
    return `https://openweathermap.org/img/wn/${iconCode}@${size}x.png`
}

export const getAqiLevel = (aqi) => {
    const levels = {
        1: { level: 'good', color: 'text-green-500', bgColor: 'bg-green-500' },
        2: { level: 'fair', color: 'text-yellow-500', bgColor: 'bg-yellow-500' },
        3: { level: 'moderate', color: 'text-orange-500', bgColor: 'bg-orange-500' },
        4: { level: 'poor', color: 'text-red-500', bgColor: 'bg-red-500' },
        5: { level: 'very poor', color: 'text-purple-500', bgColor: 'bg-purple-500' }
    }
    return levels[aqi] || levels[1]
}

export const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    const index = Math.round(degrees / 22.5) % 16
    return directions[index]
}

export const getUvIndexLevel = (uvIndex) => {
    if (uvIndex <= 2) return { level: 'low', color: 'text-green-500' }
    if (uvIndex <= 5) return { level: 'moderate', color: 'text-yellow-500' }
    if (uvIndex <= 7) return { level: 'high', color: 'text-orange-500' }
    if (uvIndex <= 10) return { level: 'very high', color: 'text-red-500' }
    return { level: 'extreme', color: 'text-purple-500' }
}