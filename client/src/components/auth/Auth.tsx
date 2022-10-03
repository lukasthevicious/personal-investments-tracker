import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@mui/material";
import { FiLock } from "react-icons/fi";
import { AiOutlineGoogle } from "react-icons/ai";

import { StyledTestAuth } from "./styled";
import TestInput from "./TestInput";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import { gapi } from "gapi-script";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../state/hooks";
import { registerUser, loginUser } from "../../state/actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Auth() {
  const [formData, setFormData] = useState(initialState);
  const [isRegistration, setIsRegistration] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const clientID =
    "1065422573478-630fs1ejaapidoaot95o16c8s0v2khnl.apps.googleusercontent.com";
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientID,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //narolluje všechny staré formData a změní pouze ty, které se rovanjí name (např firstName v objektu = firstName name inputu) a priradi tam current value. PŘEDPOKLAD: POLOŽKY V OBJEKTU = NAME INPUTŮ
  };

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    if (isRegistration) {
      dispatch(registerUser(formData, history));
    } else {
      dispatch(loginUser(formData, history));
    }
    console.log(formData);
  };

  const googleSuccess = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ): Promise<void> => {
    let result;
    let token;
    if ("profileObj" in res) {
      result = res?.profileObj;
      token = res?.tokenId;
    }

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error: any) => {
    console.log(error);
    console.log("Google sign in was unsuccesful.");
  };

  return (
    <StyledTestAuth>
      <Container component="main" maxWidth="xs">
        <Paper className="paper" elevation={3}>
          <Avatar className="avatar">
            <FiLock />
          </Avatar>
          <Typography variant="h5">
            {isRegistration ? "Sign Up" : "Sign In"}
          </Typography>
          <form className="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isRegistration && (
                <>
                  <TestInput
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <TestInput
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <TestInput
                name="email"
                label="E-mail Address"
                handleChange={handleChange}
                type="email"
              />
              <TestInput
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={() =>
                  setShowPassword((prevState) => !prevState)
                }
              />
              {isRegistration && (
                <TestInput
                  name="confirmPassword"
                  label="Confirm Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              {isRegistration ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              clientId="Google ID"
              render={(renderProps) => (
                <Button
                  color="primary"
                  className="google-button"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<AiOutlineGoogle />}
                  variant="contained"
                >
                  Sign in with Google
                </Button>
              )}
              cookiePolicy="single_host_origin"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button
                  onClick={() => setIsRegistration((prevState) => !prevState)}
                >
                  {isRegistration
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        {/* div that looks like paper */}
      </Container>
    </StyledTestAuth>
  );
}
