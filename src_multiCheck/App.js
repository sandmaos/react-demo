import React, { useState } from 'react'
import './App.css';
import StateList from './StateList';
import states from './data';

export default function App() {
  const [isDrop, setIsDrop] = useState(false);
  const [checked, setChecked] = useState(
    states.reduce((prev, state) => ({ ...prev, [state.abbreviation]: false }), {})
  );
  const total = Object.values(checked).filter(item => item === true).length;
  
  const handleChecked = (item) => {
    setChecked({ ...checked, ...item })
  }

  return (
    <>
      <div className='app'>
        <div className='state-dropdown'>
          {
            isDrop ? `Selected: ${total}` : 'Choose your state'
          }
          <button onClick={() => setIsDrop(preVal => !preVal)}>
            {
              isDrop ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                </svg>
            }
          </button>
        </div>
        {
          isDrop &&
          <div className='state-list'>
            <StateList handleChecked={handleChecked} states={states} checked={checked} />
          </div>
        }
      </div>
    </>
  )
}
