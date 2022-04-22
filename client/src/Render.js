import { useState } from 'react';
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
} from '@chakra-ui/react';

export function RenderData(props) {
  var data = props.data;

  if (!('user_id' in data)) {
    return null;
  }
  return (
    <>
      <Box>
        <Divider />
        <Center>
          <Heading as="h2">{data.username}</Heading>
        </Center>
        <Center>
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
      </Box>
    </>
  );
}
