import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from 'react-admin';
import Particles from 'react-particles-js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';
import './MyLoginPage.css';
import 'tachyons';
import RegisterPage1 from "../RegisterPage/RegisterPage1";
import RegisterPage2 from "../RegisterPage/RegisterPage2";
import RegisterPage3 from "../RegisterPage/RegisterPage3";
import LoginPage from "./LoginPage";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

const particlesOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};

class MyLoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            route: 'login',
            orgType: '',
            orgNameId: '',
            orgRoleId: '',
            facultyId: ''
        }
    }

    changeRoute = (route) => {
        console.log("route: " + route);
        this.setState({
            route: route
        });
    };

    changeRegisterState = async (newState) => {
        await this.setState(newState);
    };

    getValueFromState = (key) => {
        return this.state[key];
    };

    render() {
        if(this.state.route === 'login') {
            return (
                <div>
                    <Particles className='particles' params={particlesOptions}/>
                    <LoginPage triggerParentChangeRoute={(route) => this.changeRoute(route)} />
                </div>
            );
        } else if(this.state.route === 'register1') {
            return (
                <div>
                    <Particles className='particles' params={particlesOptions}/>
                    <RegisterPage1 triggerParentChangeRoute={(route) => this.changeRoute(route)}
                                    updateRegisterState ={(name, value) => this.changeRegisterState(name, value)} />
                </div>
            );
        } else if(this.state.route === 'register2') {
            return (
                <div>
                    <Particles className='particles' params={particlesOptions}/>
                    <RegisterPage2 triggerParentChangeRoute={(route) => this.changeRoute(route)}
                                   updateRegisterState ={(name, value) => this.changeRegisterState(name, value)}
                                   getValueFromState ={(key) => this.getValueFromState(key)} />
                </div>
            );
        } else if(this.state.route === 'register3') {
            return (
                <div>
                    <Particles className='particles' params={particlesOptions}/>
                    <RegisterPage3 triggerParentChangeRoute={(route) => this.changeRoute(route)}
                                   getValueFromState ={(key) => this.getValueFromState(key)} />
                </div>
            );
        } else if(this.state.route === 'forgotpassword') {
            return (
                <div>
                    <Particles className='particles' params={particlesOptions}/>
                    <ForgotPassword triggerParentChangeRoute={(route) => this.changeRoute(route)} />
                </div>
            );
        }
    }
}


export default connect(undefined, { userLogin })(MyLoginPage);