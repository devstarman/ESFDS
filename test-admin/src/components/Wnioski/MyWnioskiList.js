import React from 'react';
import { List, Datagrid, TextField, DateField, NumberField, BooleanField, ReferenceField } from 'react-admin';
import MoneyField from '../CustomFields/MoneyField';

export const MyWnioskiList = props => (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="nazwaprojektu" label="Nazwa projektu" />
        <ReferenceField label="Organizacja" source="organizacjaid" reference="organisations" >
          <TextField source="name" />
        </ReferenceField>
        <MoneyField source="kwotawnioskowana" label="Kwota wnioskowana" />
        <MoneyField source="kwotazinnychzrodel" label="Kwota z innych źródeł" />
        <MoneyField source="kwotaogolem" label="Kwota ogółem" />
        <DateField source="datawprowadzenia" label="Data wprowadzenia" />
        <BooleanField source="weryfikacjaprezesa" label="Weryfikacja Prezesa" />
        <BooleanField source="weryfikacjaopiekuna" label="Weryfikacja Opiekuna" />
      </Datagrid>
    </List>
);