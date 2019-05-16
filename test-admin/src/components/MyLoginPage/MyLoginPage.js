import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from 'react-admin';
import Particles from 'react-particles-js';
import './MyLoginPage.css';
import 'tachyons';

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
}

const errorMsgStyle = {
    textAlign: 'left',
    fontSize: 14,
    color: '#ff0000',
    paddingTop: 10
};

const errorMsgStyle2 = {
    textAlign: 'center',
    fontSize: 14,
    color: '#ff0000',
    paddingBottom: 20,
};

class MyLoginPage extends Component {

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

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateInput = (event) => {
        console.log("Im here");
        console.log("signInEmail: " + this.state.signInEmail);
        console.log("signInPassword: " + this.state.signInPassword);
        let okStatus = true;
        if(!this.state.signInEmail) {
            console.log("Wrong email");
            this.setState({errorMsgLogin: 'E-mail nie może być pusty.'});
            okStatus = false;
        } else if(!this.state.signInEmail.includes('@')) {
            this.setState({errorMsgLogin: ''});
        } else if(!this.validateEmail(this.state.signInEmail)) {
            console.log("Wrong email format");
            this.setState({errorMsgLogin: 'E-mail podany w złym formacie.'});
            okStatus = false;
        } else {
            this.setState({errorMsgLogin: ''});
        }
        if(!this.state.signInPassword) {
            console.log("Wrong password");
            this.setState({errorMsgPassword: 'Hasło nie może być puste.'});
            okStatus = false;
        } else {
            this.setState({errorMsgPassword: ''});
        }
        console.log("returning: " + okStatus);
        return okStatus;
    }

    onSubmitSignIn = (e) => {
        if(this.validateInput(e)) {
            //e.preventDefault();
            // gather data/credentials here
            let username = this.state.signInEmail; //'203368';
            let password = this.state.signInPassword; //'haslo1234';
            const credentials = {
                username: username,
                password: password,
            };
            // Dispatch the userLogin action (injected by connect)
            this.props.userLogin(credentials);
            setTimeout(this.showServerValidationOutput, 500);
        }
    };

    showServerValidationOutput = () => {
        // handling errors and displaying on screen
        console.log("in showServerValidationOutput function");
        if(localStorage.getItem('loginError') !== null) {
            console.log("Login Error Found.");
            this.setState({errorServer: localStorage.getItem('loginError')});
        } else {
            console.log("No login error.")
            this.setState({errorServer: ''});
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    };

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    };



    render() {
        return (
            <div>
                <Particles className='particles' params={particlesOptions}/>
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Logowanie</legend>
                                <div className="mt3">
                                    <a style={errorMsgStyle2}>{this.state.errorServer}</a>
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">E-mail</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="email"
                                        name="email-address"
                                        id="email-address"
                                        onChange={this.onEmailChange}
                                    />
                                    <a style={errorMsgStyle}>{this.state.errorMsgLogin}</a>
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Hasło</label>
                                    <input
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={this.onPasswordChange}
                                    />
                                    <a style={errorMsgStyle}>{this.state.errorMsgPassword}</a>
                                </div>
                            </fieldset>
                            <div className="">
                                <input
                                    onClick={this.onSubmitSignIn}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Zaloguj się"
                                />
                            </div>
                            <div className="lh-copy mt3">
                                <p className="f6 link dim black db pointer">Zarejestruj się</p>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
};

//<form onSubmit={this.submit}>


export default connect(undefined, { userLogin })(MyLoginPage);