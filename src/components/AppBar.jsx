import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AccountMenu from "../components/AccountMenu/AccountMenu";
import {useState} from "react";

export const AppBar = ({ pages }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [focusedButton, setFocusedButton] = useState('Home');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
    if (path) {
      navigate(path);
    }
  };
  const handleFocus = (buttonKey) => {
    setFocusedButton(buttonKey);
  };

  const handleClick = (buttonKey, path) => {
    handleCloseNavMenu(path);
    handleFocus(buttonKey);
  };

  return (
    <MuiAppBar position="static">
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            React Router Auth
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              {pages?.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => handleCloseNavMenu(page.path)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            React Router Auth
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages?.map((page) => (
                <Button
                    key={page.label}
                    onClick={() => handleClick(page.label, page.path)}
                    className={focusedButton === page.label ? 'custom-focus' : ''}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      transition: 'background-color 0.3s',
                      '&:hover': {
                        backgroundColor: 'grey',
                      },
                      ...(focusedButton === page.label && {
                        borderBottom: '2px solid grey',
                        borderRadius: '0',
                        '&:hover': {
                          backgroundColor: 'initial',
                        },
                      }),
                    }}
                    onFocus={() => handleFocus(page.label)}
                >
                  {page.label}
                </Button>
            ))}
          </Box>
          {!!user && (
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <AccountMenu name={user.name} logout={logout}></AccountMenu>
              </Box>

          )}
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
