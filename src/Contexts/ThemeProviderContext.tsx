import { CssBaseline } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { ReactNode, useMemo } from 'react';
import breakpoints from 'theme/breakpoints';

export default function ThemeProvider({ children }: { children: ReactNode }) {
    // Darkmode hook
    const isLight = true;

    const themeOptions: ThemeOptions = useMemo(
        () => ({
            //   palette: isLight ? palette.light : palette.dark,
            breakpoints,
            shape: { borderRadius: 8 },
            // shadows: isLight ? shadows.light : shadows.dark,
        }),
        [isLight]
    );

    const theme = createTheme(themeOptions);

    return (
        <MUIThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MUIThemeProvider>
    );
}
