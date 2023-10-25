import React from 'react'
import { useParams } from 'react-router-dom'

export default function Detail() {
    const { id,title,content}=useParams();
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
