import { useTheme } from '../../contexts/ThemeContext.jsx'
import { useUnits } from '../../contexts/UnitsContext.jsx'
import { useLanguage } from '../../contexts/LanguageContext.jsx'

const Toggles = ({ onHistoryClick }) => {
    const { theme, toggleTheme } = useTheme()
    const { units, toggleUnits } = useUnits()
    const { language, toggleLanguage } = useLanguage()

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={onHistoryClick}
                className="relative group flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/10 hover:border-white/30 shadow-inner hover:shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all"
                title="Search History"
            >
                <svg
                    className="w-5 h-5 text-white/80 group-hover:text-white transition-transform duration-300 group-hover:rotate-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>

            <button
                onClick={toggleTheme}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/10 hover:border-white/30 backdrop-blur-md shadow-inner hover:shadow-[0_0_10px_rgba(255,255,255,0.25)] transition-all"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
                {theme === 'dark' ? (
                    <svg
                        className="w-5 h-5 text-yellow-400 transition-transform duration-500 group-hover:rotate-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-5 h-5 text-blue-300 transition-transform duration-500 group-hover:scale-110"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                    </svg>
                )}
            </button>

            <button
                onClick={toggleUnits}
                className="relative px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-white/10 hover:border-white/30 text-white/90 font-semibold tracking-wide hover:text-white shadow-inner hover:shadow-[0_0_10px_rgba(255,255,255,0.25)] transition-all backdrop-blur-md"
                title={`Switch to ${units === 'metric' ? 'imperial' : 'metric'} units`}
            >
                {units === 'metric' ? '°C' : '°F'}
            </button>

            <button
                onClick={toggleLanguage}
                className="relative px-4 py-2 rounded-full bg-gradient-to-r from-indigo-400/20 to-pink-500/20 border border-white/10 hover:border-white/30 text-white/90 font-semibold tracking-wider hover:text-white shadow-inner hover:shadow-[0_0_10px_rgba(255,255,255,0.25)] transition-all backdrop-blur-md uppercase"
                title={`Switch to ${language === 'en' ? 'Russian' : 'English'}`}
            >
                {language === 'en' ? 'EN' : 'RU'}
            </button>
        </div>
    )
}

export default Toggles
