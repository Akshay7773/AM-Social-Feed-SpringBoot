import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import history from "../../../routes/history";
import { paths } from "../../../routes/routes.config";
import { useForm } from "react-hook-form";
import { authenticationService } from "../../../utils/auth.service";
import { showErrorToast } from "../../../utils/toastUtil";
import { showSuccessToast } from "../../../utils/toastUtil";

export default function ForgotPass() {
  const { handleSubmit, register } = useForm();
  const [enable, setEnable] = useState(false);
  console.log(enable);
  const submitbtn = (formData: any) => {
    // setEnable(true);
    authenticationService
      .requestPasswordReset(formData) //{ email: "fake@example.com", password: "akash@123" })
      .then((response: any) => {
        showSuccessToast("Check your email");

        setEnable(true);
      })
      .catch((error) => {
        setEnable(false);
        console.log(error.message);
        showErrorToast(error.message);
      });
  };

  const navigateToLogin = () => {
    console.log("first");
    history.push(paths.login);
    window.location.reload();
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // marginTop: "10%",
        height: "100vh",
      }}
    >
      <Card sx={{ width: 570, height: 400 }}>
        <h1 style={{ marginLeft: "100px" }}>Forgot Your Password?</h1>

        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={"bold"}
          >
            <div
              style={{
                marginLeft: "58px",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              <p> Please enter your email address associated with your</p>
              <p>account, and we'll email you a link to reset your password.</p>
            </div>
          </Typography>
        </CardContent>
        <div style={{ textAlign: "center" }}>
          <TextField
            {...register("email", { required: true })}
            style={{ marginBottom: "20px", width: "420px" }}
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
          />
          <br />

          <Button
            style={{ width: "420px", height: "45px" }}
            variant="contained"
            onClick={handleSubmit(submitbtn)}
          >
            Reset Password
          </Button>
          <br />

          <Button
            style={{ marginTop: "12px" }}
            onClick={() => navigateToLogin()}
            variant="text"
          >
            BACK
          </Button>
        </div>
      </Card>
    </div>
  );
}
