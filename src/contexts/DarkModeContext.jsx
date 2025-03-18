import {createContext, useContext} from "react";
import {useLocalStorageState} from "../hooks/useLocalStorageState.js";

const DarkModeContext = createContext();

function DarkModeProvider({children}) {
  const [isDarkMode, setDarkMode] = useLocalStorageState(window.matchMedia('(prefers-color-scheme:dark)').matches, "isDarkMode");

  function toggleDarkMode() {
    setDarkMode((dark) => !dark);
  }

  return <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>{children}</DarkModeContext.Provider>
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used inside a DarkModeProvider");
  }
  return context;
}

export {DarkModeProvider, useDarkMode};