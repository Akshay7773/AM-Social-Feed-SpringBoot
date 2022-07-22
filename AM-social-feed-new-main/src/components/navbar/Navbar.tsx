import React, { useState } from "react";
import "./Navbar.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import HomeIcon from "@mui/icons-material/Home";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  createTheme,
  Grid,
  Menu,
  MenuItem,
  Modal,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { authenticationService } from "../../utils/auth.service";
import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import EditProfile from "../../pages/home/EditProfile";
import UploadPost from "./UploadPost";
export type NavbarProps = {
  /**
   * To be triggered on logout click
   */
  onLogout?: any;
};
const pages = ["Products", "Pricing", "Blog"];

export const Navbar = ({ onLogout }: NavbarProps) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { count, setCount, headerName, setEditOpen } = useContext(UserContext);

  //for upload post
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(count);

  const [user, setUser] = React.useState<any>({});

  useEffect(() => {
    let getCurrentUser = async () => {
      const users = await authenticationService.getLoggedUser();
      setUser(users);
    };
    getCurrentUser();
  }, [count]);

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const darkTheme1 = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ffffff",
      },
    },
  });

  return (
    <Box sx={{ p: 0, m: 0 }}>
      <ThemeProvider theme={darkTheme1}>
        <AppBar position="static" enableColorOnDark sx={{ p: 0, m: 0 }}>
          <Toolbar>
            <Grid
              container
              spacing={2}
              sx={{ justifyContent: "space-between", padding: "0px 216px" }}
            >
              <Box sx={{ pt: "40px" }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  <div
                    style={{
                      display: "flex",

                      // alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      id="image"
                      style={{
                        marginTop: "2px",
                        marginRight: "10px",
                        width: "22px",
                        height: "21px",
                      }}
                    >
                      <img
                        style={{ paddingLeft: "4px" }}
                        src={require(`../../assets/icon.png`)}
                      />
                    </div>
                    <div
                      id="texts"
                      style={{
                        whiteSpace: "nowrap",
                        height: "22px",
                        width: "101px",
                        paddingBottom: "7px",
                      }}
                    >
                      <strong style={{ marginBottom: "0px" }}>
                        {" "}
                        Life @ AM
                      </strong>
                    </div>
                  </div>
                </Typography>
              </Box>
              {/* <Grid item m={1} xs={4}></Grid> */}
              <Box sx={{ paddingTop: "20px" }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  {/* <Badge badgeContent={4} color="error"> */}
                  {/* <MailIcon /> */}
                  <HomeIcon fontSize="medium" />
                  {/* </Badge> */}
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={handleOpen}
                >
                  {/* <Badge badgeContent={17} color="error"> */}
                  <AddAPhotoIcon fontSize="medium" />
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <>
                      {" "}
                      <UploadPost changeOpen={(value: any) => setOpen(value)} />
                    </>
                  </Modal>
                  {/* </Badge> */}
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  // onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {/* <AccountCircle /> */}
                  <BookmarkIcon fontSize="medium" />
                </IconButton>
                {/* <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  // onClick={handleProfileMenuOpen}
                  color="inherit"
                  onClick={handleOpenUserMenu}
                > */}
                {/* <AccountCircle /> */}

                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  // color="inherit"
                  onClick={handleOpenUserMenu}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={user?.image}
                    sx={{
                      backgroundColor: "skyblue",
                      height: "25px",
                      width: "25px",
                      fontSize: "14px",
                    }}
                  >
                    {/* {user.firstname &&
                      user.firstname[0].toUpperCase() +
                        user.firstname[1].toUpperCase()} */}
                    AK
                  </Avatar>
                  )
                </IconButton>
                {/* </IconButton> */}
                <IconButton
                  // size="large"
                  edge="start"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  // onClick={handleProfileMenuOpen}
                  color="inherit"
                  sx={{
                    height: "28px",
                    width: "40px",
                    ml: "5px",
                    fontSize: "18px",
                  }}
                >
                  {/* <AccountCircle /> */}
                  {/* {user?.firstname} */}
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => setEditOpen(true)}
                    >
                      Edit Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography onClick={onLogout} textAlign="center">
                      Log Out
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Grid>
          </Toolbar>
        </AppBar>
        {/* {renderMobileMenu}
      {renderMenu} */}
      </ThemeProvider>
    </Box>
  );
};
