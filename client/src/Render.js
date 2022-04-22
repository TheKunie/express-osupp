import { useState, useEffect } from 'react';
import {
  Divider,
  Image,
  Box,
  Heading,
  HStack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Center,
  useToast,
} from '@chakra-ui/react';
/* 
()=> alert({
  title: 'User not found.',
  description: 'Please try again.',
  status: 'error',
  duration: 9000,
  isClosable: true,
}) */

export function RenderData(props) {
  var data = props.data;

  const toast = props.toast;
  const alert = useToast();

  if (!('user_id' in data)) {
    return null;
  }

  return (
    <>
      <Box>
        <Divider />
        {toast ? null : null}
        <Center>
          <Heading as="h2">{data.username}</Heading>
        </Center>
        <Center>
          <HStack>
            <Box
              h={128}
              w={128 * 3}
              borderWidth="2px"
              borderRadius="lg"
              overflow="hidden"
            >
              <HStack
                align="center"
                divider={
                  <Center height="128px">
                    <Divider orientation="vertical" />
                  </Center>
                }
              >
                <Image
                  boxSize="128px"
                  src={'http://s.ppy.sh/a/' + data.user_id}
                />
                <Stat align="center">
                  <StatLabel>PP (Performance Points)</StatLabel>
                  <StatNumber>{data.pp_raw}</StatNumber>
                </Stat>
                <Stat align="center">
                  <StatLabel>Accuracy</StatLabel>
                  <StatNumber>
                    {Math.round(data.accuracy * 100) / 100 + '%'}
                  </StatNumber>
                </Stat>
              </HStack>
            </Box>
          </HStack>
        </Center>
        <HStack>
          <Box h={128} borderWidth="2px" borderRadius="lg" overflow="hidden">
            <HStack
              align="center"
              divider={
                <Center height="128px">
                  <Divider orientation="vertical" />
                </Center>
              }
            >
              <Stat align="center">
                <StatLabel>PP (Performance Points)</StatLabel>
                <StatNumber>{data.pp_raw}</StatNumber>
              </Stat>
              <Stat align="center">
                <StatLabel>PP (Performance Points)</StatLabel>
                <StatNumber>{data.pp_raw}</StatNumber>
              </Stat>
              <Stat align="center">
                <StatLabel>PP (Performance Points)</StatLabel>
                <StatNumber>{data.pp_raw}</StatNumber>
              </Stat>
            </HStack>
          </Box>
        </HStack>
      </Box>
    </>
  );
}
