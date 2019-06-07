import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin';

const API_URL = 'http://localhost:3000';

export default (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        console.log("AUTH_LOGIN");
        const { username, password } = params;
        const request = new Request(API_URL+'/authenticate', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        console.log("AUTH_LOGIN2");
        return fetch(request)
            .then(response => {
                console.log("AUTH_LOGIN3");
                return response.json();
            })
            .then((myJson) => {
                console.log("myJson.token =" + myJson.token);
                console.log("myJson.msg =" + myJson.msg);
                if(myJson.roleId !== undefined && myJson.userId !== undefined) {
                    console.log("roleId = " + myJson.roleId);
                    console.log("userId = " + myJson.userId);
                    console.log("orgId = " + myJson.orgId);
                    localStorage.setItem('roleId', myJson.roleId);
                    localStorage.setItem('userId', myJson.userId);
                    localStorage.setItem('orgId', myJson.orgId);
                    localStorage.removeItem('loginError');
                    return Promise.resolve(); // testing
                } else {
                    console.log("Login error: " + myJson.msg);
                    localStorage.setItem('loginError', myJson.msg);
                    return Promise.reject(''); // this is strange
                    //return Promise.reject(myJson.msg); // giving some unpleasent notifications at login
                    //throw new Error(myJson.msg); // not working?
                }
            });
    }
    if(type === AUTH_GET_PERMISSIONS) {
        console.log("params: " + params);
        console.log("params: " + type);
        console.log("params: " + JSON.stringify(params));
        if(params !== undefined && params.location !== undefined) {
            console.log("currentLocation: " + params.location);
            localStorage.setItem('currentLocation', params.location);
        }
        const permissions = localStorage.getItem('roleId');
        console.log("AUTH_GET_PERMISSIONS, returning roleId = " + permissions);
        return permissions ? Promise.resolve(permissions) : Promise.reject();
    }
    if (type === AUTH_LOGOUT) {
        console.log("AUTH_LOGOUT");
        //good place to inform API that user logout
        localStorage.removeItem('roleId');
        localStorage.removeItem('userId');
        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        console.log("AUTH_ERROR (API returned status" + status + " )");
        if (status === 401 || status === 403) {
            localStorage.removeItem('roleId');
            localStorage.removeItem('userId');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    // It's called even during navigation from /login route after successful login so you should watch what u're doing then
    if (type === AUTH_CHECK) {
        //For the AUTH_CHECK call, the params argument contains the resource name, so you can implement different checks for different resources (e.g. if(params.resource === 'users') {}
        console.log("AUTH_CHECK");
        console.log("roleId = " + localStorage.getItem('roleId'));
        console.log("orgId = " + localStorage.getItem('orgId'));
        return localStorage.getItem('roleId')
            ? Promise.resolve()
            : Promise.reject();
    }
    return Promise.reject('Unknown method');
};