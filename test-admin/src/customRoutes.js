import React from 'react';
import { Route } from 'react-router-dom';
import RegisterPage1 from './components/RegisterPage/RegisterPage1';
import RegisterPage2 from './components/RegisterPage/RegisterPage2';
import RegisterPage3 from './components/RegisterPage/RegisterPage3';

export default [
    <Route exact path="/register1" component={RegisterPage1} />,
    <Route exact path="/register2" component={RegisterPage2} />,
    <Route exact path="/register3" component={RegisterPage3} noLayout />,
];