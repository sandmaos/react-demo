import React, { } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from "../pages/App"
import SignUpPage from "../pages/signup/SignUpPage"
import LogInPage from "../pages/login/LogInPage"
import HeaderNav from '../pages/HeaderNav/index';
import FlashMessageList from '../pages/flash/FlashMessageList';
import MyForm from "../pages/form"

const AppRouter = () => {
    return (
        <Router>
            <HeaderNav />
            <FlashMessageList />
            <Routes>
                <Route exact path="/" Component={App}></Route>
                <Route path="/signup" Component={SignUpPage}></Route>
                <Route path="/login" Component={LogInPage}></Route>
            </Routes>
            <MyForm />
        </Router>
    );
}
export default AppRouter;
