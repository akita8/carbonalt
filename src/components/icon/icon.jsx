import React from "react"

import Dishwasher from '../../icons/dishwasher.svg'
import HairDryer from '../../icons/hair-dryer.svg'
import LaptopCharging from '../../icons/laptop-charging.svg'
import Laptop from '../../icons/laptop.svg'
import VacuumCleaner from '../../icons/vacuum-cleaner.svg'
import WashingMachine from '../../icons/washing-machine.svg'
import MobilePhone from '../../icons/mobile-phone.svg'
import Cloud from '../../icons/cloud.svg'
import Team from '../../icons/team.svg'
import At from '../../icons/at.svg'


const IconsNames = {
  'dishwasher': Dishwasher,
  'hair-dryer': HairDryer,
  'laptop-charging': LaptopCharging,
  'laptop': Laptop,
  'vacuum-cleaner': VacuumCleaner,
  'washing-machine': WashingMachine,
  'mobile-phone': MobilePhone,
  'cloud': Cloud,
  'team': Team,
  'at': At
}

export const Icon = ({ name, className }) => {
    const SelectedIcon = IconsNames[name];
    return <SelectedIcon className={className}/>
}