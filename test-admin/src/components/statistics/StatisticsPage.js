import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardStatistics from './CardStatistics';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: "100%",
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        height: "100%",
        color: theme.palette.text.secondary,
    },
});

class StatisticsPage extends Component {

    constructor(props) {
        super(props);
        console.log("contructor()");
        this.state = {
            status: 'empty status',
            balanceValue: 0,
            maxBalanceValue: 0,
            entriesIn1Minute: 0,
            entriesOut1Minute: 0,
            entriesIn30Minutes: 0,
            entriesOut30Minutes: 0,
            alertsQuantities: [0, 0, 0, 0],
            alertsMaxValues: [0, 0, 0, 0],
            gatesInQuantities: [0, 0, 0, 0, 0, 0, 0],
            gatesOutQuantities: [0, 0, 0, 0, 0, 0, 0],
            gatesWarningLevelIn: 0, // in %
            gatesWarningLevelOut: 0, // in %
            timeLabels: [],
            dataLabels: [],
            timestamp: 0,
        }
    }

    componentDidMount() {
        console.log("componentDidMount()");
        //this.setInitialState();
        this.fetchDataFromServer();
        const REFRESH_TIME_SECONDS = 60;
        this.interval = setInterval(() => {
            console.log("Refreshing data");
            this.fetchDataFromServer();
        }, REFRESH_TIME_SECONDS * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // async fetchConfig() {
    //     let API_URL = 'http://localhost:3000';
    //     const request = new Request(API_URL+'/configuration', {
    //         method: 'GET',
    //         headers: new Headers({ 'Content-Type': 'application/json' }),
    //     });
    //     console.log("fetch config request");
    //     return new Promise(function(resolve, reject) {
    //         fetch(request)
    //             .then(response => {
    //                 return response.json();
    //             })
    //             .then((myResponseJson) => {
    //                 if (myResponseJson[0] !== undefined) {
    //                     console.log("Success fetching config for dashboard.");
    //                     resolve(myResponseJson[0]);
    //                 } else {
    //                     console.log("Something went wrong with config, resolving 0");
    //                     resolve(0);
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log("error fetching config: " + err);
    //                 reject(err);
    //             });
    //     });
    // }
    //
    // async fetchAlerts() {
    //     let API_URL = 'http://localhost:3000';
    //     const request = new Request(API_URL+'/alerts', {
    //         method: 'GET',
    //         headers: new Headers({ 'Content-Type': 'application/json' }),
    //     });
    //     console.log("fetch alerts request");
    //     return new Promise(function(resolve, reject) {
    //         fetch(request)
    //             .then(response => {
    //                 return response.json();
    //             })
    //             .then((myResponseJson) => {
    //                 if (myResponseJson[0] !== undefined) {
    //                     console.log("Success fetching alerts for dashboard.");
    //                     resolve(myResponseJson[0]);
    //                 } else {
    //                     console.log("Something went wrong with alerts, resolving 0");
    //                     resolve([0,0,0,0]);
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log("error fetching alerts: " + err);
    //                 reject(err);
    //             });
    //     });
    // }
    //
    // fetchDataFromServer = () => {
    //     performance.mark("PointA");
    //     let API_URL = 'http://localhost:3000';
    //     const request = new Request(API_URL+'/statistics', {
    //         method: 'GET',
    //         headers: new Headers({ 'Content-Type': 'application/json' }),
    //     });
    //     console.log("fetch request");
    //     fetch(request)
    //         .then(response => {
    //             console.log("returning json");
    //             return response.json();
    //         })
    //         .then(async (statistics) => {
    //             if(statistics.balanceValue !== undefined) {
    //                 console.log("Success fetching data for dashboard.");
    //                 let config = await this.fetchConfig();
    //                 let alerts = await this.fetchAlerts();
    //                 performance.mark("PointB");
    //                 performance.measure("measure a to b", "PointA", "PointB");
    //                 console.log("Time for fetching: " + performance.getEntriesByType("measure")[0].duration + "ms");
    //                 this.setState({
    //                     status: 'success',
    //                     balanceValue: statistics.balanceValue,
    //                     maxBalanceValue: config.maxBalanceValue,
    //                     entriesIn1Minute: statistics.entriesIn1Minute,
    //                     entriesOut1Minute: statistics.entriesOut1Minute,
    //                     entriesIn30Minutes: statistics.entriesIn30Minutes,
    //                     entriesOut30Minutes: statistics.entriesOut30Minutes,
    //                     alertsQuantities: [alerts.alert1quantity, alerts.alert2quantity, alerts.alert3quantity, alerts.alert4quantity],
    //                     alertsMaxValues: [config.alert1maxPeople, config.alert2maxPeople, config.alert3maxPeople, config.alert4maxPeople],
    //                     gatesInQuantities: statistics.gatesInQuantities,
    //                     gatesOutQuantities: statistics.gatesOutQuantities,
    //                     gatesWarningLevelIn: config.gatesWarningLevelIn,
    //                     gatesWarningLevelOut: config.gatesWarningLevelOut,
    //                     timeLabels: statistics.timeLabels,
    //                     dataLabels: statistics.dataLabels,
    //                     timestamp: statistics.timestamp,
    //                 });
    //                 return Promise.resolve();
    //             } else {
    //                 console.log("Error fetching data for dashboard.");
    //                 this.setState({
    //                     status: 'error fetching data',
    //                 });
    //                 return Promise.reject('');
    //             }
    //         });
    // };

    setInitialState = () => {
        this.setState({
            status: 'aaa',
            balanceValue: 16500,
            maxBalanceValue: 20000,
            entriesIn1Minute: 16,
            entriesOut1Minute: 3,
            entriesIn30Minutes: 152,
            entriesOut30Minutes: 31,
            alertsQuantities: [6, 4, 2, 1],
            gatesInQuantities: [250, 500, 1000, 125, 125, 125, 250],
            gatesOutQuantities: [0, 0, 0, 0, 50, 100, 100],
            gatesWarningLevelIn: 30,
            gatesWarningLevelOut: 50,
            timeLabels: ["12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00" ],
            dataLabels: [3000, 4000, 7000, 16000, 8000, 9000, 10000, 14000, 15500, 16000, 15000, 17300, 16400, 16600, 16800, 17000],
        });
    };

    render() {
        console.log("render dashboard statistics");
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                Data ostatniej aktualizacji: {this.state.timestamp}
                <Grid container spacing={16}>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <CardStatistics timeLabels={this.state.timeLabels} dataLabels={this.state.dataLabels} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

StatisticsPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatisticsPage);