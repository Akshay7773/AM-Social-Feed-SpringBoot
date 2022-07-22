import { Box, Button, Card, TextField } from "@mui/material";
import React, { useState } from "react";
import "./register.scss";
import { useForm } from "react-hook-form";
import { authenticationService } from "../../../utils/auth.service";
import Link from "@mui/material/Link";

export default function Register() {
  const { handleSubmit, register } = useForm();
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const doRegister = (formData: any) => {
    console.log("hello world", formData);
    // setButtonDisabled(true);
    authenticationService
      .register(formData) //{ email: "fake@example.com", password: "akash@123" })
      .then((response: any) => {
        setButtonDisabled(false);
        console.log("response", response);
      })
      .catch((error) => {
        setButtonDisabled(false);
        console.log(error);
      });
  };
  const login = () => {
    authenticationService.gotoLogin();
  };
  return (
    <center>
      <Card
        className="register"
        sx={{
          boxShadow: "1px 2px #aaaaaa",
          // margin: 2,
        }}
      >
        <h1>Sign Up to Social Feed</h1>
        <Box
          component="form"
          onSubmit={handleSubmit(doRegister)}
          noValidate
          // sx={{
          //   borderColor: "grey.500",
          //   margin: 2,
          //   display: "flex",
          //   flexDirection: "column",
          //   alignItems: "center",
          // }}
        >
          <div>
            <TextField
              {...register("firstname", { required: true })}
              style={{
                width: "250px",
                backgroundColor: "white",
                borderRadius: "10px",
                marginBottom: "8%",
                marginRight: "16px",
              }}
              label="First Name"
              inputProps={{
                style: {
                  height: "30px",
                },
              }}
            />

            <TextField
              {...register("lastname", { required: true })}
              style={{
                width: "250px",
                backgroundColor: "white",
                borderRadius: "10px",
                marginBottom: "8%",
              }}
              label="Last Name"
              inputProps={{
                style: {
                  height: "30px",
                },
              }}
            />
          </div>

          <TextField
            {...register("email", { required: true })}
            style={{
              width: "516px",
              backgroundColor: "white",
              borderRadius: "10px",
              marginBottom: "8%",
            }}
            label="Email"
            inputProps={{
              style: {
                height: "30px",
              },
            }}
          />
          {/* <br />
          <br /> */}
          <TextField
            {...register("password", { required: true })}
            style={{
              width: "516px",
              backgroundColor: "white",
              borderRadius: "10px",
              marginBottom: "8%",
            }}
            label="Password"
            inputProps={{
              style: {
                height: "30px",
              },
            }}
          />
          {/* <br />
          <br /> */}
          <Button
            // onClick={() => register()}
            type="submit"
            variant="contained"
            disableElevation
            style={{
              marginTop: "5px",
              padding: "1% 8%",
              width: "516px",
              height: "58px ",
            }}

            // style={{ padding: "1% 10%" }}
          >
            Sign Up
          </Button>
        </Box>
        <p style={{ color: "#637381", fontSize: "16px" }}>
          Already having an account?{"  "}
          <Link onClick={() => login()} href="" variant="body2">
            {"Log in"}
          </Link>
        </p>
      </Card>
    </center>
  );
}
