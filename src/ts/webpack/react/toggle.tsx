import React from "react"

export interface ToggleProp {
  swNo: number
  label?: string
}
export interface ToggleState {
  isToggleOn: boolean
}

export class Toggle extends React.Component<ToggleProp,ToggleState> {
  constructor(props:ToggleProp) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}