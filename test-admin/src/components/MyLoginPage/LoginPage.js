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
};

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

const registerMsgStyle = {
    textAlign: 'center',
    fontSize: 14,
    color: '#00ff00',
    paddingBottom: 20,
};

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registerMsg: '',
            signInEmail: '',
            signInPassword: '',
            errorMsgLogin: '',
            errorMsgPassword: '',
            errorServer: '',
        }
    }

    componentWillMount() {
        document.addEventListener("keydown", this.onKeyDown);
    }

    componentDidMount() {
        let registerMsg = localStorage.getItem('registerMsg');
        if(registerMsg !== null && registerMsg !== undefined && registerMsg !== "") {
            this.setState({registerMsg: registerMsg});
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
        if(this.state.registerMsg !== "") {
            localStorage.setItem('registerMsg', "");
            this.setState({registerMsg: ""});
        }
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
            this.setState({msgServer: localStorage.getItem('loginError')});
        } else {
            console.log("No login error.")
            this.setState({msgServer: ''});
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    };

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    };

    onKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.onSubmitSignIn();
        }
    };

    render() {
        return (
            <div>
                <article className="br3 ba b--black-10 mv4 w-80 w-60-m w-40-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0 center">
                                <legend className="f1-l f2-m f2 fw6 ph0 mh0">Logowanie</legend>
                                <div className="mt3">
                                    <a style={errorMsgStyle2}>{this.state.msgServer}</a>
                                    <a style={registerMsgStyle}>{this.state.registerMsg}</a>
                                    <label className="db fw6 lh-copy f5" htmlFor="email-address">E-mail</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="email"
                                        name="email-address"
                                        id="email-address"
                                        onChange={this.onEmailChange}
                                    />
                                    <div className="mt1">
                                        <a style={errorMsgStyle}>{this.state.errorMsgLogin}</a>
                                    </div>
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f5" htmlFor="password">Hasło</label>
                                    <input
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={this.onPasswordChange}
                                    />
                                    <div className="mt1">
                                        <a style={errorMsgStyle}>{this.state.errorMsgPassword}</a>
                                    </div>
                                </div>
                                <div className="center">
                                    <input
                                        onKeyDown={this.onKeyDown}
                                        onClick={this.onSubmitSignIn}
                                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                                        type="submit"
                                        value="Zaloguj się"
                                    />
                                </div>
                                <div className="center">
                                    <p onClick={() => {this.props.triggerParentChangeRoute('register1')}} className="f5 link dim black pointer ma2">Zarejestruj się</p>
                                </div>
                                <div className="center">
                                    <p onClick={() => {this.props.triggerParentChangeRoute('forgotpassword')}} className="f5 link dim black pointer ma2">Zresetuj hasło</p>
                                </div>
                            </fieldset>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}

export default connect(undefined, { userLogin })(LoginPage);