import { createContext, useContext, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { translations } from '../i18n/translations.js'

const LanguageContext = createContext()

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    return context
}

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useLocalStorage('weather-language', 'en')

    const t = useCallback((key, params = {}) => {
        let translation = translations[language]?.[key] || translations.en[key] || key

        if (typeof translation === 'string') {
            Object.entries(params).forEach(([key, value]) => {
                translation = translation.replace(`{{${key}}}`, value)
            })
        }

        return translation
    }, [language])

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ru' : 'en')
    }

    const value = {
        language,
        setLanguage,
        toggleLanguage,
        t,
        isEnglish: language === 'en'
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}