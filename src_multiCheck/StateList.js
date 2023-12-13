import React from 'react';

export default function StateList({ handleChecked, states, checked }) {
    return (
        <>
            {
                states.map((state) =>
                    <div
                        key={state.abbreviation}
                        className={'checked-' + (checked[state.abbreviation] === true ? 'confirm' : '')}>
                        <input
                            checked={checked[state.abbreviation]}
                            onChange={(e) => handleChecked({
                                [state.abbreviation]: e.target.checked
                            })}
                            id={state.abbreviation} type='checkbox' />
                        <label htmlFor={state.abbreviation}>{state.name}</label>
                    </div>
                )
            }
        </>
    )
}
