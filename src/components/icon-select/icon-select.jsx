
import React, { useState } from "react"
import classnames from 'classnames'

import style from "./icon-select.module.scss"

export const IconSelect = ({ options, onChange }) => {
  const [selected, setSelected] = useState(null);
  return (
    <div className={style.iconSelect}>
      {
        options.map((o, i) => (
          <div
            onClick={() => {
              onChange(o);
              setSelected(o.value)
            }}
            className={classnames(style.box, {[style.active]: selected == o.value})} key={i}>

          </div>
        ))
      }
    </div>
  )
}
