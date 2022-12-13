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
          fare: 100,
        },
        {
          name: "Bさん",
          fare: 100,
        },
        {
          name: "Cさん",
          fare: 50,
        },
        {
          name: "Dさん",
          fare: 50,
        },
      ]}/>
      <p>運賃: </p>
    </form>
    <TemperatureCalc />
  </div>
}

export const element = <MyApp />

