const API_BASE_URL = 'https://api.openweathermap.org'
const GEO_API_URL = `${API_BASE_URL}/geo/1.0`
const DATA_API_URL = `${API_BASE_URL}/data/2.5`

class ApiService {
    constructor() {
        this.apiKey = import.meta.env.VITE_OWM_API_KEY
    }

    async fetchWithErrorHandling(url) {
        if (!this.apiKey || this.apiKey === 'YOUR_API_KEY_HERE') {
            throw new Error('API key not configured. Please set VITE_OWM_API_KEY in your environment variables.')
        }

        try {
            const response = await fetch(url)

            if (response.status === 401) {
                throw new Error('Invalid API key. Please check your OpenWeatherMap API key.')
            }

            if (response.status === 429) {
                throw new Error('Rate limit exceeded. Please try again in a few minutes.')
            }

            if (response.status === 404) {
                throw new Error('Location not found. Please try another city name.')
            }

            if (!response.ok) {
                throw new Error(`Weather service unavailable. Please try again later.`)
            }
            return await response.json()
        } catch (error) {
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('No internet connection. Please check your network.')
            }
            if (error.message.includes('API key') ||
                error.message.includes('Rate limit') ||
                error.message.includes('Location not found')) {
                throw error
            }
            throw new Error('Unable to fetch weather data. Please try again.')
        }
    }

    async getGeocoding(query, limit = 5) {
        const url = `${GEO_API_URL}/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${this.apiKey}`
        return this.fetchWithErrorHandling(url)
    }

    async getReverseGeocoding(lat, lon, limit = 1) {
        const url = `${GEO_API_URL}/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${this.apiKey}`
        const data = await this.fetchWithErrorHandling(url)
        return data[0] || null
    }

    async getCurrentWeather(lat, lon, units = 'metric', lang = 'en') {
        const url = `${DATA_API_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${this.apiKey}`
        return this.fetchWithErrorHandling(url)
    }

    async getForecast(lat, lon, units = 'metric', lang = 'en') {
        const url = `${DATA_API_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${this.apiKey}`
        return this.fetchWithErrorHandling(url)
    }

    async getAirPollution(lat, lon) {
        const url = `${DATA_API_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
        return this.fetchWithErrorHandling(url)
    }

    async getWeatherData(location, units = 'metric', lang = 'en') {
        const [current, forecast, airPollution] = await Promise.all([
            this.getCurrentWeather(location.lat, location.lon, units, lang),
            this.getForecast(location.lat, location.lon, units, lang),
            this.getAirPollution(location.lat, location.lon)
        ])

        return {
            current,
            forecast,
            airPollution,
            location: {
                ...location,
                name: current.name,
                country: current.sys.country
            }
        }
    }
}

export const apiService = new ApiService()