import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from './store/actions/locationActions';
import Weather from './models/Weather';

import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => (
  {
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalContent: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    }
  }
));

const App = props => {
  const classes = useStyles();
  const { onGetCurretnLocation, lat, lng } = props;
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    onGetCurretnLocation();
  }, [onGetCurretnLocation]);

  useEffect(() => {
    async function getWeather() {
      const weather = new Weather();
      let currentWeather;
      if (lat && lng) {
        currentWeather = await weather.getWeatherByLatLng(lat, lng);
        console.log(currentWeather);
      }
      setCurrentWeather(currentWeather);
    }

    getWeather();
  }, [lat, lng]);

  return (
    <Container maxWidth="lg">
      <Typography align="center" style={{ fontWeight: 'bold'}} variant="h5">Weather Application</Typography >
      <Modal
        open={props.isLoading}
        className={classes.modal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        onClose={() => {}}
      >
        <Fade in={props.isLoading}>
          <div className={classes.modalContent}>
            Loading ...
          </div>
        </Fade>
      </Modal>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container justidy="center" spacing={2}>
            <Grid item xs={6}>

            </Grid>
            <Grid item xs={6}>8-day Forecast</Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    lat: state.location.lat,
    lng: state.location.lng,
    fullAddress: state.location.fullAddress,
    isLoading: state.location.isLoading,
    errors: state.location.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetCurretnLocation: () => dispatch(actions.loadLocation())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
