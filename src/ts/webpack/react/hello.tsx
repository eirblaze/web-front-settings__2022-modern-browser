import React from "react"
import {Toggle} from "./toggle"
import {TemperatureCalc} from "./liftup/temperatureCalc"

export interface UserListProp {
  userList: string[]
}

const handleMouseEnter:React.MouseEventHandler<HTMLLIElement> = e => {
  e.currentTarget.style.backgroundColor = "maroon"
}
const handleMouseLeave:React.MouseEventHandler<HTMLLIElement> = e => {
  e.currentTarget.style.backgroundColor = "transparent"
}

const Users: React.FC<UserListProp> = (props) => <ul>
  {
    props.userList.map( (iterator,index) => <li
      key={index.toString()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >{iterator}<Toggle swNo={index}/></li> )
  }
</ul>

function MyApp() {

  return <div>
    <h2>hello</h2>
    <Users userList={[
      "A",
      "B",
      "C",
      "D",
      "E",
    ]}/>
    <TemperatureCalc />

  </div>
}

export const element = <MyApp />

