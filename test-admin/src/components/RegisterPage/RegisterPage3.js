import React, { Component } from 'react';
import Particles from 'react-particles-js';
import 'tachyons';

export default class RegisterPage3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            errorMsgLogin: '',
            errorMsgPassword: '',
            errorServer: '',
        }
    }

    componentWillMount() {
        console.log("Register Page 3");
    }

    render() {
        return (
            <div>
                1
            </div>

        )
    }

}