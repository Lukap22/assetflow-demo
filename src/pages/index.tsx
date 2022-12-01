

import Flow from 'components/flow'
import { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'
import {appWithTranslation, useTranslation} from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {getTranslation} from "../util/i18n";
import {GetStaticProps} from "next";

export const getStaticProps: GetStaticProps = async function getStaticProps({ locale }) {
  const translations = await getTranslation(locale, ['common', 'nav']);
  return {
    props: {
      ...translations,
    }
  }
}

const Page: NextPageWithLayout = () => {
  const { t } = useTranslation('nav')
  return <Flow />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Page />
}
export default appWithTranslation(Page)