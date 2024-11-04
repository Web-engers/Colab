import React from 'react';

const Shapes = () => {
  return (
    <div className=' flex flex-col'>
      <button onClick={addRectange}>Rectangle</button>
      <button>Circle</button>
      <button>Triangle</button>
    </div>
  );
};

export default Shapes;
