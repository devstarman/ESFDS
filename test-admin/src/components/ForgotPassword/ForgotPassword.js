import React, { Component } from 'react';
import './ForgotPassword.css';
import 'tachyons';

let API_URL = 'http://localhost:3000';

let errorMsgStyle = {
    textAlign: 'left',
    fontSize: 14,
    color: '#ff0000',
    paddingTop: 10
};

let okMsgStyle = {
    textAlign: 'center',
    fontSize: 14,
    color: '#00ff00',
    paddingBottom: 20,
};

let errorMsgStyle2 = {
    textAlign: 'center',
    fontSize: 14,
    color: '#ff0000',
    paddingBottom: 20,
};

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            errorMsgLogin: '',
            msgServer: '',
            errorServer: '',
        }
    }

    componentWillMount() {
        document.addEventListener("keydown", this.onKeyDown);
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    validateInput = (event) => {
        console.log("Im here");
        console.log("signInEmail: " + this.state.signInEmail);
        let okStatus = true;
        if(!this.state.signInEmail) {
            console.log("Wrong email");
            this.setState({errorMsgLogin: 'E-mail nie może być pusty.'});
            okStatus = false;
        } else if(!this.validateEmail(this.state.signInEmail)) {
            console.log("Wrong email format");
            this.setState({errorMsgLogin: 'E-mail podany w złym formacie.'});
            okStatus = false;
        } else {
            this.setState({errorMsgLogin: ''});
        }
        console.log("returning: " + okStatus);
        return okStatus;
    };

    onSubmitReset = (e) => {
        if(this.validateInput(e)) {
            // Dispatch reset password to server
            this.dispatchToServer(this.state.signInEmail);
            //setTimeout(this.showServerValidationOutput, 500);
        }
    };

    dispatchToServer = (username) => {
        const request = new Request(API_URL+'/resetpassword', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                username: username
            }),
        });
        return fetch(request)
            .then(response => {
                return response.json();
            })
            .then((myJson) => {
                if(myJson.msg !== undefined) {
                    console.log("myJson.msg: " + myJson.msg);
                    this.setState({
                        msgServer: myJson.msg,
                        errorServer: ''
                    });
                } else if(myJson.resetError !== undefined) {
                    this.setState({
                        msgServer: '',
                        errorServer: myJson.resetError
                    });
                } else {
                    this.setState({
                        msgServer: '',
                        errorServer: 'Błąd serwera.'
                    });
                }
            })
            .catch(err => console.log("Error reseting password: " + err));
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
    };

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    };

    onKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.onSubmitReset();
        }
    };

    render() {
        return (
            <div>
                <article className="br3 ba b--black-10 mv4 w-80 w-60-m w-40-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0 center">
                                <legend className="f1-l f2-m f2 fw6 ph0 mh0">Reset hasła</legend>
                                <div className="mt3">
                                    <a style={okMsgStyle}>{this.state.msgServer}</a>
                                    <a style={errorMsgStyle2}>{this.state.errorServer}</a>
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
                                <div className="center mt3">
                                    <input
                                        onKeyDown={this.onKeyDown}
                                        onClick={this.onSubmitReset}
                                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                                        type="submit"
                                        value="Zresetuj hasło"
                                    />
                                </div>
                                <div className="center pt3">
                                    <p onClick={() => {this.props.triggerParentChangeRoute('login')}} className="f5 link dim black pointer ma2">Logowanie</p>
                                </div>
                            </fieldset>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}

export default ForgotPassword;