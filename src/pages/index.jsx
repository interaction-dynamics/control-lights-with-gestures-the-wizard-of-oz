import React from 'react'

import Layout from '~organisms/layout'
import Footer from '~molecules/footer'
import Light from '~molecules/light'

const IndexPage = () => (
  <Layout className="flex flex-col items-stretch">
    <div className="p-6 flex-auto">
      <Light name="all" className="pb-8" />

      <Light name="light 1" />
      <Light name="light 2" />
    </div>
    <Footer />
  </Layout>
)

export default IndexPage
