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
let defaultOrgNamesOptions = [{value: 0, label: " "}];
let defaultOrgRolesOptions = [{value: 0, label: " "}];
let defaultFacultiesOptions = [{value: 0, label: " "}];

class RegisterPage2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orgType: 0,
            orgNameId: 0,
            orgRoleId: 0,
            facultyId: 0,
            errorMsgOrgNameId: '',
            errorMsgOrgRoleId: '',
            errorMsgFacultyId: '',
            errorServer: '',
            orgNames: [],
            orgRoles: [],
            faculties: [],
            orgNamesOptions: [],
            orgRolesOptions: [],
            facultiesOptions: [],
        }
    }

    async componentDidMount() {
        let orgType = this.props.getValueFromState('orgType');
        const request1 = new Request(API_URL+'/organisationNames', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({orgTypeId: orgType}),
        });
        await fetch(request1)
            .then(response => {
                return response.json();
            })
            .then(async (myJson) => {
                if(myJson[0] !== undefined) {
                    this.setState({
                        orgNames: myJson
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
        for(let i = 0; i < this.state.orgNames.length; i++) {
            this.state.orgNamesOptions[i] = {
                value: this.state.orgNames[i].id,
                label: this.state.orgNames[i].name };
        }
        const request2 = new Request(API_URL+'/organisationRoles', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({orgTypeId: orgType}),
        });
        await fetch(request2)
            .then(response => {
                return response.json();
            })
            .then(async (myJson) => {
                if(myJson[0] !== undefined) {
                    this.setState({
                        orgRoles: myJson
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
        for(let i = 0; i < this.state.orgRoles.length; i++) {
            this.state.orgRolesOptions[i] = {
                value: this.state.orgRoles[i].id,
                label: this.state.orgRoles[i].organisationrole };
        }
        const request3 = new Request(API_URL+'/faculties', {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        await fetch(request3)
            .then(response => {
                return response.json();
            })
            .then(async (myJson) => {
                if(myJson[0] !== undefined) {
                    this.setState({
                        faculties: myJson
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
        for(let i = 0; i < this.state.faculties.length; i++) {
            this.state.facultiesOptions[i] = {
                value: this.state.faculties[i].id,
                label: this.state.faculties[i].name };
        }
        this.forceUpdate();
    }

    componentWillMount() {
        document.addEventListener("keydown", this.onKeyDown);
    }

    async handleChangeOrgNameId(val) {
        // updating value
        await this.setState({orgNameId: val.value});
        // checking if clearing error msg is needed
        if(this.state.errorMsgOrgNameId !== '' && this.state.orgNameId !== 0) {
            console.log('clearing error msg');
            this.setState({errorMsgOrgNameId: ''});
        }
        console.log("orgNameId val: " + this.state.orgNameId);
    }

    async handleChangeOrgRoleId(val) {
        // updating value
        await this.setState({orgRoleId: val.value});
        // checking if clearing error msg is needed
        if(this.state.errorMsgOrgRoleId !== '' && this.state.orgRoleId !== 0) {
            console.log('clearing error msg');
            this.setState({errorMsgOrgRoleId: ''});
        }
        console.log("orgRoleId val: " + this.state.orgRoleId);
    }

    async handleChangeFacultyId(val) {
        // updating value
        await this.setState({facultyId: val.value});
        // checking if clearing error msg is needed
        if(this.state.errorMsgFacultyId !== '' && this.state.facultyId !== 0) {
            console.log('clearing error msg');
            this.setState({errorMsgFacultyId: ''});
        }
        console.log("facultyId val: " + this.state.facultyId);
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
            this.props.updateRegisterState({
                orgNameId: this.state.orgNameId,
                orgRoleId: this.state.orgRoleId,
                facultyId: this.state.facultyId,
            });
            this.props.triggerParentChangeRoute('register3');
        }
    };

    validateInput = () => {
        console.log("Validation");
        console.log("this.state.orgNameId: " + this.state.orgNameId);
        console.log("this.state.orgRoleId: " + this.state.orgRoleId);
        console.log("this.state.facultyId: " + this.state.facultyId);
        let okStatus = true;
        if(!this.state.orgNameId || this.state.orgNameId === 0) {
            console.log("Empty orgNameId");
            this.setState({errorMsgOrgNameId: 'Nazwa organizacji musi zostać wybrana.'});
            okStatus = false;
        } else {
            this.setState({errorMsgOrgNameId: ''});
        }
        if(!this.state.orgRoleId || this.state.orgRoleId === 0) {
            console.log("Empty orgRoleId");
            this.setState({errorMsgOrgRoleId: 'Rola w organizacji musi zostać wybrana.'});
            okStatus = false;
        } else {
            this.setState({errorMsgOrgRoleId: ''});
        }
        if(!this.state.facultyId || this.state.facultyId === 0) {
            console.log("Empty facultyId");
            this.setState({errorMsgFacultyId: 'Wydział musi zostać wybrany.'});
            okStatus = false;
        } else {
            this.setState({errorMsgFacultyId: ''});
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
                                <legend className="f1-l f2-m f2 fw6 ph0 mh0">Rejestracja 2/3</legend>
                                <div className="mt3">
                                    <a style={errorMsgStyle2}>{this.state.msgServer}</a>
                                    <label className="db fw6 lh-copy f5" htmlFor="email-address">Nazwa Organizacji</label>
                                    <Select
                                        options={this.state.orgNamesOptions[0] !== undefined ? this.state.orgNamesOptions : defaultOrgNamesOptions}
                                        placeholder="Wybierz..."
                                        onChange={this.handleChangeOrgNameId.bind(this)}
                                    />
                                    <div className="mt1">
                                        <a style={errorMsgStyle}>{this.state.errorMsgOrgNameId}</a>
                                    </div>
                                    <label className="db fw6 lh-copy f5" htmlFor="email-address">Rola w organizacji</label>
                                    <Select
                                        options={this.state.orgRolesOptions[0] !== undefined ? this.state.orgRolesOptions : defaultOrgRolesOptions}
                                        placeholder="Wybierz..."
                                        onChange={this.handleChangeOrgRoleId.bind(this)}
                                    />
                                    <div className="mt1">
                                        <a style={errorMsgStyle}>{this.state.errorMsgOrgRoleId}</a>
                                    </div>
                                    <label className="db fw6 lh-copy f5" htmlFor="email-address">Wydział</label>
                                    <Select
                                        options={this.state.facultiesOptions[0] !== undefined ? this.state.facultiesOptions : defaultFacultiesOptions}
                                        placeholder="Wybierz..."
                                        onChange={this.handleChangeFacultyId.bind(this)}
                                    />
                                    <div className="mt1">
                                        <a style={errorMsgStyle}>{this.state.errorMsgFacultyId}</a>
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

export default RegisterPage2;