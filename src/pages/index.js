import React, { useState, useEffect } from "react"
import classnames from 'classnames'

import Select from 'react-select';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import { Layout } from "../components/layout"
import { IconSelect } from "../components/icon-select"
import SEO from "../components/seo"

import style from "../styles/index.module.scss"

const BEST_CO2_TIMES = {
  'it': '12:30'
}

const APPLIANCE_OPTIONS = [
  // TODO move to config file
  {name: 'washing-machine', consumption: 1.05},
  {name: 'laptop', consumption: 0.30},
  {name: 'hair-dryer', consumption: 0.84},
  {name: 'mobile-phone', consumption: 0.06},
  {name: 'laptop-charging', consumption: 0.60},
  {name: 'dishwasher', consumption: 0.65},
  {name: 'vacuum-cleaner', consumption: 1.50},
];

// const CO2_PRODUCTION_FOR_KWH = [
//   {name: 'fossil_coal_derived_gas', produced: 1498.40},
//   {name: 'fossil_gas', produced: 368.3},
//   {name: 'fossil_hard_coal', produced: 870},
//   {name: 'fossil_oil', produced: 548.9},
//   {name: 'waste', produced: 133.3},
// ]

// TODO add localization support

const IndexPage = () => {
    // TODO move to config
    const countryOptions = [
      { value: 'it', label: 'Italy' },
    ]

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedConsumption, setSelectedConsumption] = useState('');
    const [timeFrom, setTimeFrom] = useState(null);
    const [timeTo, setTimeTo] = useState(null);
    const [co2Produced, setCo2Produced] = useState(null);


    useEffect(() => {
      if (selectedCountry && selectedConsumption && timeFrom && timeTo) setCo2Produced(69);
    }, [selectedCountry, selectedConsumption, timeFrom, timeTo])

    return (
    <Layout>
      <article className={style.index}>
        <SEO title="Home" />
        <section >
          <h1>Welcome!</h1>
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
            <div className={style.results}>
              <p>
                Today emissions derived from electricity production are at
                the minimum at:
              </p>
              <span>{BEST_CO2_TIMES[selectedCountry]}</span>
            </div>
          }
          <div className={style.applianceSelector}>

            <p>Insert the average consumption of your appliance of your choice [kWh]:</p>

            <input type="number" onChange={e => setSelectedConsumption(e.target.value)} value={selectedConsumption}></input>

            <p>Or choose one of our predefined profiles:</p>

            <IconSelect
              selectedConsumption={selectedConsumption}
              options={APPLIANCE_OPTIONS}
              onChange={o => setSelectedConsumption(o.consumption)}/>

            <p>Select period of today usage:</p>

            <div className={style.periodSelect}>
              {/* TODO add validation */}
              <div className={style.picker}>
                <span>From:</span>
                <TimePicker
                  showSecond={false}
                  onChange={t => setTimeFrom(t)}
                />
              </div>
              <div className={style.picker}>
                <span>To:</span>
                <TimePicker
                  showSecond={false}
                  onChange={t => setTimeTo(t)}
                />
              </div>
            </div>
            
            {
              co2Produced &&
              <div className={classnames(style.results, style.co2Results)}>
                <p>The total amount of CO&#8322; emitted for the indicated consumption is:</p>
                <span>{co2Produced} g</span>
              </div>
            }
          </div>
        </section>
      </article>
    </Layout>
  );
}

export default IndexPage
