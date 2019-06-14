import React from 'react';
import { List, Datagrid, TextField, DateField, NumberField, BooleanField, ReferenceField, EditButton, Filter, TextInput } from 'react-admin';
import MoneyField from '../CustomFields/MoneyField';
import PDFButton from './PDFButton';

const WniosekFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Wyszukaj po nazwie" source="nazwaprojektu" alwaysOn />
    </Filter>
);

export const MyWnioskiList = props => (
    <List title="Wnioski" bulkActionButtons={false} filters={<WniosekFilter/>} {...props}>
      <Datagrid>
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
        <EditButton />
        <PDFButton />
      </Datagrid>
    </List>
);