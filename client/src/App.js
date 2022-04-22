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
import { CheckIcon } from '@chakra-ui/icons';

function App() {
  const [data, setData] = useState({});
  const [search, setSearch] = useState('');
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [noUser, setNoUser] = useState(false);

  async function callBackendAPI() {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  const submit = () => {
    setInfo({});
    setLoading(true);
    axios({
      method: 'post',
      url: '/osu',
      data: {
        search: search,
      },
    }).then((res) => {
      if ('user_found' in res.data) {
        setNoUser(true);
        setLoading(false);
        return null;
      }
      if (noUser) {
        setNoUser(false);
      }
      setInfo(res.data);
    });
    setLoading(false);
  };

  useEffect(() => {
    callBackendAPI()
      .then((res) => setData({ data: res.connected }))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setInfo({});
  }, [search]);

  return (
    <>
      <Container centerContent>
        <Stack spacing={6}>
          {data.data ? <CheckIcon color="green" /> : null}
          <Button onClick={() => callBackendAPI()}>Backend Connect</Button>
          <Input onChange={(e) => setSearch(e.target.value)}></Input>
          <HStack divider={<Divider orientation="vertical" />} justify="center">
            <Button onClick={() => submit()} colorScheme="green">
              Submit
            </Button>
            <Button onClick={() => console.log(data)} variant="outline">
              Refresh
            </Button>
          </HStack>
          {noUser ? (
            <Center>
              <Heading as="h3">No User Found</Heading>
            </Center>
          ) : null}
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
