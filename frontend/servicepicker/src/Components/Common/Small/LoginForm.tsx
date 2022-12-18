import React from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui'
import { Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';

import Login from '../../../Types/Login';
import { authViaGoogle, logInRequest, serverAnswers } from '../../../Requests/AccountRequests';
import ServerResponse from '../../../Types/ServerResponse';
import Register from '../../../Types/Register';

import ErrorSnackBar from './ErrorSnackBar';

const useStyles = makeStyles()((theme) => ({
    spaces: {
      marginTop: theme.spacing(1),
    },
  }),
);

const LoginForm: React.FC = () => {
  const { classes, cx } = useStyles()

  const [loginData, setLoginData] = React.useState<Login>({ login: '', password: '', rememberMe: true });

  const [errors, setErrors] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');

  const handleRememberMeChange = () => {
    setLoginData({ login: loginData.login, password: loginData.password, rememberMe: !loginData.rememberMe });
  };

  const handleLoginChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLoginData({
      login: event.target.value as string,
      password: loginData.password,
      rememberMe: loginData.rememberMe,
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLoginData({
      login: loginData.login,
      password: event.target.value as string,
      rememberMe: loginData.rememberMe,
    });
  };

  const handleGoogleLoginSuccess = async (googleData: unknown) => {
    if (googleData) {
      const authResponse = (googleData as GoogleLoginResponse)?.getAuthResponse();
      if (authResponse) {
        googleRedirectTo(googleData as GoogleLoginResponse);
      }
    }
  };

  const logInButtonClicked = async () => {
    redirectTo(await logInRequest(loginData));
  };

  const redirectTo = async (response: ServerResponse) => {
    switch (response.code) {
      case serverAnswers.signedIn:
        window.location.replace('/');
        break;
      case serverAnswers.noCommand:
        setMessage(response.message);
        setErrors(response.errors);
        setOpen(true);
        break;
    }
  };

  const googleRedirectTo = async (googleData: GoogleLoginResponse) => {
    const id = googleData?.getAuthResponse()?.id_token;
    const serverResult = await authViaGoogle(id);
    switch (serverResult.code) {
      case serverAnswers.userNotFound:
        redirectToRegistrationPage(id, googleData);
        break;
      case serverAnswers.signedIn:
        window.location.replace('/');
        break;
      case serverAnswers.noCommand:
        setMessage(serverResult.message);
        setErrors(serverResult.errors);
        setOpen(true);
        break;
    }
  };

  const redirectToRegistrationPage = (id: string, googleData: GoogleLoginResponse) => {
    const profile = googleData.getBasicProfile();
    const regData: Register = {
      login: '',
      password: '',
      email: profile.getEmail(),
      firstName: profile.getGivenName(),
      secondName: profile.getFamilyName(),
      token: id,
    };

    window.history.pushState(regData, '', '/registration');
    window.location.replace('/registration');
  };

  return (
    <Grid container direction="column" justifyContent="center">
      <TextField
        id="login-tf"
        className={classes.spaces}
        value={loginData.login}
        onChange={handleLoginChange}
        label="Логин"
        variant="outlined"
      />
      <TextField
        id="password-tf"
        className={classes.spaces}
        type="password"
        value={loginData.password}
        onChange={handlePasswordChange}
        label="Пароль"
        variant="outlined"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={loginData.rememberMe}
            onChange={handleRememberMeChange}
            name="rememberMe"
            color="primary"
          />
        }
        label="Запомнить меня"
        className={classes.spaces}
      />
      <Grid container justifyContent="flex-end">
        <Button
          type="submit"
          className={classes.spaces}
          color="primary"
          variant="contained"
          onClick={logInButtonClicked}
        >
          Войти
        </Button>
      </Grid>
      <Grid className={classes.spaces} container justifyContent="center">
        <Typography component="div">Войти с помощью</Typography>
      </Grid>
      <Grid container justifyContent="center">
        <GoogleLogin
          clientId={'1036988036938-9u2bo3aiqo038ehm8tlb3vl9lq6bm27f.apps.googleusercontent.com'}
          buttonText="Войти через Google"
          onSuccess={handleGoogleLoginSuccess}
          cookiePolicy={'single_host_origin'}
        />
      </Grid>
      <ErrorSnackBar message={message} errors={errors} open={open} setOpen={setOpen} />
    </Grid>
  );
};

export default LoginForm;
