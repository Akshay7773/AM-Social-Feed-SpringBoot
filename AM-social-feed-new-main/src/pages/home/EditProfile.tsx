import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";
import Slide from "@mui/material/Slide";
import React, { useState, useEffect, useRef } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MuiPhoneNumber from "material-ui-phone-number";
import { authenticationService } from "../../utils/auth.service";
import { useContext } from "react";
import { UserContext } from "../../App";
import Modal from "@mui/material/Modal";

import { json } from "stream/consumers";

// http://localhost:8080/auth/self
function EditProfile() {
  // const { count, setCount, headerName, setHeaderName, editOpen, setEditOpen } =
  //   useContext(UserContext);
  // const [user, setUser] = useState<any>([]);
  // const anchorRef = React.useRef(null);
  // const [openPopper, setOpenPopper] = React.useState(true);

  // const [value, setValue] = React.useState(new Date());
  // const [image, setImage] = React.useState<any>(user?.image);
  // const [formImage, setFormImage] = React.useState<any>("");
  // const [arrowRef, setArrowRef] = React.useState(null);
  // const [checked, setChecked] = React.useState(false);
  // // let canceled = false;
  // const [canceled, setCanceled] = useState(false);
  // // Code for Modal
  // // const [open, setOpen] = useState<any>(true);
  // // const handleClose = () => setOpen(false);
  // const handleClose = () => {
  //   setEditOpen(false);
  // };
  // // console.log(open === false);
  // const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: "510px",
  //   maxHeight: "800px",
  //   background: "white",
  //   borderRadius: "8px",
  //   height: "100%",
  //   margin: "0px",
  //   padding: "0px 16px 0px 16px",
  //   // backgroundColor: "rgba(255,255,255,0.85)",
  //   overflowY: "scroll",
  //   filter: checked ? "brightness(50%)" : "",
  // };

  // let closeImg = {
  //   cursor: "pointer",
  //   float: "right",
  //   marginTop: "0px",
  //   width: "16.27px",
  //   height: "16.33px",
  // };

  // // Code for popper
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // const handleClick = () => {
  //   setCanceled(false);
  //   setChecked((prev) => !prev);
  //   // setOpenPopper(true);
  // };

  // const canBeOpen = checked && Boolean(anchorEl);
  // const id = canBeOpen ? "transition-popper" : undefined;
  // console.log(user);

  // //If user clicks outside of modal close it
  // // const modalDiv = document.getElementById("modal-div");
  // // modalDiv?.addEventListener("click", () => {
  // //   // setOpenPopper(false);
  // //   setChecked(true);
  // // });

  // // Code for upload photo menu
  // // const [anchorElNav, setAnchorElNav] = React.useState(null);
  // // const [anchorElUser, setAnchorElUser] = React.useState(null);
  // // const handleOpenNavMenu = (event: any) => {
  // //   setAnchorElNav(event.currentTarget);
  // // };
  // // const handleOpenUserMenu = (event: any) => {
  // //   setAnchorElUser(event.currentTarget);
  // // };
  // // const handleCloseUserMenu = () => {
  // //   setAnchorElUser(null);
  // // };
  // const changeimg = (e: any) => {
  //   setImage(URL.createObjectURL(e.target.files[0]));
  //   // setOpenPopper(false);
  //   setChecked(false);
  //   setFormImage(e.target.files[0]);
  // };

  // const removeImage = () => {
  //   setFormImage("");
  //   setImage("");
  //   setUser({ ...user, image: "" });
  //   // setOpenPopper(false);
  //   setChecked(false);
  // };

  // useEffect(() => {
  //   setHeaderName("EDIT PROFILE");
  //   const loggedUserFun = async () => {
  //     const users: any = await authenticationService.getLoggedUser();
  //     setUser(users);
  //     setFormImage(user.image);
  //     setImage(user.image);
  //   };
  //   loggedUserFun();
  // }, []);

  // const updateUser = async () => {
  //   const formss = new FormData();
  //   formss.append("username", user.username);

  //   // typeof user.image === "string" && formss.append("image", formImage);
  //   formss.append("image", formImage ? formImage : "");
  //   formss.append("bio", user.bio ? user.bio : "");
  //   formss.append("gender", user.gender);
  //   formss.append("mobile", user.mobile ? user.mobile : "");
  //   formss.append("dob", user.dob ? user.dob : new Date());

  //   const response = await authenticationService.updateUser(formss);
  //   // setUser(response);
  //   setCount((prev: any) => prev + 1);
  //   formss.delete("username");
  //   formss.delete("image");
  //   formss.delete("bio");
  //   formss.delete("gender");
  //   formss.delete("mobile");
  //   formss.delete("dob");
  // };

  // return (
  //   <Modal
  //     open={editOpen}
  //     onClose={handleClose}
  //     aria-labelledby="modal-modal-title"
  //     aria-describedby="modal-modal-description"
  //   >
  //     <div container style={style} id="modal-div">
  //       {" "}
  //       <div>
  //         <img
  //           src="https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png"
  //           style={closeImg}
  //           onClick={() => {
  //             setEditOpen(false);
  //             setImage("");
  //             setFormImage("");
  //           }}
  //         />
  //         <div
  //           style={{
  //             fontFamily: "Public Sans",
  //             marginTop: "10px",
  //             // paddingTop: "132px",
  //             fontStyle: "normal",
  //             fontWeight: "700",
  //             fontSize: "24px",
  //             lineHeight: "36px",
  //             color: "#212B36",
  //             width: "165px",
  //             height: "36px",
  //             marginLeft: "175px",
  //             marginRight: "177.5px",
  //           }}
  //         >
  //           Profile Update
  //         </div>
  //       </div>
  //       <div>
  //         <div>
  //           <div
  //             ref={anchorRef}
  //             style={{
  //               margin: "15px 199.5px 0px 210.5px",
  //               position: "relative",
  //             }}
  //           >
  //             {image === undefined || image === "" ? (
  //               // (
  //               //   user && user.image !== "" ? (
  //               //     <img
  //               //       style={{
  //               //         height: "100px",
  //               //         width: "99.22px",
  //               //         background: "#30B9CE",
  //               //         borderRadius: "60px",
  //               //         // boxShadow:
  //               //         //   "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  //               //       }}
  //               //       alt="Remy Sharp"
  //               //       src={user && user.image}

  //               //       // src={
  //               //       //   imageUrl === ""
  //               //       //     ? `http://localhost:3300/assets/profile/${userDetails.image}`
  //               //       //     : imageUrl
  //               //       // }
  //               //     />
  //               //   ) :
  //               // <div style={{ marginLeft: "40px" }}>
  //               <Avatar
  //                 src={user && user.image}
  //                 style={{
  //                   height: "100px",
  //                   width: "99.22px",
  //                   background: "",
  //                   borderRadius: "50%",
  //                 }}
  //               >
  //                 {user.firstname &&
  //                   user?.firstname[0].toUpperCase() +
  //                     user?.firstname[1].toUpperCase()}
  //               </Avatar>
  //             ) : (
  //               // </div>
  //               // )
  //               <img
  //                 style={{
  //                   height: "100px",
  //                   width: "99.22px",
  //                   background: "",
  //                   borderRadius: "50%",
  //                   // boxShadow:
  //                   //   "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  //                 }}
  //                 alt=""
  //                 src={image}
  //                 // src={
  //                 //   imageUrl === ""
  //                 //     ? `http://localhost:3300/assets/profile/${userDetails.image}`
  //                 //     : imageUrl
  //                 // }
  //               />
  //             )}
  //           </div>
  //           <div
  //             style={{
  //               transform: "translate(-10%, -80%)",
  //               position: "absolute",
  //               margin: "0px 199.5px 0px 270.5px",
  //               padding: "0px",
  //               borderRadius: "50%",
  //               borderStyle: "solid",
  //               borderWidth: "1px",
  //               borderColor: "lightgrey",
  //               background: "white",
  //             }}
  //           >
  //             <IconButton
  //               size="large"
  //               aria-label="account of current user"
  //               aria-controls="menu-appbar"
  //               aria-haspopup="true"
  //               onClick={handleClick}
  //               color="inherit"
  //             >
  //               <AddAPhotoRoundedIcon color="primary" />
  //             </IconButton>
  //           </div>
  //           <Popper
  //             id={id}
  //             // open
  //             open={canceled ? false : true}
  //             anchorEl={anchorRef.current}
  //             transition
  //             anchorOrigin={{
  //               vertical: "bottom",
  //               horizontal: "center",
  //             }}
  //             //
  //             // BackdropProps={{ invisible: false }}
  //             style={{
  //               position: "absolute",
  //               transform: "translate(336%, -14%)",
  //               zIndex: "1301",
  //               // bottom: 0,
  //               // right: "250px",
  //               top: "214px",
  //               left: "unset",
  //             }}
  //             modifiers={[
  //               // arrow: {
  //               //   enabled: true,
  //               //   element: arrowRef,
  //               // },

  //               {
  //     name: 'arrow',
  //     enabled: true,
  //     options: {
  //       element: arrowRef,
  //     },
  //   },
  //             ]}
  //           >
  //             <Slide direction="down" in={checked} mountOnEnter unmountOnExit>
  //               <div>
  //                 <div
  //                   ref={setArrowRef}
  //                   style={{
  //                     backgroundColor: "#fff",
  //                     clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
  //                     width: "10px",
  //                     height: "10px",
  //                     display: "block",
  //                     marginLeft: "90px",
  //                   }}
  //                 ></div>
  //                 <Box
  //                   sx={{
  //                     border: 0,
  //                     borderRadius: "8px",
  //                     pb: 1,
  //                     bgcolor: "white",
  //                   }}
  //                 >
  //                   <input
  //                     type="file"
  //                     id="imgupload"
  //                     style={{ display: "none" }}
  //                     onChange={changeimg}
  //                   />
  //                   <label htmlFor="imgupload">
  //                     <div
  //                       style={{
  //                         padding: "15px 20px",
  //                         display: "flex",
  //                         cursor: "pointer",
  //                       }}
  //                     >
  //                       <div>
  //                         <AddAPhotoRoundedIcon
  //                           style={{ marginRight: "10px" }}
  //                         />
  //                       </div>
  //                       <div style={{ paddingTop: "5px" }}>Update photo</div>
  //                     </div>
  //                   </label>
  //                   <div
  //                     style={{
  //                       padding: "5px 20px",
  //                       display: "flex",
  //                       cursor: "pointer",
  //                     }}
  //                     onClick={removeImage}
  //                   >
  //                     <div style={{}}>
  //                       <DeleteIcon style={{ marginRight: "10px" }} />
  //                     </div>
  //                     <div style={{ paddingTop: "5px" }}>Remove photo</div>
  //                   </div>

  //                   <hr />

  //                   <div
  //                     style={{
  //                       padding: "5px 20px",
  //                       display: "flex",
  //                       cursor: "pointer",
  //                     }}
  //                     onClick={() => {
  //                       setCanceled(true);
  //                       setChecked(false);
  //                     }}
  //                   >
  //                     <div style={{}}>
  //                       <ClearIcon style={{ marginRight: "10px" }} />
  //                     </div>
  //                     <div style={{ paddingTop: "5px" }}>Cancel</div>
  //                   </div>
  //                 </Box>
  //               </div>
  //             </Slide>
  //           </Popper>
  //         </div>

  //         {/* <Grid md={12} sx={{ mt: "30px" }}> */}
  //         <div style={{ marginTop: "30px" }}>
  //           {/* <Grid container rowSpacing={5} spacing={5} width="100%"> */}
  //           <div style={{ marginTop: "20px" }}>
  //             <TextField
  //               sx={{ padding: "0" }}
  //               fullWidth
  //               value={user && user.username}
  //               // label="Username"
  //               placeholder="Name"
  //               onChange={(e) => setUser({ ...user, username: e.target.value })}
  //             />
  //           </div>
  //           <div style={{ marginTop: "20px" }}>
  //             <TextField
  //               fullWidth
  //               value={user && user.email}
  //               // label="Email id"
  //               placeholder="Email id"
  //               disabled
  //               // onChange={(e) => setUser({ ...user, email: e.target.value })}
  //             />
  //           </div>
  //           <div style={{ marginTop: "20px" }}>
  //             <TextField
  //               // label="Bio"
  //               placeholder="Enter your bio here.."
  //               fullWidth
  //               minRows={4}
  //               multiline
  //               // style={{ width: "50%" }}
  //               value={user && user.bio}
  //               // InputLabelProps={{ shrink: true }}
  //               onChange={(e) => setUser({ ...user, bio: e.target.value })}
  //             />
  //           </div>
  //           <div style={{ marginTop: "20px" }}>
  //             <FormControl style={{ width: "100%" }}>
  //               <FormLabel id="demo-row-radio-buttons-group-label">
  //                 Gender
  //               </FormLabel>
  //               <RadioGroup
  //                 row
  //                 aria-labelledby="demo-row-radio-buttons-group-label"
  //                 name="row-radio-buttons-group"
  //                 value={(user && user.gender) || ""}
  //                 onChange={(e) => setUser({ ...user, gender: e.target.value })}
  //               >
  //                 <FormControlLabel
  //                   value="male"
  //                   control={<Radio />}
  //                   label="Male"
  //                 />
  //                 <FormControlLabel
  //                   value="female"
  //                   control={<Radio />}
  //                   label="Female"
  //                 />

  //                 <FormControlLabel
  //                   value="other"
  //                   control={<Radio />}
  //                   label="Other"
  //                 />
  //               </RadioGroup>
  //             </FormControl>
  //           </div>

  //           <div style={{ marginTop: "20px" }}>
  //             <div>
  //               <FormLabel id="demo-row-radio-buttons-group-label">
  //                 Date of birth
  //               </FormLabel>
  //             </div>
  //             <LocalizationProvider dateAdapter={AdapterDateFns}>
  //               <DesktopDatePicker
  //                 // label="For desktop"
  //                 value={user && user.dob ? user.dob : value}
  //                 // minDate={new Date("2017-01-01")}
  //                 onChange={(newValue) => {
  //                   setUser({ ...user, dob: newValue });
  //                 }}
  //                 renderInput={(params) => <TextField {...params} />}
  //               />
  //             </LocalizationProvider>
  //           </div>
  //           <div style={{ marginTop: "20px" }}>
  //             <div>
  //               <FormLabel id="demo-row-radio-buttons-group-label">
  //                 Enter contact number
  //               </FormLabel>
  //             </div>
  //             <MuiPhoneNumber
  //               name="phone"
  //               // label="Phone Number"
  //               data-cy="user-phone"
  //               defaultCountry={"in"}
  //               value={user && user.mobile}
  //               variant="outlined"
  //               // value={this.state.phone}
  //               onChange={(newValue) => setUser({ ...user, mobile: newValue })}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //       <Button
  //         onClick={updateUser}
  //         style={{
  //           margin: "3% 0 5% 0",
  //           // backgroundColor: "indianred",
  //           // padding: "0.5% 5% 0.5% 5%",
  //           padding: "5px 10px",
  //           width: "100%",
  //           background: "",
  //         }}
  //         variant="contained"
  //       >
  //         Save Profile
  //       </Button>
  //     </div>
  //   </Modal>
  return <div>Edit Profile not completed yet</div>;
}

export default EditProfile;
