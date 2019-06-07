import React from 'react';
import { Edit, Create, TabbedForm, FormTab, ArrayInput, SimpleFormIterator, DateTimeInput, SimpleForm, ReferenceInput, NumberInput, TextInput, SelectInput, DisabledInput, LongTextInput } from 'react-admin';

export const KonkursCreate = props => (
    <Create title="Stwórz konkurs" {...props}>
        <SimpleForm redirect="list">
            <ReferenceInput label="Komisja" source="komisjaid" reference="organisations" >
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput label="Typ konkursu" source="typkonkursu" reference="typykonkursow" >
                <SelectInput optionText="typkonkursu" />
            </ReferenceInput>
            <DateTimeInput source="czasrozpoczecia" label="Czas rozpoczęcia" />
            <DateTimeInput source="czaszakonczenia" label="Czas zakończenia" />
        </SimpleForm>
    </Create>
);