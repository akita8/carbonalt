import React, { useState, useEffect } from "react"
import classnames from 'classnames'
import { Link } from "gatsby"
import { graphql } from 'gatsby'
import Select from 'react-select'
import DateTimePicker from 'react-datetime-picker'
import { FormattedTime, FormattedDate } from 'react-intl'

import { Layout } from "../components/layout"
import { IconSelect } from "../components/icon-select"
import SEO from "../components/seo"

import style from "../styles/index.module.scss"

// TODO move this constants to config file

const APPLIANCE_OPTIONS = [
  {name: 'washing-machine', consumption: 1.05},
  {name: 'laptop', consumption: 0.30},
  {name: 'hair-dryer', consumption: 0.84},
  {name: 'mobile-phone', consumption: 0.60},
  {name: 'laptop-charging', consumption: 0.06},
  {name: 'dishwasher', consumption: 0.65},
  {name: 'vacuum-cleaner', consumption: 1.50},
];

const COUNTRY_OPTIONS = [
  { value: 'it', label: 'Italy' },
]

const CO2_PRODUCTION_FOR_KWH = [
  {name: 'fossil_coal_derived_gas', produced: 1498.40},
  {name: 'fossil_gas', produced: 368.3},
  {name: 'fossil_hard_coal', produced: 870},
  {name: 'fossil_oil', produced: 548.9},
  {name: 'waste', produced: 133.3},
  {name: 'non_polluting', produced: 0}
]

// TODO add localization support

