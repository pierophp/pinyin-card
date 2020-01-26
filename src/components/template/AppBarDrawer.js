import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import React from 'react';

const AppBarDrawer = props => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
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
              <ListItem button onClick={() => (window.location.hash = '/')}>
                <ListItemIcon>
                  <ChromeReaderModeIcon />
                </ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => (window.location.hash = '/configuration')}
              >
                <ListItemIcon>
                  <SettingsApplicationsIcon />
                </ListItemIcon>
                <ListItemText primary="Configuration" />
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
