import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const UnitsContext = createContext()

export const useUnits = () => {
    const context = useContext(UnitsContext)
    return context
}

export const UnitsProvider = ({ children }) => {
    const [units, setUnits] = useLocalStorage('weather-units', 'metric')

    const toggleUnits = () => {
        setUnits(prev => prev === 'metric' ? 'imperial' : 'metric')
    }

    const value = {
        units,
        setUnits,
        toggleUnits,
        isMetric: units === 'metric'
    }

    return (
        <UnitsContext.Provider value={value}>
            {children}
        </UnitsContext.Provider>
    )
}