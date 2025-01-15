import React, { useState } from 'react'

export default function AddData({ addPerson }) {
    const [person, setPerson] = useState({ name: '', age: '' });
    const handlePersonInfo = (e) => {
        setPerson(preVal => (
            { ...preVal, [e.target.name]: e.target.value }
        ))
    }

    const handleAddPerson = () => {
        if (person.name === '' || person.age === '' || person.age * 1 < 0)
            return
        addPerson(person);
        setPerson({ name: '', age: '' });
    }

    return (
        <div className='add-container'>

            <legend>
                name:&nbsp;<input name='name' value={person.name} onChange={(e) => handlePersonInfo(e)} />
            </legend>
            <legend>
                age:&nbsp;<input name='age' type='number' value={person.age} onChange={(e) => handlePersonInfo(e)} />
            </legend>
            <button onClick={handleAddPerson}>Add</button>
        </div>
    )
}
