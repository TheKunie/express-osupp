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
  Text,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { RenderData } from './Render';
import { CheckIcon, CloseIcon, RepeatIcon } from '@chakra-ui/icons';

function App() {
  const [data, setData] = useState({ data: false });
  const [search, setSearch] = useState('');
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const [toast, setToast] = useState(false);

  function callBackendAPI() {
    axios
      .get('/express_backend')
      .then((res) => {
        if (res.status === 200) {
          setData({ data: true });
        } else {
          setData({ data: false });
        }
      })
      .catch((err) => setData({ data: false }));

    /*     if (response.status !== 200) {
      throw Error(body.message);
    }
    setData({ data: true }); */
    return null;
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
    callBackendAPI(); //.catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setInfo({});
  }, [search]);

  useEffect(() => {
    if (!('user_id' in info) && info !== {}) {
      setToast(true);
    }
  }, [info]);

  return (
    <>
      <Container centerContent>
        <Stack spacing={6}>
          <Center>
            <HStack>
              <Text fontSize="xl">Backend connection status: </Text>
              {data.data ? (
                <CheckIcon color="green" />
              ) : (
                <CloseIcon color="red" />
              )}
              <IconButton
                onClick={() => callBackendAPI()}
                icon={<RepeatIcon color="blue" />}
              />
            </HStack>
          </Center>

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
          <RenderData data={info} toast={toast} />
        </Stack>
      </Container>
    </>
  );
}

export default App;
