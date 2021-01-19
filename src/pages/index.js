import React, { useState } from "react"

import Select from 'react-select';

import { Layout } from "../components/layout"
import { IconSelect } from "../components/icon-select"
import SEO from "../components/seo"

import style from "../styles/index.module.scss"

const BEST_CO2_TIMES = {
  'it': '12:30'
}

// TODO add localization support

const IndexPage = () => {
    // TODO move to config
    const countryOptions = [
      { value: 'it', label: 'Italy' },
    ]

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedConsumption, setSelectedConsumption] = useState(null);
  
    return (
    <Layout contentClassName={style.index}>
      <SEO title="Home" />
      <section >
        <h1>Welcome on Carbon Alt!</h1>
        <p>On this platform we want to share awarness about the connection between carbon dioxide emissions and electricity consumption.
          Would you like to know more about carbon dioxide effects?
          Check our <a href="/facts">facts</a> section!
        </p>

        <p>
        Start selecting your area! 
        Check which will be the “greenest hour” of today, the hour when the electricity production will cause less emission,
        and discover how much you would emit today using your household appliances!
        </p>
      </section>

      <section>
        <h1>CO&#8322; Usage Calculator</h1>

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
              // TODO move to config file
              {name: 'washing-machine', consumption: 1.05},
              {name: 'laptop', consumption: 0.30},
              {name: 'hair-dryer', consumption: 0.84},
              {name: 'mobile-phone', consumption: 0.06},
              {name: 'laptop-charging', consumption: 0.60},
              {name: 'dishwasher', consumption: 0.65},
              {name: 'vacuum-cleaner', consumption: 1.50},
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
