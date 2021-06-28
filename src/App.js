import React, { useState, useEffect, useRef } from 'react';
import './style.css';

export default function App() {
  const URL = 'https://jsonplaceholder.typicode.com/posts/';
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const myID = useRef();

  const loadData = () => {
    return fetch(
      `https://jsonplaceholder.typicode.com/posts/${myID.current.value}`,
      {
        method: 'GET'
      }
    )
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  const hanldeChange = e => {
    loadData().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData(data);
      }
    });
    e.preventDefault();
  };

  return (
    <div>
      <div>
        <label>Enter Id</label>
        <form onSubmit={hanldeChange}>
          <input type="text" ref={myID} />
          <button type="submit">OK</button>
        </form>
      </div>
      <div>
        <div className="card">
          <div className="id">
            <div> id: {data.id}</div>
            <div>userId: {data.userId}</div>
          </div>
          <div className="title">Title: {data.title}</div>
          <div className="body"> Body: {data.body}</div>
        </div>
      </div>
    </div>
  );
}
