import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppShell from "./components/layout/AppShell.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { UnitsProvider } from "./contexts/UnitsContext.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import { HistoryProvider } from "./contexts/HistoryContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <UnitsProvider>
                <LanguageProvider>
                    <HistoryProvider>
                        <AppShell />
                    </HistoryProvider>
                </LanguageProvider>
            </UnitsProvider>
        </ThemeProvider>
    </StrictMode>
);
