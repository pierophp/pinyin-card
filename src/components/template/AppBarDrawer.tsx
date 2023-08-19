import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import DescriptionIcon from "@material-ui/icons/Description";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
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
