import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserService from "@/modules/UserService";
import ApiHandler from "@/common/services/ApiHandler";
import SessionService from "@/common/services/SessionService";
import Router from "next/router";
import { useAuth } from 'reactfire';
import {
  getAuth,
  getMultiFactorResolver,
  MultiFactorResolver,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
  signInWithEmailAndPassword
} from "firebase/auth";
import { Modal } from "@mui/material";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

let domain = process.env.DOMAIN;
let userService: UserService = new UserService(new ApiHandler(), new SessionService());
export default function index(props:any) {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationCodeInput, setShowVerificationCodeInput] = useState(false);
  const [open, setOpen] = useState(false);

  const auth = useAuth();

  async function signIn(e: any) {
    e.preventDefault();
      const recaptchaVerifier = new RecaptchaVerifier("sign-in-button", {
    "size": "invisible",
    "callback": function(response:any) {
        // reCAPTCHA solved, you can proceed with
        // phoneAuthProvider.verifyPhoneNumber(...).
    }
  }, auth);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        ).then(function (userCredential) {
          // signed in.
          Router.push('/home')
          console.log("signed in")
      }).catch(function (error) {
        if (error.code == 'auth/multi-factor-auth-required') {
            console.log("2fa required")
            // The user is a multi-factor user. Second factor challenge is required.
            const resolver = getMultiFactorResolver(auth, error);
            const phoneInfoOptions = {
              multiFactorHint: resolver.hints[0],
              session: resolver.session
            };
            const phoneAuthProvider = new PhoneAuthProvider(auth);
            phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
                .then(function (verificationId) {
                    getUserInput(function(verificationCode:any) {
                      console.log("User input is: " + verificationCode);
                      const cred = PhoneAuthProvider.credential(
                        verificationId, verificationCode);
                      const multiFactorAssertion =
                          PhoneMultiFactorGenerator.assertion(cred);
                      // Complete sign-in.
                      return resolver.resolveSignIn(multiFactorAssertion)
                    })
                })
                .then(function (userCredential) {
                  // User successfully signed in with the second factor phone number.
                  Router.push('/home')
                  console.log("signed in with 2fa")
              });
        } else if (error.code == 'auth/wrong-password') {
            // Handle other errors such as wrong password.
        }
      });
}

function getUserInput(callback : any) {
  // show a prompt to the user
  const userInput = prompt("Please enter your input");

  // pass the user input to the callback function
  callback(userInput);
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Kwebbel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container id="2fa-captcha" component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              id="email"
              margin="normal"
              required
              fullWidth
              type="email"
              label="Emailaddress"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              id="sign-in-button"
              onClick={(e) => signIn(e)}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link id="signUp" onClick={() => Router.push("/auth/register")} href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>

          <dialog id="mfa-modal" className="mdl-dialog">
            <div className="modal-body">
              <div id="mfa-error-message" className="mdl-card__subtitle-text mdl-color-text--red
              blinking"></div>
              <div id="mfa-enroll-modal">
                <form id="enroll-send-code-form" action="#">
                  <div id="phone-div" className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" pattern="\+[0-9\s\-\(\)]+" id="phone-number"/>
                    <label className="mdl-textfield__label" >Enter your phone number...</label>
                    <span className="mdl-textfield__error">Input is not an international phone number!</span>
                  </div>

                  <div id="enroll-recaptcha-container" className="recaptcha-container"></div>

                  <input type="submit" disabled className="mdl-button mdl-js-button mdl-button--raised" id="enroll-send-code-button" value="Send Code" />
                  <button className="mdl-button mdl-js-button mdl-button--raised" id="enroll-cancel-send-code-button">Cancel</button>
                </form>

                <form id="enroll-verification-code-form" action="#">
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" id="enroll-verification-code"/>
                    <label className="mdl-textfield__label" >Enter the verification code...</label>
                  </div>

                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" id="enroll-display-name"/>
                    <label className="mdl-textfield__label" >Enter the display
                    name...</label>
                  </div>

                  <input type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="enroll-verify-code-button" value="Verify Code" />
                  <button className="mdl-button mdl-js-button mdl-button--raised" id="enroll-cancel-verify-code-button">Cancel</button>
                </form>
              </div>
              </div>
            </dialog>
    </ThemeProvider>
  );
}