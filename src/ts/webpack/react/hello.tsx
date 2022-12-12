import React from "react"

export interface UserListProp {
  userList: string[]
}

const handleMouseEnter:React.MouseEventHandler = e => {
  $(e.currentTarget).css({
    "backgroundColor": "maroon",
  })
}
const handleMouseLeave:React.MouseEventHandler = e => {
  $(e.currentTarget).css({"backgroundColor": "transparent"})
}

const Users: React.FC<UserListProp> = (props) => <ul>
  {
    props.userList.map( (iterator,index) => <li
      key={index.toString()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >{iterator}</li> )
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

