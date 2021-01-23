import React from "react"

import { Layout } from "../components/layout"
import SEO from "../components/seo"

const LinksPage = () => (
  <Layout>
    <SEO title="Links" />
    <article>
      <section>
        <h1>Credits</h1>
        <p>
          This project starts from an idea born during the Climate KIC Journey 2020
          and has been financed by the Climate KIC Alumni PGM Micro-award of the&nbsp;
          <a target="_blank" rel="noreferrer" href="https://www.climate-kic.org/">Climate KIC</a>,
          project of the European Institute of Innovation and Technology
          (<a target="_blank" rel="noreferrer" href="https://eit.europa.eu/">EIT</a>).
        </p>
        <p>This website has been built with <a target="_blank" rel="noreferrer" href="https://www.gatsbyjs.com/">Gatsby</a>.</p>
        <p>Icons by <a target="_blank" rel="noreferrer" href="https://www.svgrepo.com/">svgrepo</a>. </p>
      </section>
      <section>
        <h1>Sources</h1>
        <p>
          Data used for the forecast of electricity production mix are obtained
          by the European Network of Transmission System Operators for Electricity
          (<a target="_blank" rel="noreferrer" href="https://www.entsoe.eu/data/power-stats/">ENTSOE</a>).</p>
        <p>
          Emission factors for each energy production plant are derived from the 2018
          report of italian Superior Institution for Protection and Environmental Research
          (<a target="_blank" rel="noreferrer" href="https://isprambiente.gov.it">ISPRA</a>).
        </p>
        <p>
          For the average consumption of household appliances have been taken
          data from "Quanto consumano gli elettrodomestici?"
          (<a target="_blank" rel="noreferrer" href="https://luce-gas.it">luce-gas.it</a>).
        </p>
      </section>
    </article>
  </Layout>
)

export default LinksPage
