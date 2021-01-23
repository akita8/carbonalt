import React, { useState, useEffect } from "react"
import classnames from 'classnames'

import { Icon } from '../icon'

import style from "./icon-select.module.scss"

export const IconSelect = ({ options, onChange, selectedConsumption }) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selectedConsumption) {
      const consumption = parseFloat(selectedConsumption)
      if (!isNaN(consumption)) {
        const option = options.find(o => o.consumption === selectedConsumption);
        if (option) setSelected(option.name)
        else setSelected(null);
      } else setSelected(null);
    }
  }, [selectedConsumption, setSelected, options])

  return (
    <div className={style.iconSelect}>
      {
        options.map((o, i) =>
          (
            <div
              onClick={() => {
                onChange(o);
                setSelected(o.name)
              }}
              className={classnames(style.box, {[style.active]: selected === o.name})} key={i}>
              <Icon name={o.name} className={style.icon}/>
            </div>
          )
        )
      }
    </div>
  )
}
