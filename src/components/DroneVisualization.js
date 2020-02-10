import React, { Component } from 'react';
import { connect } from "react-redux";
import Plot from 'react-plotly.js';
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import * as actions from "../store/actions";

const styles = theme => ({
  wrapper: {
    height: "100%",
    width: "100%"
  }
});

class DroneVisualization extends Component {
  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
    this.timer = setInterval(() => onLoad(), 4000);
  }
  componentDidUpdate(prevProps) {
    const {
      longitude,
      latitude,
      updateTemperature
    } = this.props;
    if (prevProps.longitude !== longitude ||
      prevProps.latitude !== latitude) {
      updateTemperature(longitude, latitude);
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { classes, data, error, loading } = this.props;
    if (loading) return <LinearProgress />;
    if (error) return <h3>{`Oops! ${error}`}</h3>;
    return (
      <Plot
        className={classes.wrapper}
        data={[{
          type: 'lines',
          x: data.x,
          y: data.y
        }]}
        layout={ {height: 320, title: 'Drone Data Plot'} }
        useResizeHandler
      />
    );
  }
}

const mapState = state => {
  const {
    error,
    loading,
    longitude,
    latitude,
    data
  } = state.drone;
  return {
    error,
    loading,
    longitude,
    latitude,
    data
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_DRONE_DATA
    }),
  updateTemperature: (longitude, latitude) =>
    dispatch({
      type: actions.FETCH_WEATHER,
      longitude,
      latitude
    })
});

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(DroneVisualization));