const IndexPage = ({data}) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedConsumption, setSelectedConsumption] = useState('');
    const [timeFrom, setTimeFrom] = useState();
    const [timeTo, setTimeTo] = useState(null);
    const [lastTime, setLastTime] = useState(null);
    const [co2Series, setCo2Series] = useState(null);    
    const [applianceCo2, setApplianceCo2] = useState(null);
    const [timeRangeError, setTimeRangeError] = useState(null);


    useEffect(() => {
      if (co2Series && co2Series[co2Series.length - 1].time) {
        const last = new Date(co2Series[co2Series.length - 1].time.getTime() + 3599000);
        setLastTime(last);
      }
    }, [co2Series])

    useEffect(() => {
      if (selectedCountry && data.allDataJson.edges[0].node?.predictions) {
        const energySources = new Map(CO2_PRODUCTION_FOR_KWH.map(p => [p.name, {produced: p.produced}]));
        const nonPollutingSources = energySources.get("non_polluting");
        const selected = data.allDataJson.edges[0].node.predictions.find(p => p.country);
        const selectedPrediction = [...selected.prediction]
        for (let i = 0; i < selectedPrediction.length; i++) {
          if (energySources.has(selectedPrediction[i].label)) {
            energySources.set(
              selectedPrediction[i].label,
              {...energySources.get(selectedPrediction[i].label), values: selectedPrediction[i].values}
            )
          } else {
            if (nonPollutingSources.values) {
              for (let j = 0; j < selectedPrediction[i].values.length; j++) {
                nonPollutingSources.values[j] += selectedPrediction[i].values[j]
              }
            } else {
              nonPollutingSources.values = selectedPrediction[i].values;
            }
          }
        }
        let totalEnergy;
        for (const source of energySources.values()) {
          if (!totalEnergy) {
            totalEnergy = [...source.values];
          } else {
            for (let i = 0; i < source.values.length; i++) {
              totalEnergy[i] += source.values[i];
            }
          }
        }
        const co2Produced = [];
        const startTime = new Date(Date.parse(selected.startTime));
        for (const source of energySources.values()) {
          for (let i = 0; i < source.values.length; i++) {
            const sourceFraction = source.values[i] / totalEnergy[i];
            const fractionCo2 = sourceFraction * source.produced;
            if (typeof co2Produced[i] === "undefined") {
              co2Produced.push({
                value: fractionCo2,
                time: new Date(startTime.getTime() + i * 3600000)
              });
            } else {
              co2Produced[i].value += fractionCo2;
            }
          }
        }
        setCo2Series(co2Produced);
      }
    }, [selectedCountry, data.allDataJson])

    useEffect(() => {
      if (co2Series && timeTo && timeFrom) {
        if (timeFrom < co2Series[0].time || timeTo > lastTime || timeTo <= timeFrom) {
          setApplianceCo2(null)
          setTimeRangeError(true);
          return;
        } else setTimeRangeError(false);
      }
    }, [co2Series, selectedConsumption, timeFrom, timeTo, lastTime])

    useEffect(() => { 
      if (co2Series && selectedConsumption  && timeFrom && timeTo && !timeRangeError && timeRangeError != null) {
        const startIndex =  co2Series.findIndex(p => p.time > timeFrom) - 1;
        const endIndex = co2Series.findIndex(p => p.time > timeTo) - 1;
        if (startIndex === endIndex) {
          setApplianceCo2((timeTo.getMinutes() - timeFrom.getMinutes()) * ((selectedConsumption * co2Series[endIndex].value) / 60));
        } else {
          let produced = (60 - timeFrom.getMinutes()) * ((selectedConsumption * co2Series[startIndex].value) / 60);
          for (let i = startIndex + 1; i < endIndex; i++) {
            produced += selectedConsumption * co2Series[i].value;
          }
          produced += timeTo.getMinutes() * ((selectedConsumption * co2Series[endIndex].value) / 60);
          setApplianceCo2(produced);
        }
      } else setApplianceCo2(null);
    }, [co2Series, selectedConsumption, timeFrom, timeTo, timeRangeError])

    return (
    <Layout>
      <article className={style.index}>
        <SEO title="Home" />
        <section >
          <h1>Welcome!</h1>
          <p>
            On this platform we want to share awareness about the connection between carbon dioxide emissions and electricity consumption.
            Would you like to know more about carbon dioxide effects?
            Check our <Link to="/facts">facts</Link> section!
          </p>

          <p>
            Start by selecting your area! 
            Check which will be the “greenest hour” of today, the hour when the electricity production will cause less emission,
            and discover how much you would emit today using your household appliances!
          </p>
        </section>

        <section>
          
          <h1>CO&#8322; Usage Calculator</h1>

          <div className={style.countrySelector}>
            <p>Choose your country:</p>
            <Select
              onChange={(v) => setSelectedCountry(v.value)}
              className={style.select}
              options={COUNTRY_OPTIONS}
            />
          </div>
          {
            co2Series &&
            <>
              <div className={style.results}>
                <p>
                  Emissions derived from electricity production from now until&nbsp;
                  <mark >
                    <FormattedDate
                      year="2-digit"
                      month="2-digit"
                      day="2-digit"
                      hour="2-digit"
                      minute="2-digit"
                      value={lastTime}
                    />
                  </mark>
                  &nbsp; are at the minimum at:
                </p>
                <span>
                  <FormattedTime
                    year="2-digit"
                    month="2-digit"
                    day="2-digit"
                    hour="2-digit"
                    minute="2-digit"
                    value={
                      co2Series.reduce(
                        (acc, point) => (!acc || (point.value < acc.value && new Date() < point.time)) ? point : acc,
                        null
                      )?.time
                    } />
                </span>
              </div>

              <div className={style.applianceSelector}>

                <p>Insert the average consumption of your appliance [kWh]:</p>

                <input
                  type="number"
                  onChange={e => setSelectedConsumption(e.target.value)}
                  value={selectedConsumption}/>

                <p>Or choose from one of our predefined profiles:</p>

                <IconSelect
                  selectedConsumption={selectedConsumption}
                  options={APPLIANCE_OPTIONS}
                  onChange={o => setSelectedConsumption(o.consumption)}/>
              </div>

             <p>Select period of usage:</p>

              <div className={style.periodSelect}>
                <div className={style.picker}>
                  <span>From:</span>
                  <DateTimePicker
                    className={style.timePicker}
                    clearIcon={null}
                    disableClock={true}
                    showSecond={false}
                    onChange={t => setTimeFrom(t)}
                    value={timeFrom}
                    locale={navigator.languages ? navigator.languages[0] : navigator.language}
                  />
                </div>
                <div className={style.picker}>
                  <span>To:</span>
                    <DateTimePicker
                      className={style.timePicker}
                      clearIcon={null}
                      disableClock={true}
                      showSecond={false}
                      onChange={t => setTimeTo(t)}
                      value={timeTo}
                      locale={navigator.languages ? navigator.languages[0] : navigator.language}
                    />
                </div>
              </div>
            </>
          }
          {
            timeRangeError &&
            <p className={style.timeRangeError}>Error! The time range must be between <mark >
                <FormattedDate
                  year="2-digit"
                  month="2-digit"
                  day="2-digit"
                  hour="2-digit"
                  minute="2-digit"
                  value={co2Series[0].time}
                />
              </mark> and <mark >
                <FormattedDate
                  year="2-digit"
                  month="2-digit"
                  day="2-digit"
                  hour="2-digit"
                  minute="2-digit"
                  value={lastTime}
                />
              </mark> and the second timestamp must be after the first.
            </p>
          }
          {
            applianceCo2 &&
            <div className={classnames(style.results, style.co2Results)}>
              <p>The total amount of CO&#8322; emitted for the selected consumption and period is:</p>
              <span>{applianceCo2.toFixed(2)} g</span>
            </div>
          }
        </section>
      </article>
    </Layout>
  );
}


export const query = graphql`
  {
    allDataJson {
      edges {
        node {
          predictions {
            country
            startTime
            prediction {
              label
              values
            }
          }
        }
      }
    }
  }
`

export default IndexPage
