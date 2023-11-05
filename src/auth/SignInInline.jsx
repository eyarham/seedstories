import { Button, FormLabel, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from "firebase/auth";
import React, { useEffect, useRef, useState } from 'react';
import ErrorToast from '../_common/ErrorToast';

const SignInInline = () => {
  const captchaContainerRef = useRef();
  const [showCodeTextBox, setShowCodeTextBox] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [code, setCode] = useState();
  const [confirmationResultObject, setConfirmationResultObject] = useState();
  const [showError, setShowError] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [appVerifier, setAppVerifier] = useState();
  const displayError = error => {
    const { message } = error
    setErrorMessage(message);
    setShowError(true);
  }

  const auth = getAuth();


  useEffect(() => {
    if (auth) {
      const recaptchaVerifier = new RecaptchaVerifier(auth, captchaContainerRef.current, {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //onSignInSubmit();
        }
      });
      setAppVerifier(recaptchaVerifier)
    }
  }, [auth])
  const onSubmitPhone = e => {
    e.preventDefault();
    const usNumber = `+1${phoneNumber}`;
    signInWithPhoneNumber(auth, usNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setConfirmationResultObject(confirmationResult);
        setShowCodeTextBox(true);
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        // ...
        displayError(error);
      });
  }
  const onSubmitCode = e => {
    e.preventDefault();
    confirmationResultObject.confirm(code).then((result) => {
      // User signed in successfully.
      //const user = result.user;
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      displayError(error);
    });
  }
  const onPhoneChange = e => {
    setPhoneNumber(e.target.value);
  }
  const onCodeChange = e => {
    setCode(e.target.value);
  }
  return (
    <span>

      {!showCodeTextBox &&
        <span>
          <Box component="form" onSubmit={onSubmitPhone}>
            <FormLabel sx={{ margin: 1 }}>Sign in: </FormLabel>
            <TextField size='small' sx={{ marginLeft: 1 }} placeholder="phone" onChange={onPhoneChange} type="number" />
            <Button variant="contained" sx={{ marginLeft: 1 }} onClick={onSubmitPhone} >go</Button>
          </Box>
        </span>
      }
      {showCodeTextBox &&
        <span>
          <Box component="form" onSubmit={onSubmitCode}>
            code sent to {phoneNumber}
            <TextField size='small' sx={{ marginLeft: 1 }} placeholder="code" onChange={onCodeChange}></TextField>
            <Button variant="contained" sx={{ marginLeft: 1 }} onClick={onSubmitPhone} >go</Button>
          </Box>
        </span>
      }
      <div ref={captchaContainerRef}></div>
      {showError && <ErrorToast message={errorMessage} />}
    </span>
  )
}

export default SignInInline