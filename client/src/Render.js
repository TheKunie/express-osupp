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
  var keys = require('lodash.keys');
  var isequal = require('lodash.isequal');

  const toast = props.toast;
  const alert = useToast();

  if (isequal(data, {})) {
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
            <Image
              htmlHeight={128}
              htmlWidth={128}
              src={'http://s.ppy.sh/a/' + data.user_id}
            />
            <Box h={128} borderWidth="2px" borderRadius="lg" overflow="hidden">
              <HStack
                align="center"
                divider={
                  <Center height="128px">
                    <Divider orientation="vertical" />
                  </Center>
                }
              >
                <Box w={128}>
                  <Stat align="center">
                    <StatLabel>PP (Performance Points)</StatLabel>
                    <StatNumber>{data.pp_raw}</StatNumber>
                  </Stat>
                </Box>
                <Box w={128}>
                  <Stat align="center">
                    <StatLabel>Accuracy</StatLabel>
                    <StatNumber>
                      {Math.round(data.accuracy * 100) / 100 + '%'}
                    </StatNumber>
                  </Stat>
                </Box>
              </HStack>
            </Box>
          </HStack>
        </Center>
        <br />
        <Divider />
        <br />
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
              <Box w={128}>
                <Stat align="center">
                  <StatLabel>Rank (World)</StatLabel>
                  <StatNumber>{'#' + data.pp_rank}</StatNumber>
                </Stat>
              </Box>
              <Box w={128}>
                <Stat align="center">
                  <StatLabel>Rank (Local)</StatLabel>
                  <StatNumber>{'#' + data.pp_country_rank}</StatNumber>
                </Stat>
              </Box>
              <Box w={128}>
                <Stat align="center">
                  <StatLabel>Country</StatLabel>
                  <StatNumber>{data.country}</StatNumber>
                </Stat>
              </Box>
            </HStack>
          </Box>
        </HStack>
      </Box>
    </>
  );
}
