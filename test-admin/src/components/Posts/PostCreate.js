import React from 'react';
import { Edit, Create, SimpleForm, ReferenceInput, TextInput, SelectInput, DisabledInput, LongTextInput } from 'react-admin';

export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Create>
);