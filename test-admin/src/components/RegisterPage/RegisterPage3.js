import React, { Component } from 'react';
import './RegisterPage.css';
import 'tachyons';

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

const API_URL = 'http://localhost:3000';

class RegisterPage3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orgType: 0,
            orgNameId: 0,
            orgRoleId: 0,
            facultyId: 0,
            name: '',
            surname: '',
            email: '',
            mobilenumber: '',
            password: '',
            password2: '',
            errorTextName: '',
            errorTextSurname: '',
            errorTextEmail: '',
            errorTextMobilenumber: '',
            errorTextPassword: '',
            errorTextPassword2: '',
            errorServer: '',
        }
    }

    componentWillMount() {
        document.addEventListener("keydown", this.onKeyDown);
    }

    componentDidMount() {
        this.setState({
            orgType: this.props.getValueFromState('orgType'),
            orgNameId: this.props.getValueFromState('orgNameId'),
            orgRoleId: this.props.getValueFromState('orgRoleId'),
            facultyId: this.props.getValueFromState('facultyId')
        })
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    };

    onSurnameChange = (event) => {
        this.setState({surname: event.target.value})
    };

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    };

    onMobileNumberChange = (event) => {
        this.setState({mobilenumber: event.target.value})
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    };

    onPassword2Change = (event) => {
        this.setState({password2: event.target.value})
    };

    onKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.onSubmitRegister();
        }
    };

    onSubmitRegister = () => {
        //validate data in component state
        if(this.validateInput()) {
            // Dispatch register request to server
            const request = new Request(API_URL+'/register', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({
                    name: this.state.name,
                    surname: this.state.surname,
                    email: this.state.email,
                    mobilenumber: this.state.mobilenumber,
                    password: this.state.password,
                    orgNameId: this.state.orgNameId,
                    orgRoleId: this.state.orgRoleId,
                    facultyId: this.state.facultyId,
                }),
            });
            fetch(request)
                .then(response => {
                    return response.json();
                })
                .then(async (myJson) => {
                    console.log("Server respondend with myJson: " + myJson);
                    if(myJson.msg !== undefined) {
                        console.log("Register successful: " + myJson.msg);
                        //store msg for successful registration
                        localStorage.setItem('registerMsg', myJson.msg);
                        //go to login page
                        this.props.triggerParentChangeRoute('login');
                    } else if(myJson.errorMsg !== undefined) {
                        console.log("Setting server error message.");
                        this.setState({
                            msgServer: myJson.errorMsg,
                        });
                    } else {
                        this.setState({
                            msgServer: 'Serwer nie odpowiada.',
                        });
                    }
                });
            // Wait for server response and deal with it
            //setTimeout(this.showServerValidationOutput, 500);
        }
    };

    validateInput = () => {
        console.log("Validation");
        let { name, surname, email, mobilenumber, password, password2 } = this.state;
        console.log("name = " + name);
        let isRegisterInputValid = true;
        if(!name) {
            this.setState({errorTextName: 'To pole nie może być puste.'});
            isRegisterInputValid = false;
        } else {
            this.setState({errorTextName: ''});
        }
        if(!surname) {
            this.setState({errorTextSurname: 'To pole nie może być puste.'});
            isRegisterInputValid = false;
        } else {
            this.setState({errorTextSurname: ''});
        }
        if(!email) {
            this.setState({errorTextEmail: 'To pole nie może być puste.'});
            isRegisterInputValid = false;
        } else if(!email.includes('@pwr.edu.pl') && !email.includes('@student.pwr.edu.pl')) {
            this.setState({errorTextEmail: 'E-mail musi znajdować się w domenie @pwr.edu.pl'});
            isRegisterInputValid = false;
        } else {
            this.setState({errorTextEmail: ''});
        }
        if(!mobilenumber) {
            this.setState({errorTextMobilenumber: 'To pole nie może być puste.'});
            isRegisterInputValid = false;
        } else if(!this.validateNumber(mobilenumber)) {
            this.setState({errorTextMobilenumber: 'Numer musi składać się z 9 cyfr.'});
            isRegisterInputValid = false;
        } else {
            this.setState({errorTextMobilenumber: ''});
        }
        if(!password) {
            this.setState({errorTextPassword: 'To pole nie może być puste.'});
            isRegisterInputValid = false;
        } else {
            this.setState({errorTextPassword: ''});
        }
        if(!password2) {
            this.setState({errorTextPassword2: 'To pole nie może być puste.'});
            isRegisterInputValid = false;
        } else if(password !== password2) {
            this.setState({errorTextPassword2: 'Wprowadzone hasła muszą być takie same.'});
            isRegisterInputValid = false;
        } else {
            this.setState({errorTextPassword2: ''});
        }
        console.log("returning: " + isRegisterInputValid);
        return isRegisterInputValid;
    };

    validateNumber = (number) => {
        var re = /^\d{9}$/;
        return re.test(String(number));
    };

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
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

    render() {
        return (
            <div>
                <article className="br3 ba b--black-10 mv4 w-80 w-60-m w-40-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0 center">
                                <legend className="f1-l f2-m f2 fw6 ph0 mh0">Rejestracja 3/3</legend>
                                <div className="mt3">
                                    <a style={errorMsgStyle2}>{this.state.msgServer}</a>
                                    <label className="db fw6 lh-copy f5" htmlFor="Imię">Imię</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="text"
                                        name="imie"
                                        id="imie"
                                        onChange={this.onNameChange}
                                    />
                                    <div className="mt1">
                                        <a style={errorMsgStyle}>{this.state.errorTextName}</a>
                                    </div>
                                    <label className="db fw6 lh-copy f5" htmlFor="Nazwisko">Nazwisko</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="text"
                                        name="nazwisko"
                                        id="nazwisko"
                                        onChange={this.onSurnameChange}
                                    />
                                    <div className="mt1">
                                        <a style={errorMsgStyle}>{this.state.errorTextSurname}</a>
                                    </div>
                                    <label className="db fw6 lh-copy f5" htmlFor="E-mail">E-mail</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="email"
                                        name="e-mail"
                                        id="e-mail"
                                        onChange={this.onEmailChange}
                                    />
                                    <div className="mt1">
                                        <a style={errorMsgStyle}>{this.state.errorTextEmail}</a>
                                    </div>
                                    <label className="db fw6 lh-copy f5" htmlFor="Telefon">Telefon</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="tel"
                                        name="telefon"
                                        id="telefon"
                                        onChange={this.onMobileNumberChange}
                                    />
                                    <div className="mt1">
                                        <a style={errorMsgStyle}>{this.state.errorTextMobilenumber}</a>
                                    </div>
                                    <label className="db fw6 lh-copy f5" htmlFor="Hasło">Hasło</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="password"
                                        name="haslo"
                                        id="haslo"
                                        onChange={this.onPasswordChange}
                                    />
                                    <div className="mt1">
                                        <a style={errorMsgStyle}>{this.state.errorTextPassword}</a>
                                    </div>
                                    <label className="db fw6 lh-copy f5" htmlFor="Powtórz hasło">Powtórz hasło</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="password"
                                        name="haslo2"
                                        id="haslo2"
                                        onChange={this.onPassword2Change}
                                    />
                                    <div className="mt1">
                                        <a style={errorMsgStyle}>{this.state.errorTextPassword2}</a>
                                    </div>
                                </div>
                                <div className="center mt3">
                                    <input
                                        onKeyDown={this.onKeyDown}
                                        onClick={this.onSubmitRegister}
                                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                                        type="submit"
                                        value="Zarejestruj się"
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

export default RegisterPage3;