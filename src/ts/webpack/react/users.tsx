import React from "react"
import {Toggle} from "./toggle"
import { merge } from "webpack-merge"

export interface UsersProp {
  userId: number
  userName: string
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
  
  render() {
    const classNamePrefix = "sw-wrap"
    return (<li
        className={`${classNamePrefix} ${classNamePrefix}__${this.props.userId}`}
        key={this.props.userId.toString()}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={this.state.css}
      >
        {this.props.userName}<Toggle swNo={this.props.userId} onSwChange={isOn=>{
        this.setState({css: merge(this.state.css,{backgroundColor: isOn ? "maroon" : "transparent"})})
      }} /></li>)
  }
}

export const UserList: React.FC<{userList: string[]}> = (props) => <ul>
{
  props.userList.map( (iterator,index) => <User
    userId={index}
    userName={iterator}
    key={index.toString()}
  />)
}
</ul>