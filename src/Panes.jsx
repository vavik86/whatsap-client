import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';

export let Panes = styled.main({
  display: 'flex',
  width: '100vw',
  height: '100vh',
  backgroundColor: '#F8F8F8',
  fontSize: '16px'
});

let Header = styled.header({
  backgroundColor: 'lavenderblush ',
  padding: '0'
});

let Body = styled.div({
  overflow: 'hidden',
  height:'100%'
});

let Container = styled.div(props => ({
  display: 'flex',
  flexDirection: 'column',
  ...props
}));

let Footer = styled.div({
  paddingLeft: '0',
  width: '65vw'
});

export function Pane({ width, minWidth, header, body, footer, lastScroll }) {

  let ref = useRef(null);

  useEffect(() => {
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [lastScroll])

  return <Container {...{ width, minWidth }}>
    <Header>{header}</Header>
    <Body ref={ref} >{body}</Body>
    {footer && <Footer>{footer}</Footer>}
  </Container>
}