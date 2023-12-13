import React, { useState } from 'react'
import { metaData, familyData } from './data.js'

export default function App() {
  return (
    <>
      <MetaTree data={metaData} />
      <hr />
      <FamilyTree data={familyData} />
    </>
  )
}

function MetaTree({ data }) {
  const [isVisable, setIsVisable] = useState(Array(data.length).fill(false));
  return (
    <>
      <ul>
        {
          data.map((item, key) =>
            <li key={key}>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => setIsVisable({
                  ...isVisable,
                  [key]: !isVisable[key]
                }
                )}
              >
                {item.name}
              </span>
              {
                isVisable[key] && item.children ?
                  <MetaTree data={item.children} />
                  :
                  <></>
              }
            </li>
          )
        }
      </ul>
    </>
  )
}

function FamilyTree({ data }) {
  const [isVisable, setIsVisable] = useState(false);
  return (
    <ul>
      <li>
        <span style={{ cursor: 'pointer' }} onClick={() => setIsVisable(preVal => !preVal)}>
          {data.name}
        </span>
      </li>
      {
        isVisable &&
        data.children?.map((child, idx) =>
          <span key={idx}>
            <FamilyTree data={child} />
          </span>
        )
      }
    </ul>
  )
}
