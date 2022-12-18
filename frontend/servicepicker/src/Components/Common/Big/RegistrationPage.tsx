import React from 'react';
import { Typography, Card, Grid } from '@mui/material';

import RegistrationForm from '../Small/RegistrationForm';
import NavigationBar from '../Small/NavigationBar';
import Register from '../../../Types/Register';

interface IRegistration {
  regData?: Register;
}

const RegistrationPage: React.FC<IRegistration> = () => (
  <React.Fragment>
    <script src="https://apis.google.com/js/platform.js" async defer />
    <NavigationBar />
    <Grid container justifyContent="center" alignItems="center">
      <Grid xs={12} sm={9} item direction="column" justifyContent="center" alignItems="center" container>
        <Card style={{ padding: '35px' }} variant="outlined">
          <Typography variant="h4" style={{ paddingBottom: '10px' }}>
            Регистрация
          </Typography>
          <RegistrationForm regData={window.history.state} />
        </Card>
      </Grid>
    </Grid>
  </React.Fragment>
);

export default RegistrationPage;
