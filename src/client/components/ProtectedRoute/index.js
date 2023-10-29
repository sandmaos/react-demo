import { Navigate, useLocation, useParams } from 'react-router-dom';
import { cloneElement } from 'react';
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
    //the deconstruct of children property <props,state,...>children</>
    const token = localStorage.getItem('token');
    const urlPath = useLocation().pathname;
    const urlParams = useParams();
    const currPage = useSelector(state => state.cardReducer.currPage);

    //sign in/up page
    if (/signin/.test(urlPath) || /signup/.test(urlPath) || /forget_pwd/.test(urlPath)) {
        if (token !== null) //already signned in
            return <Navigate to={'/'} />;
        else
            return <>{children}</>;
    }

    //home page
    if (/home/.test(urlPath)) {
        const pageParam = urlParams.page;
        if (pageParam && (isNaN(pageParam * 1) || pageParam * 1 > currPage)) {
            return <Navigate to={'/error'} state={{ errorState: 'Page not available' }} />;
        }
        else
            return <>{children}</>
    }

    if (/addCard/.test(urlPath)) {
        if (token === null) //not signned in
            return <Navigate to={'/'} />;
        else
            return <>{children}</>;
    }

    if (/update_pwd/.test(urlPath)) {
        const jwtStr = urlPath.split('/').slice(-1)[0];
        const jwtDecode = jwt_decode(jwtStr)
        if (jwtDecode.exp < Math.floor(Date.now() / 1000))
            return <Navigate to={'/error'} state={{ errorState: 'Token expired!' }} />;
        return cloneElement(children, { username: jwtDecode.username });
    }
}