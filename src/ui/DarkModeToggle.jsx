import ButtonIcon from "./ButtonIcon.jsx";
import {useDarkMode} from "../contexts/DarkModeContext.jsx";
import {HiOutlineMoon, HiOutlineSun} from "react-icons/hi2";
import {useEffect} from "react";

function DarkModeToggle() {
  const {isDarkMode, toggleDarkMode} = useDarkMode();
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  }, [isDarkMode]);
  return (
    <ButtonIcon onClick={toggleDarkMode}>{isDarkMode ? <HiOutlineSun/> : <HiOutlineMoon/>}</ButtonIcon>
  );
}

export default DarkModeToggle;