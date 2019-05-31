import React, { Component } from 'react';
import './RegisterPage.css';
import Select from 'react-select';
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
let defaultOptions = [{value: 0, label: " "}];

class RegisterPage1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orgType: 0,
            errorMsgOrgType: '',
            errorServer: '',
            orgTypes: [],
            orgTypesOptions: [],
        }
    }

    async componentDidMount() {
        console.log("cDM: this.state.orgType: " + this.state.orgType);
        const request = new Request(API_URL+'/organisationTypes', {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        await fetch(request)
            .then(response => {
                console.log("response: " + JSON.stringify(response));
                return response.json();
            })
            .then(async (myJson) => {
                if(myJson[0] !== undefined) {
                    this.setState({
                        orgTypes: myJson
                    });
                } else {
                    console.log('Błąd serwera.');
                    this.setState({
                        errorServer: 'Błąd serwera.',
                    });
                }
            })
            .catch(err => {
                console.log('Serwer nie odpowiada. ' + err);
                this.setState({
                    errorServer: 'Serwer nie odpowiada.',
                });
            });
        for(let i = 0; i < this.state.orgTypes.length; i++) {
            this.state.orgTypesOptions[i] = {
                value: this.state.orgTypes[i].id,
                label: this.state.orgTypes[i].organisationtype };
        }
        this.forceUpdate();
    }

    componentWillMount() {
        document.addEventListener("keydown", this.onKeyDown);
    }

    async handleChangeOrgType(val) {
        // updating value
        await this.setState({orgType: val.value});
        // checking if clearing error msg is needed
        if(this.state.errorMsgOrgType !== '' && this.state.orgType !== 0) {
            console.log('clearing error msg');
            this.setState({errorMsgOrgType: ''});
        }
        console.log("orgType val: " + this.state.orgType);
    }

    onKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.onSubmitRegister();
        }
    };

    onSubmitRegister = () => {
        if(this.validateInput()) {
            // Send data to next register page
            console.log("Sending data to next register page.");
            this.props.updateRegisterState({'orgType': this.state.orgType});
            this.props.triggerParentChangeRoute('register2');
            //setTimeout(this.showServerValidationOutput, 500);
        }
    };

    validateInput = () => {
        console.log("Validation");
        console.log("this.state.orgType: " + this.state.orgType);
        let okStatus = true;
        if(!this.state.orgType || this.state.orgType === 0) {
            console.log("Empty orgType");
            this.setState({errorMsgOrgType: 'Rodzaj organizacji musi zostać wybrany.'});
            okStatus = false;
        } else {
            this.setState({errorMsgOrgType: ''});
        }
        console.log("Returning validation status: " + okStatus);
        return okStatus;
    };

    render() {
        return (
            <div>
                <article className="br3 ba b--black-10 mv4 w-80 w-60-m w-40-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0 center">
                                <legend className="f1-l f2-m f2 fw6 ph0 mh0">Rejestracja 1/3</legend>
                                <div className="mt3">
                                    <a style={errorMsgStyle2}>{this.state.msgServer}</a>
                                    <label className="db fw6 lh-copy f5" htmlFor="email-address">Rodzaj Organizacji</label>
                                    <Select
                                        options={this.state.orgTypesOptions[0] !== undefined ? this.state.orgTypesOptions : defaultOptions}
                                        placeholder="Wybierz..."
                                        onChange={this.handleChangeOrgType.bind(this)}
                                    />
                                    <div className="mt1">
                                        <a style={errorMsgStyle}>{this.state.errorMsgOrgType}</a>
                                    </div>
                                </div>
                                <div className="center mt3">
                                    <input
                                        onKeyDown={this.onKeyDown}
                                        onClick={this.onSubmitRegister}
                                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                                        type="submit"
                                        value="Przejdź dalej"
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

export default RegisterPage1;