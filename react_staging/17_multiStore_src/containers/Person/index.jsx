import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createPersonAction } from '../../redux/actions/person'

function Person(props) {
    const [inputName, setInputName] = useState('');
    const [inputAge, setInputAge] = useState(0);
    const addPerson = () => {
        const personObj = { id: Date.now(), name: inputName, age: inputAge };
        props.patch(personObj);

    }

    return (
        <div>
            <input value={inputName} type="text" placeholder='name' onChange={(e) => { setInputName(e.target.value) }}></input>
            <input value={inputAge} type="text" placeholder='age' onChange={(e) => { setInputAge(e.target.value) }}></input>
            <button onClick={addPerson}>add</button>
            <ul>
                {
                    props.state.map((person) =>
                        <li key={person.id}>name: {person.name} -- age: {person.age}</li>
                    )
                }
            </ul>
        </div>
    )
}

function a(state) {
    return ({ state: state.PERSONS })
}

function b(dispatch) {
    return {
        patch: (data) => {
            dispatch(createPersonAction(data))
        }
    }
}

export default connect(a, b)(Person)