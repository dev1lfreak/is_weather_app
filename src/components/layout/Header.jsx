import Toggles from './Toggles.jsx'
import { useLanguage } from '../../contexts/LanguageContext.jsx'

const Header = ({ onHistoryClick }) => {
    const { t } = useLanguage()

    return (
        <header className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-white">
                    {t('appName')}
                </h1>
            </div>

            <div className="flex items-center space-x-2">
                <Toggles onHistoryClick={onHistoryClick} />
            </div>
        </header>
    )
}

export default Header