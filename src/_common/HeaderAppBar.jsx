import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import { UserContext } from '../user/UserContextProvider';



const HeaderAppBar = () => {
  const authUser = useContext(AuthUserContext);
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [settings, setSettings] = useState();
  const [pages, setPages] = useState();
  useEffect(() => {
    if (authUser) {
      setSettings(['Profile', 'Logout']);
    }
    else {
      setSettings(['Login']);
    }
  }, [authUser])
  useEffect(() => {
    if (authUser) {
      setPages(['notebook', 'bank', 'species', 'regions']);
    }
    else {
      setPages(['species', 'regions']);
    }
  }, [authUser])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
  };

  const handleClickNavButton = e => {
    if (e.target.childNodes[0].data === "bank") {
      navigate("/bank");
    }
    if (e.target.childNodes[0].data === "notebook") {
      navigate("/notebook");
    }
    if (e.target.childNodes[0].data === "the swap") {
      navigate("/theswap");
    }
    if (e.target.childNodes[0].data === "species") {
      navigate("/species");
    }
    if (e.target.childNodes[0].data === "regions") {
      navigate("/regions");
    }
    setAnchorElNav(null);
  }

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
  };

  const handleClickUserButton = (e) => {
    if (e.target.childNodes[0].data === "Logout") {
      navigate("/logout");
    }
    if (e.target.childNodes[0].data === "Login") {
      navigate("/login");
    }
    else if (e.target.childNodes[0].data === "Profile") {
      navigate("/profile");
    }
    setAnchorElUser(null);
  };
  const navigateHome = () => {
    navigate("/");
  }
  return (
    <AppBar position="static" sx={{ backgroundColor: "#aaddaa" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>🌱</Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={navigateHome}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: "pointer"
            }}
          >
            SeedStories
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages && pages.map((page) => (
                <MenuItem key={page} onClick={handleClickNavButton}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>🌱</Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={navigateHome}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: "pointer"
            }}
          >
            SeedStories
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages && pages.map((page) => (
              <Button
                key={page}
                onClick={handleClickNavButton}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {authUser &&
                  <Avatar alt={user && user.displayName} >{user && user.displayName[0]}</Avatar>
                }
                {!authUser &&
                  <Avatar >?</Avatar>
                }
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings && settings.map((setting) => (
                <MenuItem key={setting} onClick={handleClickUserButton}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderAppBar;