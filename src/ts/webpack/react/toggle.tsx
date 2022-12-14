import React from "react"

export interface ToggleProp {
  swNo: number
  label?: string
  onSwChange?: (value: boolean)=>void
  onSwLoad?: (value: boolean)=>void
}
export interface ToggleState {
  isToggleOn: boolean
}

export class Toggle extends React.Component<ToggleProp,ToggleState> {
  constructor(props:ToggleProp) {
    super(props);
    this.state = {isToggleOn: true};
    if (this.props.onSwLoad !== undefined) this.props.onSwLoad(this.state.isToggleOn)
  }

  handleClick = () => {
    this.setState(prevState => {
      const newSwState = !prevState.isToggleOn
      if (this.props.onSwChange !== undefined) this.props.onSwChange(newSwState)
      return {
        isToggleOn: newSwState
      }
    })
  }

  render() {
    return (
      <button onClick={this.handleClick} type="button" className={`sw ${this.state.isToggleOn ? 'sw-on' : 'sw-off'}`}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
