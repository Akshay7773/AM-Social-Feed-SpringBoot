import { Box } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Avatar, Grid, Modal, TextField } from "@mui/material";

function ImageDisplayCommentPopup({ selectedPost, maxSteps }: any) {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: any) => {
    setActiveStep(step);
  };
  return (
    <Box>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {selectedPost &&
          selectedPost.images &&
          selectedPost.images.map((step: any, index: any) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 600,
                    width: 600,
                  }}
                  src={`http://localhost:8080/assets/posts/${step}`}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={0}
        sx={{ padding: "unset" }}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            sx={{
              // position: "absolute",
              marginTop: "-100%",
              // marginLeft: "50%",
            }}
          >
            {/* Next */}
            {theme.direction === "rtl" ? (
              <Avatar>
                <KeyboardArrowLeft sx={{ color: "blue" }} />
              </Avatar>
            ) : (
              <Avatar>
                <KeyboardArrowRight sx={{ color: "blue" }} />
              </Avatar>
            )}
          </Button>
        }
        backButton={
          <Button
            sx={{
              // position: "absolute",
              marginTop: "-100%",
              // marginLeft: "50%",
            }}
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <Avatar>
                <KeyboardArrowRight sx={{ color: "blue" }} />
              </Avatar>
            ) : (
              <Avatar>
                <KeyboardArrowLeft sx={{ color: "blue" }} />
              </Avatar>
            )}
            {/* Back */}
          </Button>
        }
      />
    </Box>
  );
}
export default ImageDisplayCommentPopup;
