import React from 'react';
import { List, Datagrid, TextField, EmailField, NumberField, DateField, BooleanField, ReferenceField, EditButton, SingleFieldList, ChipField } from 'react-admin';

const FullNameField = ({ record = {} }) => <span>{record.name} {record.surname}</span>;
FullNameField.defaultProps = { label: 'Autor' };

export const KonkursyList = props => (
    <List title="Konkursy" bulkActionButtons={false} {...props}>
        <Datagrid rowClick="edit">
            <TextField label="Id" source="id" />
            <ReferenceField label="Komisja" source="komisjaid" reference="organisations" linkType={false} >
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Typ konkursu" source="typkonkursu" reference="typykonkursow" linkType={false} >
                <TextField source="typkonkursu" />
            </ReferenceField>
            <DateField source="czasrozpoczecia" label="Czas rozpoczęcia" showTime
                       options={{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }} />
            <DateField source="czaszakonczenia" label="Czas zakończenia" showTime
                       options={{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }} />
            <ReferenceField label="Autor" source="autorid" reference="users" >
                <FullNameField source="surname" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);