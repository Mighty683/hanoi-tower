import React, { useState } from 'react';
import { HanoiTower } from './components/HanoiTower';

function App() {
  const [numberOfRings, setNumberOfRings] = useState(8);
  const [time, setTime] = useState(200);
  const [start, setStart] = useState(false);
  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '500px',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div>
        <label>
          Number of rings:
        </label>
        <input value={numberOfRings} type="number" onChange={e => {
          setNumberOfRings(Number(e.target.value));
          setStart(false);
        }} />
      </div>
      <div>
        <label>
          Time in ms for one step:
        </label>
        <input value={time} type="number" onChange={e => {
          setTime(Number(e.target.value));
          setStart(false);
        }} />
      </div>
      <button onClick={() => setStart(!start)}>Show/Hide</button>
      {start && <HanoiTower numberOfRings={numberOfRings} time={time} />}
    </div>
  );
}

export default App;
