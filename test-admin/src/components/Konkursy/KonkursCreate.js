import React from 'react';
import { Edit, Create, TabbedForm, FormTab, ArrayInput, SimpleFormIterator, DateInput, SimpleForm, ReferenceInput, NumberInput, TextInput, SelectInput, DisabledInput, LongTextInput } from 'react-admin';

export const KonkursCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <NumberInput source="komisjaid" label="Komisja" />
            <NumberInput source="typkonkursu" label="Typ konkursu" />
            <DateInput source="czasrozpoczecia" label="Czas rozpoczęcia" />
            <DateInput source="czaszakonczenia" label="Czas zakończenia" />
        </SimpleForm>
    </Create>
);