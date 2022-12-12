import React from "react"

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

export interface TemperatureInputProp {
  patrsId: number
  label?: string
  temperature: number
  scale: string
  onTemperatureChange: React.ChangeEventHandler
}

class TemperatureInput extends React.Component<TemperatureInputProp> {
  constructor(props: TemperatureInputProp) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e: React.ChangeEvent) {
    this.props.onTemperatureChange(e)
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
