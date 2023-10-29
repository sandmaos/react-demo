import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate();

    return (
        <>
            <div className="page-header">
                <h2>React Router Demo</h2>
            </div>
            <button onClick={() => navigate(-1)}>{'<'}</button>
            &nbsp;
            <button onClick={() => navigate(1)}>{'>'}</button>
        </>
    )
}
