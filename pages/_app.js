import React from 'react';
import { RecoilRoot } from 'recoil';
import { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import { UserProvider } from '@auth0/nextjs-auth0';
// import { DebugObserver } from 'components/DebugObserver';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: Futura, Helvetica, Arial, sans-serif;
  }

  p {
    margin: 0;
  }
`;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <RecoilRoot>
      <UserProvider>
        <GlobalStyle />
        {/* <DebugObserver /> */}
        <Component {...pageProps} key={router.asPath} />
      </UserProvider>
    </RecoilRoot>
  );
}

export default MyApp;
