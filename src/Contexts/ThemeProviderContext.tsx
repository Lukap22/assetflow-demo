import { CssBaseline } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import breakpoints from 'theme/breakpoints';
import useDarkMode from "../hooks/useDarkMode";

export default function ThemeProvider({ children }: { children: ReactNode }) {

   const {isDarkMode} = useDarkMode()

    const themeOptions: ThemeOptions = useMemo(
        () => ({
            palette: {
                mode: isDarkMode ? "dark" : "light",
            },
            breakpoints,
            shape: { borderRadius: 8 },
        }),
        [isDarkMode]
    );

    const theme = createTheme(themeOptions);

    return (
        <MUIThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MUIThemeProvider>
    );
}
