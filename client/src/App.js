import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [search, setSearch] = useState('');

  async function callBackendAPI() {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  const submit = () => {
    axios({
      method: 'post',
      url: '/osu',
      data: {
        search: search,
      },
    }).then((res) => console.log(res));
  };

  useEffect(() => {
    callBackendAPI()
      .then((res) => setData({ data: res.express }))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>{data.data}</h1>
      <button onClick={() => callBackendAPI()}>Backend Connect</button>
      <input onChange={(e) => setSearch(e.target.value)}></input>
      <button onClick={() => submit()}>Submit</button>
    </>
  );
}

export default App;
