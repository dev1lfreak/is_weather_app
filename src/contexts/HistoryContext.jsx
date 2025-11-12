import { createContext, useContext, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const HistoryContext = createContext()

export const useHistory = () => {
    const context = useContext(HistoryContext)
    return context
}

export const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useLocalStorage('weather-history', [])

    const addToHistory = useCallback((location) => {
        if (!location?.name || !location?.lat || !location?.lon) return

        setHistory(prev => {
            const filtered = prev.filter(item =>
                !(item.lat === location.lat && item.lon === location.lon)
            )
            return [location, ...filtered.slice(0, 9)] // Keep last 10 items
        })
    }, [setHistory])

    const removeFromHistory = useCallback((location) => {
        setHistory(prev =>
            prev.filter(item => !(item.lat === location.lat && item.lon === location.lon))
        )
    }, [setHistory])

    const clearHistory = useCallback(() => {
        setHistory([])
    }, [setHistory])

    const value = {
        history,
        addToHistory,
        removeFromHistory,
        clearHistory
    }

    return (
        <HistoryContext.Provider value={value}>
            {children}
        </HistoryContext.Provider>
    )
}