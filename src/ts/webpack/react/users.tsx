import React from "react"
import {Toggle} from "./toggle"
import { merge } from "webpack-merge"

export interface UsersProp {
  userId: number
  userName: string
  運賃: number
}
export interface UsersState {
  css: React.CSSProperties
}

export class User extends React.Component<UsersProp,UsersState> {
  constructor(props:UsersProp) {
    super(props)
    this.state = {
      css: {}
    }
  }

  handleMouseEnter:React.MouseEventHandler<HTMLLIElement> = e => {
    this.setState({css: merge(this.state.css,{borderColor: "maroon"})})
  }
  handleMouseLeave:React.MouseEventHandler<HTMLLIElement> = e => {
    this.setState({css: merge(this.state.css,{borderColor: "transparent"})})
  }

  handleSwToggle = (isOn:boolean) => {
    this.setState({css: merge(this.state.css,{backgroundColor: isOn ? "maroon" : "transparent"})})
  }
  
  render() {
    const classNamePrefix = "sw-wrap"
    return (<li
      className={`${classNamePrefix} ${classNamePrefix}__${this.props.userId}`}
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}
      style={this.state.css}
    >
      {this.props.userName}
      <Toggle
        swNo={this.props.userId}
        onSwChange={this.handleSwToggle}
        onSwLoad={this.handleSwToggle}
      />
      {this.props.運賃}&yen;
    </li>)
  }
}

export const UserList: React.FC<{
  userList: {
    name: string
    運賃: number
  }[],
  onFareChange?: (運賃: number)=>void
  onFareLoad?: (運賃: number)=>void
}> = (props) => <ul>
{
  props.userList.map( (iterator,index) => <User
    userId={index}
    userName={iterator.name}
    運賃={iterator.運賃}
    key={index.toString()}
  />)
}
</ul>
