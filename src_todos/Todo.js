import { Checkbox } from '@mui/material';
import React from 'react'

export default function Todo(props) {
    const { id, name, done, handleDelete, handleFinish } = props;
    return (
        <div>
            {name}&nbsp;&nbsp;
            done:{done ? 'true' : 'false'}&nbsp;&nbsp;
            <button onClick={() => handleDelete(id)}>delete</button>
            <input
                type="checkbox"
                checked={done}
                onChange={() => handleFinish(id)} />
        </div>
    )
}
