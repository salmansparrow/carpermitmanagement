import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const drawerWidth = 240;
const menuItems = [
  {
    title: "Events",
    options: [
      { name: "Add Event", path: "/events" },
      { name: "View Events", path: "/events/viewevents" },
    ],
  },
  {
    title: "Card Permit Types",
    options: [
      { name: "Add Card", path: "/cardpermit" },
      { name: "View Card", path: "/cardpermit/viewcards" },
    ],
  },
  {
    title: "Car Permit",
    options: [
      { name: "Add Permit", path: "/carpermit" },
      { name: "View Permit", path: "/carpermit/carpermitlist" },
    ],
  },
  {
    title: "Permit Generation",
    options: [
      { name: "Create Permit", path: "/carpermitgeneration/" },
      { name: "View Generated Permit", path: "/permit-generation/view" },
    ],
  },
];

function MainNavBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenuOpen = (event, menuTitle) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(menuTitle);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Car Permit System
      </Typography>
      <Divider />
      <List>
        {menuItems.map((menu) => (
          <ListItem key={menu.title} disablePadding>
            <ListItemButton onClick={(e) => handleMenuOpen(e, menu.title)}>
              <ListItemText primary={menu.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Car Permit System
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {menuItems.map((menu) => (
              <Box key={menu.title} sx={{ display: "inline-block" }}>
                <Button
                  sx={{ color: "#fff" }}
                  onClick={(e) => handleMenuOpen(e, menu.title)}
                >
                  {menu.title}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu === menu.title}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                >
                  {menu.options.map((option) => (
                    <MenuItem
                      key={option.name}
                      onClick={handleMenuClose}
                      sx={{ color: "black", textDecoration: "none" }} // 🔥 Fix added here
                    >
                      <Link
                        href={option.path}
                        passHref
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {option.name}
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

MainNavBar.propTypes = {
  window: PropTypes.func,
};

export default MainNavBar;
