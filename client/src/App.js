import logo from './logo.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input } from '@chakra-ui/react';

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
      <Button onClick={() => callBackendAPI()}>Backend Connect</Button>
      <Input onChange={(e) => setSearch(e.target.value)}></Input>
      <Button onClick={() => submit()}>Submit</Button>
    </>
  );
}

export default App;
