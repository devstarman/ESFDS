import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';

import Dashboard  from './components/MyLoginPage/Dashboard';
import dataProvider from './providers/dataProvider';
import authProvider from './providers/authProvider';
import { MyUserList } from './MyUserList';
import { MyWnioskiList } from './MyWnioskiList';
import { WniosekCreate } from "./WniosekCreate";
import { ApplicationEdit } from './ApplicationEdit';
import MyLoginPage from './components/MyLoginPage/MyLoginPage';

const API_URL = 'http://localhost:3000';

const knownResources = [
    <Resource name="users" list={MyUserList} edit={EditGuesser} />,
    <Resource name="wnioski" list={MyWnioskiList} edit={EditGuesser} create={WniosekCreate} />,
    <Resource name="organisations" />
];

const fetchResources = permissions =>
    fetch(API_URL+'/resources', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({roleId: permissions}),
    })
        .then(response => response.json())
        .then(json => knownResources.filter(resource => json.resources.includes(resource.props.name)))
        .catch(err => console.log("error: " + err));


const App = () => (
    <Admin loginPage={MyLoginPage} dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
        {fetchResources}
    </Admin>
);

export default App;

//<Resource name="users" list={MyUserList} />
//<Resource name="wnioski" list={MyWnioskiList} edit={ApplicationEdit} create={WniosekCreate} />

//console.log("A: " + knownResources.filter(resource => resources.includes(resource.props.name)));
//knownResources.filter(resource => resources.includes(resource.props.name));