import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const ThemeContext = createContext()

export const useTheme = () => {
    const context = useContext(ThemeContext)
    return context
}

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useLocalStorage('weather-theme', 'dark')

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    const value = {
        theme,
        setTheme,
        toggleTheme,
        isDark: theme === 'dark'
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}