import { Box, Button, CardMedia, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ImageDisplay from "./ImageDisplay";
const addPoststyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "632px",
  height: "608px",
  bgcolor: "#ffffff",
  // border: "2px solid #000",
  borderRadius: "8px",
  boxShadow: 24,
  p: 0,
};

function UploadPost({ changeOpen }: any) {
  const [imageUrl, setImageUrl] = useState("");
  const [ImageDisplay1, setImageDisplay1] = useState(false);
  const [images, setImages] = useState([]);
  const [cancelOpen, setCancelOpen] = useState(false);

  // const [arr, setArr] = useState([]);
  // const [arr2, setArr2] = useState([]);
  let arr = [];
  const uploadimageMethod = (e: any) => {
    console.log(imageUrl, "++++++++=");
    let arr2 = [];
    // let imgUrl = URL.createObjectURL(e.target.files[0]);
    arr.push(e.target.files);
    // setArr([...arr, e.target.files]);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        arr2.push(URL.createObjectURL(arr[i][j]));
      }
    }
    setImageUrl([...imageUrl, ...arr2]);
    setImages(arr);
    setImageDisplay1(arr.length);
    // changeOpen(false)
    // setArr([])
  };

  const removeAddedPhotoHandler = (i) => {
    let temp = imageUrl.slice(0);
    temp.splice(i, 1);
    setImageUrl(temp);
  };

  useEffect(() => {
    if (cancelOpen) changeOpen(false);
  }, [cancelOpen]);

  return (
    <div>
      {ImageDisplay1 ? (
        <ImageDisplay
          value={imageUrl}
          upload={uploadimageMethod}
          removeAddedPhotoHandler={removeAddedPhotoHandler}
          changeModalOpen={(value: any) => changeOpen(value)}
          images={images}
          // ImageDisplay1={() => setImageDisplay1(false)}
        />
      ) : (
        <Box sx={addPoststyle}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ float: "right", margin: "20px 20px" }}
            onClick={() => setCancelOpen(true)}
          >
            <path
              d="M14.8938 2.24325L13.4838 0.833252L7.8938 6.42325L2.3038 0.833252L0.893799 2.24325L6.4838 7.83325L0.893799 13.4233L2.3038 14.8333L7.8938 9.24325L13.4838 14.8333L14.8938 13.4233L9.3038 7.83325L14.8938 2.24325Z"
              fill="#919EAB"
            />
          </svg>

          <Typography id="modal-modal-description" sx={{ m: "118px 38.5px" }}>
            <div>
              <div
                style={{
                  height: "204px",
                  width: "216px",
                  paddingLeft: "170px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "32px",
                }}
              >
                <img
                  style={{ width: "180px", height: "150px" }}
                  src={require(`../../assets/upload.png`)}
                />
                <p
                  style={{
                    color: "#919EAB",
                    fontSize: "14px",
                    fontWeight: "400",
                    // marginTop: "32px",
                    fontFamily: "Public sans",
                  }}
                >
                  {" "}
                  Drag photo from device to upload
                </p>
              </div>
              {/* <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "inline-block",
                }}
              > */}
              <label htmlFor="img">
                <div
                  // onClick={() => uploadfiles()}

                  style={{
                    backgroundColor: "#1890FF",
                    marginTop: "131px",
                    // mb: "100px",\
                    // height: "40px",
                    // width: "182px",
                    borderRadius: "8px",
                    color: "white",
                    marginLeft: "186px",
                    marginRight: "186px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  variant="contained"
                >
                  <div
                    style={{
                      padding: "11px 22px",
                      fontFamily: "Public Sans",
                      fontWeight: "bold",
                      fontSize: "15px",
                      fontStyle: "normal",
                      lineHeight: "26px",
                    }}
                  >
                    Upload from device
                  </div>
                </div>
              </label>
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
                onChange={uploadimageMethod}
              />
              {/* </div> */}
            </div>
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default UploadPost;
