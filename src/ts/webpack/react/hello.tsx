import React from "react"

export interface UserListProp {
  userList: string[]
}

const Users: React.FC<UserListProp> = (props) => <ul>
  {
    props.userList.map( iterator => <li>{iterator}</li> )
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
  </div>
}

export const element = <MyApp />

