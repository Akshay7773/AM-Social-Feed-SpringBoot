import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./login.scss";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authenticationService } from "../../../utils/auth.service";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link as RouterLink } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { Card, Divider, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  // Initial hooks
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { handleSubmit, register } = useForm();
  const theme = createTheme();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  /*
   * Verify Credentials
   */
  const doLogin = (formData: any) => {
    console.log(formData);
    setButtonDisabled(true);
    authenticationService
      .verifyCredentials(formData) //{ email: "fake@example.com", password: "akash@123" })
      .then((response: any) => {
        console.log("hello login", response);
        setButtonDisabled(false);
      })
      .catch((error) => {
        setButtonDisabled(false);
      });
  };

  const signup = () => {
    authenticationService.signUp();
  };
  const forgotPassword = () => {
    authenticationService.forgotPass();
  };
  let [googleInfo, setGoogleInfo] = useState<any>("");
  const responseGoogle = async (googleResponse: any) => {
    // const token = await reRef.current.executeAsync();
    googleInfo = googleResponse.tokenId;
    // console.log(googleResponse.tokenId);
    googleResponse.tokenId && authenticationService.googleLogin(googleInfo);
  };

  /*
   * Render
   */

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card className="card" sx={{ boxShadow: "1px 2px #aaaaaa" }}>
          <Box
            sx={{
              borderColor: "grey.500",
              margin: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in to Social Feed
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(doLogin)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                // sx={{ width: "400px", height: "56px" }}
                {...register("username", { required: true })}
                margin="normal"
                required
                fullWidth
                // defaultValue="a"
                id="username"
                label="Email Address"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                {...register("password", { required: true })}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                // defaultValue="b"
                id="password"
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{ width: "20px", height: "14px" }}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                loading={isButtonDisabled}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item xs sx={{ marginTop: "20px", marginBottom: "20px" }}>
                  <p style={{ color: "#637381", fontSize: "16px" }}>
                    Don't have an account?{"  "}
                    <Link onClick={() => signup()} variant="body2">
                      {" Sign Up"}
                    </Link>
                  </p>
                </Grid>

                <Grid item>
                  {/* <RouterLink to="/auth/register"> */}

                  <Link
                    style={{ color: "#637381", fontSize: "16px" }}
                    href=""
                    onClick={() => forgotPassword()}
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                  {/* </RouterLink> */}
                </Grid>
              </Grid>
              <Divider spacing={2}>OR</Divider>
            </Box>

            <div style={{ marginTop: "15px" }}>
              <GoogleLogin
                clientId="90637269027-cqmns9kff5q3usbr7aqr4qmd8ffeqp4g.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </Box>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
