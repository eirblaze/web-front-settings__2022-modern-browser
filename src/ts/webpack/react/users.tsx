import React from "react"
import {Toggle} from "./toggle"
import { merge } from "webpack-merge"

export interface UserProp {
  userId: number
  userName: string
  運賃: number
  onCurrentFareChange?: (userId:number, fare: number)=>void
  onCurrentFareLoad?: (userId:number, fare: number)=>void
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
    if ( this.props.onCurrentFareLoad !== undefined ) this.props.onCurrentFareLoad(this.props.userId, this.state.currentFare)
  }

  // アロー関数だと自動的にクラスのthis(=定義時点)にbindされる。 https://zenn.dev/souhal/articles/905ea271d4b070
  handleMouseEnter:React.MouseEventHandler<HTMLLIElement> = e => {
    this.setState({css: merge(this.state.css,{borderColor: "hsl(54, 61%, 55%)"})})
  }
  handleMouseLeave:React.MouseEventHandler<HTMLLIElement> = e => {
    this.setState({css: merge(this.state.css,{borderColor: "transparent"})})
  }

  handleSwToggle = (isOn:boolean) => {
    const updatedFare = isOn ? this.props.運賃 : 0
    this.setState({
      css: merge(this.state.css,{backgroundColor: isOn ? "hsl(0, 100%, 25%)" : "transparent"}),
      currentFare: updatedFare,
    })
    if ( this.props.onCurrentFareChange !== undefined ) this.props.onCurrentFareChange(this.props.userId, updatedFare)
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
  fares: number[]
}
export class UserList extends React.Component<UserListProp,UserListState> {
  constructor(props: UserListProp) {
    super(props)
    this.state = {
      fares: new Array(props.userList.length).fill(0) as number[],
    }
  }

  handleChangeTotalFare = (userId:number, currentFare: number) => {
    this.setState(prevState => {
      const updatedState: UserListState = prevState
      updatedState.fares[userId] = currentFare
      return updatedState
    })
  }

  render() {
    let totalFare = 0
    this.state.fares.forEach(ele=>{totalFare+=ele})
    return <div>
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
      <p>運賃: {totalFare}&yen;</p>
    </div>
  }
}

