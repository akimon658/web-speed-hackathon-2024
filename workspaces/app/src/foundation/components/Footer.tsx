import { useSetAtom } from 'jotai';
import React, { useId } from 'react';
import styled from 'styled-components';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { Color, Space, Typography } from '../styles/variables';

import { Box } from './Box';
import { Button } from './Button';
import { Flex } from './Flex';
import { Spacer } from './Spacer';
import { Text } from './Text';

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

const _Content = styled.section`
  white-space: pre-line;
`;

export const Footer: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const termDialogA11yId = useId();
  const contactDialogA11yId = useId();
  const questionDialogA11yId = useId();
  const companyDialogA11yId = useId();
  const overviewDialogA11yId = useId();

  const updateDialogContent = useSetAtom(DialogContentAtom);

  const handleRequestToDialogOpen = async (endpoint: string, dialogA11yId: string, title: string) => {
    updateDialogContent(
      <_Content aria-labelledby={dialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={dialogA11yId} typography={Typography.NORMAL16}>
          {title}
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          ロード中...
        </Text>
      </_Content>,
    )

    const response = await fetch(endpoint);
    const { text } = await response.json();

    updateDialogContent(
      <_Content aria-labelledby={dialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={dialogA11yId} typography={Typography.NORMAL16}>
          {title}
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {text}
        </Text>
      </_Content>,
    );
  };

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" src="/assets/cyber-toon.svg" />
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <_Button disabled={!isClient} onClick={() => handleRequestToDialogOpen('/term', termDialogA11yId, '利用規約')}>
            利用規約
          </_Button>
          <_Button disabled={!isClient} onClick={() => handleRequestToDialogOpen('/contact', contactDialogA11yId, 'お問い合わせ')}>
            お問い合わせ
          </_Button>
          <_Button disabled={!isClient} onClick={() => handleRequestToDialogOpen('/question', questionDialogA11yId, 'Q&A')}>
            Q&A
          </_Button>
          <_Button disabled={!isClient} onClick={() => handleRequestToDialogOpen('/company', companyDialogA11yId, '運営会社')}>
            運営会社
          </_Button>
          <_Button disabled={!isClient} onClick={() => handleRequestToDialogOpen('/overview', overviewDialogA11yId, 'Cyber TOONとは')}>
            Cyber TOONとは
          </_Button>
        </Flex>
      </Flex>
    </Box>
  );
};
