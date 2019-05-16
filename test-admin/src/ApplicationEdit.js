import React from 'react';
import { Edit, BooleanField, TextField, ReferenceField, NumberInput, NumberField, DateInput, SimpleForm, TextInput, DisabledInput, LongTextInput } from 'react-admin';

const uuid = () => {
  return 'AAA';
};

export const ApplicationEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <NumberField source="id" />
            <ReferenceField source="autorid" reference="users" label="Autor">
                <TextField source="name" optionText="name" />
            </ReferenceField>
            <TextInput source="nazwa" />
            <NumberInput source="wnioskowanakwota" />
            <LongTextInput source="opis" />
            <DateInput source="datawprowadzenia" />
            <BooleanField source="czyzweryfikowany" />
        </SimpleForm>
    </Edit>
);