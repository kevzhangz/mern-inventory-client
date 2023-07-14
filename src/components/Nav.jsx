import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from "react-router-dom";
import auth from '../helpers/auth';
import { Typography, Grid } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function Navbar(props) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null)
  const drawerWidth = props.drawerWidth

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navData = [
    {
      name: 'Home',
      path: '/dashboard/home',
      icon: <HomeIcon />,
    },
    {
      name: 'Produk',
      path: '/dashboard/product',
      icon: <ListAltIcon />,
    },
    {
      name: 'Supplier',
      path: '/dashboard/supplier',
      icon: <SupportAgentIcon />,
    },
    {
      name: 'Barang Masuk',
      path: '/dashboard/purchase',
      icon: <ShoppingCartIcon />,
    },
    {
      name: 'Barang Keluar',
      path: '/dashboard/sell',
      icon: <SellIcon />,
    },
  ]

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)` }}
      >
          <Toolbar>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={() => {
                    auth.clearJWT(() => {
                      navigate('/')
                    })
                  }}>Logout</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Toolbar>

      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography>
            Sistem Inventory
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {navData.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton 
                    component={Link}
                    to={item.path}
                    selected={location.pathname.includes(item.path)}>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}