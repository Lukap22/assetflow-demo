import {useEffect, useState} from "react";

// TODO create Darkmode hook with jotai
// Cookies??
export default function useDarkMode(){
    const [isDarkMode, setIsDarkMode] = useState(false);

    const modeMe = (e) => {
        setIsDarkMode(!!e.matches);
    };

    useEffect(() => {
        const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDarkMode(matchMedia.matches);
        matchMedia.addEventListener("change", modeMe);

        return () => matchMedia.removeEventListener("change", modeMe);
    }, []);

    return { isDarkMode}
}