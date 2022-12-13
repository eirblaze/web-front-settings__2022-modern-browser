import React from "react"
import {Toggle} from "./toggle"
import { merge } from "webpack-merge"

export interface UserProp {
  userId: number
  userName: string
  運賃: number
  onCurrentFareChange?: (fare: number)=>void
  onCurrentFareLoad?: (fare: number)=>void
}
export interface UserState {
  css: React.CSSProperties
  currentFare: number
}

export class User extends React.Component<UserProp,UserState> {
  constructor(props:UserProp) {
    super(props)
    this.state = {
      css: {},
      currentFare: 0
    }
    if ( this.props.onCurrentFareLoad !== undefined ) this.props.onCurrentFareLoad(this.state.currentFare)
  }

  handleMouseEnter:React.MouseEventHandler<HTMLLIElement> = e => {
    this.setState({css: merge(this.state.css,{borderColor: "hsl(54, 61%, 55%)"})})
  }
  handleMouseLeave:React.MouseEventHandler<HTMLLIElement> = e => {
    this.setState({css: merge(this.state.css,{borderColor: "transparent"})})
  }

  handleSwToggle = (isOn:boolean) => {
    this.setState({
      css: merge(this.state.css,{backgroundColor: isOn ? "hsl(0, 100%, 25%)" : "transparent"}),
      currentFare: isOn ? this.props.運賃 : 0,
    })
    if ( this.props.onCurrentFareChange !== undefined ) this.props.onCurrentFareChange(this.state.currentFare)
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

export interface UserListProp {
  userList: {
    name: string
    運賃: number
  }[],
  onFareChange?: (運賃: number)=>void
  onFareLoad?: (運賃: number)=>void
}
export interface UserListState {
  totalFare: number
}
export class UserList extends React.Component<UserListProp,UserListState> {
  constructor(props: UserListProp) {
    super(props)
    this.state = {
      totalFare: 0
    }
  }

  handleChangeTotalFare = (fare: number) => {
    this.setState(prevState => {
      return {totalFare: fare + prevState.totalFare}
    })
  }

  render() { return <div>
    <ul>{
      this.props.userList.map( (iterator,index) => <User
        userId={index}
        userName={iterator.name}
        運賃={iterator.運賃}
        key={index.toString()}
        onCurrentFareLoad={this.handleChangeTotalFare}
        onCurrentFareChange={this.handleChangeTotalFare}
      />)
    }</ul>
    <p>運賃: {this.state.totalFare}&yen;</p>
  </div>}
}

