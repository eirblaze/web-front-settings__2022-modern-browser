import React from "react"
import {UserList} from "./users"
import {TemperatureCalc} from "./liftup/temperatureCalc"

function MyApp() {

  return <div>
    <h2>hello</h2>
    <UserList userList={[
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

