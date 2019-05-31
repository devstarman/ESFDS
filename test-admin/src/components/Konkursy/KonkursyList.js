import React from 'react';
import { List, Datagrid, TextField, EmailField, NumberField, DateField, BooleanField, ReferenceField, EditButton } from 'react-admin';


export const KonkursyList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <NumberField source="autorid" label="ID Autora" />
            <NumberField source="komisjaid" label="ID Komisji" />
            <NumberField source="typkonkursu" label="Typ konkursu" />
            <DateField source="czasrozpoczecia" label="Data rozpoczęcia" />
            <DateField source="czaszakonczenia" label="Data zakończenia" />
        </Datagrid>
    </List>
);