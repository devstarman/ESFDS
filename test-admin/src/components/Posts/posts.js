import React from 'react';
import { Edit, SimpleForm, ReferenceInput, TextInput, SelectInput, DisabledInput, LongTextInput, Toolbar, SaveButton } from 'react-admin';

const PostEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);

export const PostEdit = props => (
    <Edit {...props}>
        <SimpleForm toolbar={<PostEditToolbar/>}>
            <DisabledInput source="id" />
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Edit>
);