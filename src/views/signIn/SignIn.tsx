import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, AlertTitle } from "@mui/material";
import { useState } from "react";
import { ROUTES } from "../../route/Constants";
import { NETWORKING_CONTSTANTS } from "../../network/Common.tsx";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:5173/">
        Parko
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [_, setUser] = useState(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setIsLoadingError(false);
    setIsLoading(false);
    const username = formData.get("username");
    const password = formData.get("password");

    if (username == "" || password == "") {
      setIsLoadingError(true);
      return;
    }

    axios
      .post(NETWORKING_CONTSTANTS.BASE_URL + NETWORKING_CONTSTANTS.SIGN_UP, {
        username,
        password,
      })
      .then((data: any) => {
        setIsLoading(false);
        setIsLoadingError(false);
        setUser(data.data.data);
        localStorage.setItem("token", data.data.data.token);
        localStorage.setItem("role", data.data.data.role);

        navigate(ROUTES.DASHBOARD);
      })
      .catch(function () {
        setIsLoading(false);
        setIsLoadingError(true);
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://parko.in/assets/img/parko_logo.png)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "60%",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LocalParkingIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2"></Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
          {isLoading ? (
            <Alert sx={{ m: 3 }} severity="success">
              <AlertTitle>Success</AlertTitle>
              Hurray valid credentials <strong>Welcome to Parko</strong>
            </Alert>
          ) : (
            <></>
          )}
          {isLoadingError ? (
            <Alert sx={{ m: 3 }} severity="error">
              <AlertTitle>Error</AlertTitle>
              <strong>Please use valid credentials</strong>
            </Alert>
          ) : (
            <></>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
