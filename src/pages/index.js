import React, { useState } from "react"

import Select from 'react-select';

import { Layout } from "../components/layout"
import { IconSelect } from "../components/icon-select"
import SEO from "../components/seo"

// https://www.gatsbyjs.com/plugins/gatsby-plugin-react-svg/
//import { ReactComponent as WashingMachine } from '../icons/washing-machine.svg';

import style from "../styles/index.module.scss"

const BEST_CO2_TIMES = {
  'it': '12:30'
}


const IndexPage = () => {
    const countryOptions = [
      { value: 'it', label: 'Italy' },
    ]

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedConsumption, setSelectedConsumption] = useState(null);
  
    return (
    <Layout contentClassName={style.index}>
      <SEO title="Home" />
      <section className={style.page}>
        <h1>Co2 Usage Calculator</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <div className={style.countrySelector}>
          <label>Choose your country:</label>
          <Select
            onChange={(v) => setSelectedCountry(v.value)}
            className={style.selector} options={countryOptions}
          />
        </div>
        {
          selectedCountry &&
          <div className={style.bestTime}>
            <p>
              Today emissions derived from electricity production are at
              the minimum at:
            </p>
            <span>{BEST_CO2_TIMES[selectedCountry]}</span>
          </div>
        }
        <div className={style.applianceSelector}>
          <p>
            Pick your appliance:
          </p>
          <IconSelect options={[
              {value: 'wm', iconName: 'washing-machine', consumption: 1.05},
              {value: 'pc', iconName: 'laptop', consumption: 0.30},
              {value: 'ph', iconName: 'phon', consumption: 0.84},
              {value: 'a', iconName: 'phon', consumption: 0.06},
              {value: 'c', iconName: 'phon', consumption: 0.60},
              {value: 'd', iconName: 'phon', consumption: 0.65},
              {value: 'v', iconName: 'phon', consumption: 1.50},
            ]}
            onChange={o => setSelectedConsumption(o.consumption)}/>
            {
              selectedConsumption &&
              <>
                <p>The appliance of your choice has an average consumption of [kWh]:</p>
                <input type="number" value={selectedConsumption}></input>
              </>
            }

        </div>
      </section>
    </Layout>
  );
}

export default IndexPage
