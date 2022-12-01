import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useRouter } from "next/router";

export const MainSideBarNavItems = () => {
    const { push } = useRouter();
    return (
        <>
            <ListItemButton onClick={() => push("/")} >
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton onClick={() => push("/flow")} >
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Flow" />
            </ListItemButton>
        </>
    );

}