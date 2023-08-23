import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";

const AppBarDrawer = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <div>
            <div id="app-bar-portal"></div>
          </div>
        </Toolbar>
      </AppBar>
      {
        <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button onClick={() => (window.location.href = "/")}>
                <ListItemIcon>
                  <ChromeReaderModeIcon />
                </ListItemIcon>
                <ListItemText primary="Categorias" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => (window.location.href = "/configuration")}
              >
                <ListItemIcon>
                  <SettingsApplicationsIcon />
                </ListItemIcon>
                <ListItemText primary="Configurações" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() =>
                  (window.location.href = "/english-portuguese-ipa")
                }
              >
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="IPA (tabela de pronúncias)" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => (window.location.href = "/login")}
              >
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Entrar" />
              </ListItem>
              <Divider />
            </List>
          </div>
        </Drawer>
      }
    </>
  );
};

export default AppBarDrawer;
