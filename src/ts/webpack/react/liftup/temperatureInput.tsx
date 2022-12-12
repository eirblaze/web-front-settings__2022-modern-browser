import React from "react"

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

export interface TemperatureInputProp {
  patrsNum?: number
  label?: string
  temperature: string
  scale: string
  onTemperatureChange: React.ChangeEventHandler<any>
}

export class TemperatureInput extends React.Component<TemperatureInputProp> {
  constructor(props: TemperatureInputProp) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e: any) {
    this.props.onTemperatureChange(e.target.value)
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
