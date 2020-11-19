import React from 'react';
import {Subject} from 'rxjs';
import {Widget} from './widget.component';
import {takeUntil} from 'rxjs/operators';

export class Dashboard extends React.Component {
  constructor(...args) {
    super(...args);
    this.destroyed$ = new Subject();
    this.state = {
      temperature: '--',
      pressure: '--',
      humidity: '--',
    };
  }

  componentDidMount() {
    this.props.dashboard$
        .pipe(takeUntil(this.destroyed$))
        .subscribe(newState => {
          this.setState(newState);
        });
  }

  componentWillUnmount() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  render() {
    return <div>
      <Widget name="Temperature" value={this.state.temperature}/>
      <Widget name="Humidity" value={this.state.humidity}/>
      <Widget name="Pressure" value={this.state.pressure}/>
    </div>;
  }
}
