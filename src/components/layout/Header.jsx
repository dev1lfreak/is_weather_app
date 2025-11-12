import Toggles from './Toggles.jsx'
import { useLanguage } from '../../contexts/LanguageContext.jsx'

const Header = ({ onHistoryClick }) => {
    const { t } = useLanguage()

    return (
        <header className="flex items-center justify-between rounded-2xl px-6 py-4 bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_0_25px_rgba(255,255,255,0.05)]">
            <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400 shadow-[0_0_10px_rgba(255,255,255,0.4)]"></div>
                <h1 className="text-2xl font-semibold tracking-tight text-white drop-shadow-sm">
                    {t('appName')}
                </h1>
            </div>

            <div className="flex items-center space-x-3">
                <Toggles onHistoryClick={onHistoryClick} />
            </div>
        </header>
    )
}

export default Header
