import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useRouter } from "next/router";
import {useTranslation} from "next-i18next";

 const MainSideBarNavItems = () => {
    const { push } = useRouter();
    const { t } = useTranslation('nav')
    return (
        <>
            <ListItemButton onClick={() => push("/")} >
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={t("home")} />
            </ListItemButton>
            <ListItemButton onClick={() => push("/flow")} >
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary={t("organogram")} />
            </ListItemButton>
        </>
    );
}

export default MainSideBarNavItems