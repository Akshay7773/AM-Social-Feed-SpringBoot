import { Box, Button, CardMedia, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CollectionsIcon from "@mui/icons-material/Collections";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import Avatar from "@mui/material/Avatar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UploadPost from "./UploadPost";
import { useHistory } from "react-router-dom";
import "./ImageDisplay.scss";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { authenticationService } from "../../utils/auth.service";
import DiscardProcess from "./DiscardProcess";
const addPoststyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  height: "500px",
  bgcolor: "#ffffff",
  //   border: "2px solid #000",
  boxShadow: 24,
  // zIndex: "-1",
  //   p: 4,
};

// const addPoststyle2 = {
//   position: "absolute",
//   // top: "10%",
//   // left: "40%",
//   transform: "translate(-50%, -50%)",
//   width: "100px",
//   height: "100px",
//   bgcolor: "red",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

function ImageDisplay(props: any) {
  const history = useHistory();

  let images = props.value;
  let mainimages = props.images;
  // const [images, setImages] = useState(props.value);

  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [uploadPostOpen, setUploadPostOpen] = useState(false);
  const [discardProcessOpen, setDiscardProcessOpen] = useState(false);
  const [count, setCount] = useState(0);
  const handleOpen = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  const imageUpload = () => {
    const formData = new FormData();
    for (let i = 0; i < mainimages[0].length; i++) {
      // console.log(mainimages[i]);
      formData.append("image", mainimages[0][i]);
    }
    formData.append("caption", "checking");
    // console.log(formData.get("caption"));
    authenticationService.uploadImage(formData).then((res) => {
      console.log(res);
      formData.delete("image");
      formData.delete("caption");
    });
  };

  const renderSlides = (imgArr: string[], slideType: string) => {
    // const temp = [...imgArr.slice(count, count + 4)];
    const cardmedia = imgArr.map((imagePath) => {
      return (
        <CardMedia
          sx={{ objectFit: "fill", marginRight: "20px" }}
          component="img"
          height={slideType === "main" ? "500px" : "90px"}
          // width={slideType === "main" ? "500px" : "50px"}
          onClick={handleClose}
          image={imagePath}
          alt="Paella dish"
        />
      );
    });
    return cardmedia;
  };

  const backArrowClickHandler = () => {
    setDiscardProcessOpen(true);
  };

  return (
    <div className="container">
      {discardProcessOpen ? (
        uploadPostOpen ? (
          <UploadPost changeOpen={() => props.changeModalOpen(false)} />
        ) : (
          <DiscardProcess
            changeDiscard={(value) => setDiscardProcessOpen(value)}
            changeUploadPost={(value) => setUploadPostOpen(value)}
          />
        )
      ) : (
        <Box sx={addPoststyle} className="box-el">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginTop: "9px" }}>
              <ArrowBackIcon onClick={backArrowClickHandler} />
            </div>
            <div>
              <Button
                sx={{ color: "blue", fontWeight: "bold", textAlign: "right" }}
                variant="text"
                onClick={() => imageUpload()}
              >
                Next
              </Button>
            </div>
          </div>

          <div style={{ border: "1px solid" }}>
            {/* CODE FOR MAIN SLIDER */}
            <span className="head-image" style={{ objectFit: "fill" }}>
              {/* <img src={"../ images / Header.png"} alt="Freedom Blog" /> */}
              {/* <SimpleImageSlider
                width={500}
                height={500}
                images={images}
                showBullets={true}
                showNavs={true}
              /> */}
              <Slider
                dots={true}
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={false}
                autoplaySpeed={5000}
              >
                {renderSlides(images, "main")}
              </Slider>
            </span>

            {/* BELOW CODE FOR ANOTHER SLIDER */}
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "92%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div>
                <Avatar sx={{ padding: "5px", width: "20px", height: "20px" }}>
                  <CollectionsIcon
                    onClick={handleOpen}
                    sx={{
                      color: "white",
                      ":hover": {
                        cursor: "pointer",
                      },
                      width: "15px",
                    }}
                  />
                </Avatar>
              </div>
            </div>
            {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              > */}
            {/* for below photos show */}
            {open && (
              // <Box>
              <div
                style={{
                  // position: "relative",
                  // border: "1px solid red",
                  height: "90px",
                  display: "flex",
                  flexDirection: "row",
                  width: "440px",
                  position: "absolute",
                  padding: "10px 10px 10px 20px",
                  // paddingLeft: "20px",
                  margin: "10px 0px",
                  top: "80%",
                  left: "50%",
                  // opacity: "0.5",
                  background: "rgba(0,0,0,0.4)",
                  borderRadius: "6px",
                  overflow: "hidden",

                  transform: "translate(-50%, -50%)",
                }}
              >
                {images.length - count >= 4 && (
                  <svg
                    width="20"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="left-svgEl"
                    style={{ position: "absolute", top: "47%", left: "92.8%" }}
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setCount((prev) => prev + 4)}
                  >
                    <path
                      d="M23.5604 11.8338C23.5604 5.39378 18.3337 0.167114 11.8937 0.167114C5.4537 0.167114 0.227036 5.39378 0.227036 11.8338C0.227036 18.2738 5.4537 23.5004 11.8937 23.5004C18.3337 23.5004 23.5604 18.2738 23.5604 11.8338ZM11.8937 13.0004H7.22704V10.6671H11.8937V7.16711L16.5604 11.8338L11.8937 16.5004V13.0004Z"
                      fill="white"
                    />
                  </svg>
                )}
                {images.length - count !== images.length && (
                  <svg
                    width="20"
                    height="17"
                    viewBox="0 0 24 24"
                    style={{ position: "absolute", top: "47%", left: "1%" }}
                    fill="none"
                    className="right-svgEl"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setCount((prev) => prev - 4)}
                  >
                    <path
                      d="M0.227097 11.667C0.227097 18.107 5.45376 23.3337 11.8938 23.3337C18.3338 23.3337 23.5604 18.107 23.5604 11.667C23.5604 5.22703 18.3338 0.000366211 11.8938 0.000366211C5.45376 0.000366211 0.227097 5.22703 0.227097 11.667ZM11.8938 10.5004H16.5604V12.8337H11.8938V16.3337L7.2271 11.667L11.8938 7.00037V10.5004Z"
                      fill="white"
                    />
                  </svg>
                )}

                {/* <object
                  data="../../assets/Icons/Vector.svg"
                  style={{
                    height: "50px",
                    width: "50px",
                    position: "absolute",
                    transform: "translate(-50%, -50%)",
                    zIndex: "1",
                  }}
                  // type="image/svg+xml"
                ></object> */}
                {/* <img
                  src={`../../assets/Icons/Vector.svg`}
                  style={{
                    // height: "5px",
                    // width: "1px",
                    position: "absolute",
                    // border: "2px solid",
                    // backgroundColor: "#fff",
                  }}
                /> */}
                {images.slice(count, count + 4).map((image: any, i: number) => {
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "  100px",
                        marginRight: "20px",
                      }}
                    >
                      {/* {renderSlides(images, "down")} */}
                      <CardMedia
                        sx={{ objectFit: "fill" }}
                        component="img"
                        height={"90px"}
                        // width={"300px"}
                        image={image}
                        alt="Paella dish"
                      />
                      <HighlightOffOutlinedIcon
                        sx={{
                          width: "15px",
                          height: "12px",
                          position: "absolute",
                          ml: "75px",
                          mt: "2px",
                        }}
                        onClick={() => props.removeAddedPhotoHandler(i + count)}
                      />
                    </div>
                  );
                })}
                {/* <Slider
                      dots={false}
                      slidesToShow={1}
                      slidesToScroll={1}
                      autoplay={false}
                      autoplaySpeed={3000}
                    >
                      {renderSlides(images, "bottomSlider")}
                    </Slider> */}
                {/* <img src={"../ images / Header.png"} alt="Freedom Blog" /> */}
                {/* <div>
                <Slider
                  dots={false}
                  slidesToShow={4}
                  slidesToScroll={4}
                  autoplay={true}
                  autoplaySpeed={3000}
                >
                  {renderSlides(images)}
                </Slider>
              </div> */}

                {images.length - count < 4 && (
                  <label htmlFor="img">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        // padding: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100px",
                        height: "90px",
                        // display: "flex",
                        // flexDirection: "row",
                        background: "#fff",
                        // paddingTop:"30px",
                        marginLeft: "0px",
                        // width: "100px",
                        // top: "1%",
                        // left: "78%",
                        // height: "90px",
                        // marginLeft: "20%",

                        // opacity: "10",
                        // objectFit: "fill",
                      }}
                    >
                      <AddAPhotoRoundedIcon sx={{ width: 30, height: 30 }} />
                    </div>
                  </label>
                )}
                <input
                  id="img"
                  style={{
                    // fontSize: "100px",
                    // position: "absolute",
                    // left: 0,
                    // top: 0,
                    // opacity: 0,
                    display: "none",
                  }}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => props.upload(e)}
                />
              </div>
              // </Box>
            )}
            {/* </Modal> */}
            {/* </div> */}
          </div>
        </Box>
      )}
    </div>
  );
}

export default ImageDisplay;
