import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute( {children} ) {
    //the deconstruct of children property <props,state,...>children</>
    const token = localStorage.getItem('token');
    const urlPath = useLocation().pathname;

    //sign in/up page
    if (/signin/.test(urlPath) || /signup/.test(urlPath)) {
        if (token !== null) //already signned in
            return <Navigate to={'/'} />;
        else
            return <>{children}</>;
    }

    if (/addCard/.test(urlPath)) {
        if (token === null) //not signned in
            return <Navigate to={'/'} />;
        else
            return <>{children}</>;
    }
}