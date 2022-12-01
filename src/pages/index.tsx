

import Flow from 'components/Flow'
import { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'

const Page: NextPageWithLayout = () => {
  return <Flow />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Page />
}

export default Page