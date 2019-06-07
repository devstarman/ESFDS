import React from 'react';
import { List, Datagrid, TextField, EmailField, NumberField, DateField, BooleanField, ReferenceField, EditButton } from 'react-admin';

export const MyUserList = ({permissions, ...props}) => (
    <List title="Użytkownicy" bulkActionButtons={false} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Imie" />
            <TextField source="surname" label="Nazwisko" />
            <EmailField source="email" label="E-mail" />
            <NumberField source="mobilenumber" label="Telefon" />
            <ReferenceField label="Organizacja" source="organisationid" reference="organisations">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Uprawnienia" source="organisationroleid" reference="organisationroles">
                <TextField source="organisationrole" />
            </ReferenceField>
            <BooleanField source="isverified" label="Weryfikacja e-mail" />
            <BooleanField source="isacceptedbyadmin" label="Weryfikacja konta" />
            <DateField source="joined" label="Data dołączenia" />
            {(permissions == 1 || permissions == 4) ? <EditButton /> : <TextField />}
        </Datagrid>
    </List>
);