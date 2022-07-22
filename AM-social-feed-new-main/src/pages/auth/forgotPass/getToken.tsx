import { Button, Card, CardHeader, IconButton, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { authenticationService } from "../../../utils/auth.service";
import { useLocation } from "react-router-dom";

export default function GetToken() {
  const { handleSubmit, register } = useForm();
  const { search } = useLocation();
  console.log(search);
  const token = search.split("=")[1];
  const submitbtn = (formData: any) => {
    console.log("hello EMAIL", formData);
    const { password } = formData;
    authenticationService
      .setPassword({ password: password }, token) //{ email: "fake@example.com", password: "akash@123" })
      .then((response: any) => {
        console.log("hello login");
      })
      .catch((error) => {});
  };

  const gotologin = () => {
    console.log("hello");
    authenticationService.gotoLogin();
  };
  return (
    <center>
      <Card sx={{ width: 512, marginTop: "15%" }}>
        <h1 style={{ height: "36px", marginBottom: "50px" }}>
          Set your new password
        </h1>
        <TextField
          {...register("password", { required: true })}
          style={{
            width: "480px",
            marginBottom: "30px",
            height: "56px",
          }}
          id="outlined-basic"
          label="new password"
          variant="outlined"
        />
        <TextField
          {...register("password", { required: true })}
          style={{
            marginBottom: "30px",
            width: "480px",
            height: "56px",
          }}
          id="outlined-basic"
          label="confirm password"
          variant="outlined"
        />
        <br />
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <Button
            style={{ width: "480px", height: "45px", marginBottom: "20px" }}
            variant="contained"
            onClick={handleSubmit(submitbtn)}
          >
            Reset Password
          </Button>

          <Button onClick={() => gotologin()} variant="text">
            BACK
          </Button>
        </div>
        {/* <Button variant="contained" onClick={handleSubmit(gotologin)}>
          Login Page
        </Button> */}
      </Card>{" "}
    </center>
  );
}
