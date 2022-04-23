import { useEffect, useState, useMemo } from 'react';
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
  const [data, setData] = useState({ data: false }); // connection status
  const [search, setSearch] = useState(''); // search query
  const [info, setInfo] = useState({}); // user data
  const [loading, setLoading] = useState(false); // loading indicator boolean
  const [noUser, setNoUser] = useState(false); // no user found boolean
  const [toast, setToast] = useState(false); // no user found alert boolean
  const [refresh, setRefresh] = useState(false); // refresh button render boolean
  const [invalid, setInvalid] = useState(false); // input invalid boolean

  var debounce = require('lodash.debounce');
  var isequal = require('lodash.isequal');

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

    if (!isequal(search, '')) {
      submit();
    }
  }, [search]);

  useEffect(() => {
    if (!isequal(info, {})) {
      setToast(true);
      setRefresh(true);
    }
  }, [info]);

  const debouncedSubmit = useMemo(
    () => debounce((e) => setSearch(e.target.value), 300),
    []
  );

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

          <Input
            onChange={debouncedSubmit}
            disabled={data.data ? false : true}
            isInvalid={invalid ? true : false}
          ></Input>
          <HStack divider={<Divider orientation="vertical" />} justify="center">
            {refresh ? (
              <Button
                onClick={() => console.log(data)}
                disabled={data.data ? false : true}
                variant="outline"
              >
                Refresh
              </Button>
            ) : null}
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
