import React from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'

export default function Detail() {
    const [search, setSearch] = useSearchParams();
    const id = search.get('id');
    const title = search.get('title');
    const content = search.get('content');
    return (
        <div>
            <ul>
                <li>{id}</li>
                <li>{title}</li>
                <li>{content}</li>
            </ul>
        </div>
    )
}
