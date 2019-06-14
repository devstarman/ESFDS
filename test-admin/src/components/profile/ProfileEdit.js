// in profile/EditProfile.jso
import React from 'react';
import { Edit, TextInput, TabbedForm, FormTab, required } from 'react-admin';
import { withStyles } from '@material-ui/core';
import { Toolbar, SaveButton } from 'react-admin';

const toolbarStyles = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

const CustomToolbar = withStyles(toolbarStyles)(props => (
    <Toolbar {...props}>
        <SaveButton />
    </Toolbar>
));

const ProfileEdit = ({ staticContext, ...props }) => {
    const userId = localStorage.getItem('userId');
    return (
        <Edit
            id={userId}
            resource="profile"
            basePath="/my-profile"
            title="Profil"
            redirect={false}
            {...props}
        >
            <TabbedForm toolbar={<CustomToolbar />}>
                <FormTab label="Podsatowe">
                    <TextInput source="name" label="Imie" validate={required()} />
                    <TextInput source="surname" label="Nazwisko" validate={required()} />
                    <TextInput source="email" type="email" label="Adres e-mail" validate={required()} />
                    <TextInput source="mobilenumber" label="Numer telefonu" validate={required()} />
                </FormTab>
                <FormTab label="Hasło">
                    <TextInput source="password" defaultValue="" style={{paddingTop: 10}} type="password" label="Hasło" validate={required()} />
                    <TextInput source="password2" defaultValue="" style={{paddingTop: 10}} type="password" label="Powtórz hasło" validate={required()} />
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

export default ProfileEdit;