import React, { useEffect, useState } from 'react';
import './App.css';
import AddData from './AddData';

export default function App() {
  const [data, setData] = useState([
    { id: 0, name: '周杰伦', age: '45' },
    { id: 43, name: '藤原拓海', age: '25' },
    { id: 98, name: '茂木夏树', age: '24' },
  ]);
  const [edit, setEdit] = useState({});

  const handleAgeChange = (newAge, id) => {
    setData(preVal => preVal.map(item =>
      item.id === id ? { ...item, age: newAge } : item))
  }

  const toggleEdit = (id) => {
    setEdit({ ...edit, [id]: !edit[id] });
  }

  const addPerson = (person) => {
    setData(preVal => (
      [...preVal, { ...person, id: data[data.length - 1].id + 1 }]
    ))
  }

  const cellStyle = {
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'space-between', 
  };


  useEffect(() => {
    setEdit(data.reduce((acc, item) => {
      acc[item.id] = false;
      return acc
    }, {}))
  }, [])


  return (
    <div className='app'>
      <div className='table-container'>
        <table className='table'>
          <thead className='table-head'>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>age</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item) =>
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <div style={cellStyle}>
                      {
                        edit[item.id] ? <input type="number" value={item.age} onChange={(e) => handleAgeChange(e.target.value, item.id)} />
                          : <>{item.age}</>
                      }
                      <button onClick={() => toggleEdit(item.id)}>
                        {edit[item.id] ? 'Done' : 'Edit'}
                      </button>
                    </div>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
        <AddData addPerson={addPerson} />
      </div>
    </div>
  )
}
