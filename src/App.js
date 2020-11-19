import React, {Component} from 'react';
import './App.css';
import {createDashboard} from './core/dashboard';
import {createSensorMock} from './core/sensor-mock';
import {Dashboard} from './components/dashboard.component';

const temperatureSensor$ = createSensorMock({
  minDelay: 100,
  maxDelay: 2000,
  minValue: 20,
  maxValue: 30,
});

const humiditySensor$ = createSensorMock({
  minDelay: 100,
  maxDelay: 2000,
  minValue: 80,
  maxValue: 90,
});

const pressureSensor$ = createSensorMock({
  minDelay: 100,
  maxDelay: 2000,
  minValue: 80,
  maxValue: 90,
});

const dashboard$ = createDashboard(temperatureSensor$, humiditySensor$,
    pressureSensor$)
    .map(([temperature, humidity, pressure]) => ({
      temperature,
      humidity,
      pressure,
    }));

class App extends Component {
  render() {
    return (
        <div className="App">
          <Dashboard dashboard$={dashboard$}/>
        </div>
    );
  }
}

export default App;
