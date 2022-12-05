import type { AppProps } from 'next/app';

import '../styles/globals.css';
import 'reactflow/dist/style.css';
import "../styles/globals.css";

import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import ProgressBar from '@components/ProgressBar';
import Head from "next/head";
import GlobalToastSettings from '@components/GlobalToastSettings';
import { useRouter } from 'next/router';
import SideNavBarLayout from '@layouts/SideNavBarLayout';
import ThemeProvider from '@contexts/ThemeProviderContext';
import { appWithTranslation } from 'next-i18next'
import { I18nextProvider } from "react-i18next";


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const SideNavBarExcludePageList = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
]
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)


  const { pathname } = useRouter();
  const isSideNavBarExcludedPage = SideNavBarExcludePageList.includes(pathname)

  return (
    <ThemeProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ProgressBar />
      <GlobalToastSettings />
      {isSideNavBarExcludedPage && getLayout(<Component {...pageProps} />)}
      {/* Render page with SideNavBarComponent */}
      {!isSideNavBarExcludedPage && <SideNavBarLayout> {getLayout(<Component {...pageProps} />)}</SideNavBarLayout>}
      {/* <AuthorizedUrqlProvider> */}
      {/* </AuthorizedUrqlProvider> */}

    </ThemeProvider>
  )
}

export default MyApp
