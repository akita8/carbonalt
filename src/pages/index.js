import React from "react"

import { Layout } from "../components/layout"
import SEO from "../components/seo"
import { Card }  from "../components/card"

import style from "../styles/index.module.scss"

const IndexPage = () => (
  <Layout contentClassName={style.index}>
    <SEO title="Home" />
    <section>
      
    </section>
  </Layout>
)

export default IndexPage
