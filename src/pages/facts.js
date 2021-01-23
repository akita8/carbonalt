import React from "react"

import { graphql } from "gatsby"
import Img from "gatsby-image"

import { Layout } from "../components/layout"
import SEO from "../components/seo"

import style from "../styles/facts.module.scss"


const FactsPage = ({data}) => (
  <Layout>
    <SEO title="Facts" />
    <article className={style.facts}>
      <section>
        <h1>CO&#8322; emissions</h1>

        <p>
          To tackle global climate change it is crucial to reduce green-house gas emissions. 
          Among these pollutants, one of the main gases produced by humans is CO&#8322;, carbon dioxide.
          This gas is mostly emitted for energy production such as engine functioning, electricity and district heating. 
          As a result CO&#8322; concentration in the atmosphere has increased of 30% in the last 60 years due to human activities. 
        </p>

        <div className={style.image}>
          <Img  fixed={data.file.childImageSharp.fixed} />
        </div>

        <p className={style.citation}>Image from NASA 2020</p>

        <p>
          Carbon dioxide abundance leads to a warmer temperature in the atmosphere.
          Higher temperature would increase sea level due to ice melting and would provoke more extreme weather events such as hurricanes and heatwaves.
          Moreover, accumulation of CO&#8322; in the water raises its acidity, damaging aquatic environment and reducing our water availability. 
          One way to face this problem is to reduce the emissions at their source.
        </p>

        <div className={style.citation}>
          <p>Reference: Al‐Ghussain, L. (2019), Global warming: review on driving forces and mitigation. Environ Prog Sustainable Energy, 38: 13-21.
            <cite><a href="https://doi.org/10.1002/ep.13041">doi: 10.1002/ep.13041</a></cite>
          </p>
        </div>
      </section>

      <section>
        <h1>Our project</h1>

        <p>
          With CarbonAlt we aim to inform people about the link between the carbon dioxide release and the electricity consumption.
          Moreover, we are suggesting to change electricity consumption in order to reduce CO&#8322; emissions. 
          Depending on the geographical area, hour and time of the year the electricity production mix changes: in some moments we produce electricity with almost zero emissions!
          What if we could see how much CO&#8322; we are emitting with electrical appliances? What if we could choose to use our appliances when electricity consumption emits less?
        </p>

        <p>
          Have you ever wondered how much you would emit now using your washing machine? And with your pc?
          Would you change when to use your hair-dryer to reduce CO&#8322; emissions?
        </p>

        <p>Be part of the change!</p>

      </section>
    </article>
  </Layout>
)

export const query = graphql`
  query {
    file(relativePath: { eq: "temperatures.jpeg" }) {
      childImageSharp {
        fixed(width: 313, height: 259) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default FactsPage
