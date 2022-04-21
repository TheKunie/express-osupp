import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Input,
  Stack,
  Heading,
  Container,
  SimpleGrid,
  HStack,
  Divider,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { RenderData } from './Render';

function App() {
  const [data, setData] = useState({});
  const [search, setSearch] = useState('');
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);

  async function callBackendAPI() {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  const submit = () => {
    setLoading(true);
    axios({
      method: 'post',
      url: '/osu',
      data: {
        search: search,
      },
    }).then((res) => setInfo(res.data));
    setLoading(false);
  };

  useEffect(() => {
    callBackendAPI()
      .then((res) => setData({ data: res.express }))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Container centerContent>
        <Stack spacing={6}>
          <Heading as="h1">{data.data}</Heading>
          <Button onClick={() => callBackendAPI()}>Backend Connect</Button>
          <Input onChange={(e) => setSearch(e.target.value)}></Input>
          <HStack divider={<Divider orientation="vertical" />} justify="center">
            <Button onClick={() => submit()} colorScheme="green">
              Submit
            </Button>
            <Button onClick={() => submit()} variant="outline">
              Refresh
            </Button>
          </HStack>
          {loading ? (
            <Center>
              <Spinner />
            </Center>
          ) : null}
          <RenderData data={info} />
        </Stack>
      </Container>
    </>
  );
}

export default App;
