import React from 'react';
import { Route } from 'react-router-dom';
import profile from './components/profile';
import statistics from './components/statistics';
import RegisterPage1 from './components/RegisterPage/RegisterPage1';
import RegisterPage2 from './components/RegisterPage/RegisterPage2';
import RegisterPage3 from './components/RegisterPage/RegisterPage3';

export default [
    <Route
        key="my-profile"
        path="/my-profile"
        component={profile.edit}
        />,
    <Route
        key="statistics"
        path="/statistics"
        component={statistics.page}
    />
];