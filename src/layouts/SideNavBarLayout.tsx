import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { useRouter } from 'next/router';
import * as React from 'react';
import MainSideBarNavItems from "../components/MainSideBarNavItems";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const CollapsedRoutes = [
    "/flow"
]

function SideNavBarLayout({ children }: { children: React.ReactNode }) {
    //Hooks
    const { pathname } = useRouter();

    //State
    const [open, setOpen] = React.useState(!CollapsedRoutes.includes(pathname));

    //Functions
    const toggleDrawer = () => {
        setOpen((prev) => !prev);
    };

    //Handle the drawer open/close state on route change
    React.useEffect(() => {
        setOpen(!CollapsedRoutes.includes(pathname))
    }, [pathname])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open}>
                <Toolbar
                >
                    {open ? (
                        <Stack direction={"row"} width={"100%"} alignItems={"center"} left={0}>
                            <div>TaxFlow</div>
                            <Stack ml="auto"><IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton></Stack>
                        </Stack>
                    ) : (

                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                </Toolbar>
                <Divider />
                <List component="nav">
                    <MainSideBarNavItems />
                </List>
                {/* Bottom */}
                <Box mt="auto" sx={{}}>
                    <Divider />
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                {/* Render page content here */}
                {children}
            </Box>
        </Box>

    );
}

export default SideNavBarLayout;