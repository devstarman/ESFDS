import React, { Component } from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, DateInput, BooleanInput, ReferenceInput, SelectInput, TextField, ReferenceField } from 'react-admin';

let API_URL = 'http://localhost:3000';

class UserEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            choices: [
                        { "id": 1, "organisationrole": "Prezes", "organisationtypeid": 3 },
                        { "id": 2, "organisationrole": "Przewodniczący", "organisationtypeid": 1 }
            ],
            defaultChoice: 1,
        }
    }

    componentDidMount() {
        console.log("componentDidMount()");
        this.fetchDataFromServer();
    }

    fetchDataFromServer = () => {
        console.log("Fetching data from server.");
        console.log("this.props = " + this.props.id);
        const request = new Request(API_URL+'/organisationroles/'+this.props.id, {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        fetch(request)
            .then(response => {
                return response.json();
            }).then((json) => {
                this.setState({
                    choices: json,
                    defaultChoice: json[0]["id"],
                });
            });
    };

    render() {
        const {...props} = this.props;
        return (
        <Edit title="Edytuj użytkownika" {...props}>
            <SimpleForm>
                <TextField source="name" label="Imie" />
                <TextField source="surname" label="Nazwisko" />
                <ReferenceField label="Organizacja" source="organisationid" reference="organisations" >
                    <TextField source="name" />
                </ReferenceField>
                <SelectInput
                    source="torganisationroleid" //t prefix for proper display
                    label="Uprawnienia"
                    optionText="organisationrole"
                    optionValue="id"
                    choices={this.state.choices}
                    defaultValue={this.state.defaultChoice}
                />
                <BooleanInput source="isacceptedbyadmin" label="Weryfikacja konta" />
            </SimpleForm>
        </Edit>
        );
    }

}

export default UserEdit;