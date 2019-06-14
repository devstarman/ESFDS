import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';

import Dashboard  from './components/MyLoginPage/Dashboard';
import dataProvider from './providers/dataProvider';
import authProvider from './providers/authProvider';
import { MyUserList } from './components/Users/MyUserList';
import  UserEdit  from './components/Users/UserEdit';
import { MyWnioskiList } from './components/Wnioski/MyWnioskiList';
import { WniosekCreate } from "./components/Wnioski/WniosekCreate";
import { KonkursyList } from "./components/Konkursy/KonkursyList";
import { KonkursCreate } from "./components/Konkursy/KonkursCreate";
import { KonkursEdit } from "./components/Konkursy/KonkursEdit";
import MyLoginPage from './components/MyLoginPage/MyLoginPage';
import customRoutes from './customRoutes';
import MyLayout from './MyLayout';

const API_URL = 'http://localhost:3000'; //h

const knownResources = [
    <Resource name="users" list={MyUserList} edit={UserEdit} options={{ label: 'Użytkownicy' }} />,
    <Resource name="wnioski" list={MyWnioskiList} edit={EditGuesser} create={WniosekCreate} options={{ label: 'Wnioski' }} />,
    <Resource name="konkursy" list={KonkursyList} edit={KonkursEdit} create={KonkursCreate} options={{ label: 'Konkursy' }} />,
    <Resource name="organisations" />,
    <Resource name="organisationroles" />,
    <Resource name="typykonkursow" />,
    <Resource name="profile" />,
    <Resource name="statistics" />
];

const fetchResources = permissions =>
    fetch(API_URL+'/resources', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({roleId: permissions}),
    })
        .then(response => response.json())
        .then(json => {
            console.log("json status: " + json.status);
            if(json.status !== undefined && json.status === 'guest') {
                console.log('guest');
                return ( <MyLoginPage /> );
            } else {
                console.log("USER resources: " + JSON.stringify(json));
                return knownResources.filter(resource => json.resources.includes(resource.props.name));
            }
        })
        .catch(err => console.log("error: " + err));


const App = () => (
    <Admin appLayout={MyLayout} customRoutes={customRoutes} loginPage={MyLoginPage} dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
        {fetchResources}
    </Admin>
);

export default App;

//<Resource name="users" list={MyUserList} />
//<Resource name="wnioski" list={MyWnioskiList} edit={ApplicationEdit} create={WniosekCreate} />

//console.log("A: " + knownResources.filter(resource => resources.includes(resource.props.name)));
//knownResources.filter(resource => resources.includes(resource.props.name));