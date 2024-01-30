import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";


const DarkModeContext = createContext({} as createContextType)


export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
    const [darkMode, setDarkMode] = useState(false)

    return <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
        {children}
    </DarkModeContext.Provider>
}


// eslint-disable-next-line react-refresh/only-export-components
export const useDarkMode = () => {
    return useContext(DarkModeContext)
}


type createContextType = {
    darkMode: boolean;
    setDarkMode: Dispatch<SetStateAction<boolean>>;
}

type DarkModeProviderProps = {
    children: React.ReactNode
}