import React from "react"
import {UserList} from "./users"
import {TemperatureCalc} from "./liftup/temperatureCalc"

function MyApp() {

  return <div>
    <form>
      <h2>hello</h2>
      <UserList userList={[
        {
          name: "Aさん",
          運賃: 120,
        },
        {
          name: "Bさん",
          運賃: 120,
        },
        {
          name: "Cさん",
          運賃: 60,
        },
        {
          name: "Dさん",
          運賃: 60,
        },
      ]}/>
    </form>
    <TemperatureCalc />
  </div>
}

export const element = <MyApp />

