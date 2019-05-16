import React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';


export const MyUserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="entries" />
            <TextField source="joined" />
            <TextField source="isverified" />
        </Datagrid>
    </List>
);