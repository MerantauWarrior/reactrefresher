import React from 'react';

function List({songs, song}) {
  const tracks = songs.map((item, i) =>
    <li style={{marginBottom: "4px", padding: "8px", color: "white", backgroundColor: "gray"}} key={i}
        onClick={()=>song(i)}>{item}</li>
  )
  return (
    <>
      <div>List</div>
      <ul>
        {tracks}
      </ul>
    </>
  );
}

export default List;
