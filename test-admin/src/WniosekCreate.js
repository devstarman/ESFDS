import React from 'react';
import { Edit, Create, TabbedForm, FormTab, ArrayInput, SimpleFormIterator, DateInput, SimpleForm, ReferenceInput, NumberInput, TextInput, SelectInput, DisabledInput, LongTextInput } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import IdAuthorField from './IdAuthorField';

export const WniosekCreate = props => (
    <Create {...props}>
        <TabbedForm redirect="list">
            <FormTab label="Opis projektu">
                <TextInput source="nazwaprojektu" label="Nazwa projektu" />
                <RichTextInput source="opisprojektu"
                               label="Tematyka i opis projektu" />
                <RichTextInput source="planowanytermin"
                               label="Planowany termin i miejsce (jeżeli dotyczy) realizacji projektu" />
                <RichTextInput source="celprojektu"
                               label="Cel projektu" />
                <RichTextInput source="zasoby"
                               label="Informacja o zasobach niezbędnych do realizacji projektu (lokalowych,
                                      technicznych, kadrowych) wraz z koncepcją ich pozyskania" />
                <RichTextInput source="wykazrealizacji"
                               label="Wykaz realizacji wnioskowanego projektu w latach poprzednich" />
                <RichTextInput source="wspolpraca"
                               label="Współpraca organizacyjna z innymi podmiotami" />
                <RichTextInput source="grupaodbiorcow"
                               label="Docelowa grupa odbiorców projektu" />
                <RichTextInput source="strategiasponsorow"
                               label="Opis strategii pozyskiwania sponsorów" />
                <RichTextInput source="promocjaprojektu"
                               label="Planowane działania promocyjne projektu" />
                <RichTextInput source="aktualnystan"
                               label="Aktualny stan zaawansowania projektu lub powiązania z innymi projektami" />
            </FormTab>
            <FormTab label="Osoby odpowiedzialne">
                <ArrayInput source="osobyodpowiedzialne" label="Osoby odpowiedzialne">
                    <SimpleFormIterator>
                        <TextInput source="imienazwisko" label="Imię i nazwisko" />
                        <TextInput source="wydzial" label="Wydział" />
                        <TextInput source="nrindeksu" label="Nr indeksu" />
                        <TextInput source="email" label="E-mail" />
                        <TextInput source="telefon" label="Telefon" />
                        <TextInput source="typ" label="Funkcja w projekcie" />
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
            <FormTab label="Doświadczenie zespołu">
                <ArrayInput source="doswiadczeniezespolu" label="Doświadczenie zespołu">
                    <SimpleFormIterator>
                        <TextInput source="nazwaprojektu" label="Nazwa projektu" />
                        <TextInput source="pelnionafunkcja" label="Pełniona funkcja" />
                        <TextInput source="budzet" label="Budżet" />
                        <DateInput source="datawydarzenia" label="Data wydarzenia" />
                        <TextInput source="imienazwisko" label="Imię i nazwisko członka zespołu" />
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
            <FormTab label="Harmonogram realizacji">
                <ArrayInput source="pozycjeharmonogramu" label="Harmonogram realizacji">
                    <SimpleFormIterator>
                        <TextInput source="pozycja" label="Pozycja" />
                        <DateInput source="datarozpoczecia" label="Data rozpoczęcia" />
                        <DateInput source="datazakonczenia" label="Data zakończenia" />
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
            <FormTab label="Skład zespołu">
                <ArrayInput source="realizatorzyprojektu" label="Skład zespołu">
                    <SimpleFormIterator>
                        <TextInput source="imienazwisko" label="Imię i nazwisko" />
                        <TextInput source="funkcja" label="Funkcja" />
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
            <FormTab label="Kosztorys">
                <TextInput source="kwotawnioskowana" label="Kwota wnioskowana" />
                <TextInput source="srodkiinnepwr" label="Kwota z innych środków z PWr" />
                <TextInput source="umowysponsorskie" label="Kwota z umów sponsorskich" />
                <TextInput source="wplatyuczestnikow" label="Kwota z wpłat uczestników" />
                <TextInput source="grantydotacje" label="Kwota z grantów, dotacji itd." />
                <TextInput source="kwotazinnychogolem" label="Kwota z innych źródeł ogółem" />
                <TextInput source="kwotaogolem" label="Kwota ogółem" />
            </FormTab>
            <FormTab label="Koła Naukowe" >
                <RichTextInput source="rezultatbadawczy" label="Przewidywany rezultat badawczy projektu" />
                <RichTextInput source="upowszechnienie" label="Planowane upowszechnienie uzyskanych wyników" />
                <RichTextInput source="umiejetnosci" label="Umiejętności zdobyte przez studentów organizujących projekt" />
                <RichTextInput source="innowacyjnosc" label="Innowacyjność projektu" />
            </FormTab>
        </TabbedForm>
    </Create>
);