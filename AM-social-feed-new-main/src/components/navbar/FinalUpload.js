import React from 'react'

function FinalUpload() {
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

  return (
    <div>
      <Box sx={addPoststyle} className="box-el">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ marginTop: "9px" }}>
            <ArrowBackIcon onClick={backArrowClickHandler} />
          </div>
          <div>
            <Button
              sx={{ color: "blue", fontWeight: "bold", textAlign: "right" }}
              variant="text"
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
            {/* <div>
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
            </div> */}
          </div>
            </div>
           
          )
      </Box>
    </div>
  );
}

export default FinalUpload