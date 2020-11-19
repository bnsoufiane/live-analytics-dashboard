import {of, timer} from 'rxjs';
import {mapTo, repeat, switchMap} from 'rxjs/operators';

export function createSensorMock(options) {
  const {
    minDelay,
    maxDelay,
    minValue,
    maxValue,
  } = options;

  return of('')
      .pipe(switchMap(() => timer(random(minDelay, maxDelay))
          .pipe(mapTo(random(minValue, maxValue)))))
      .pipe(repeat());
}

function random(bottom, top) {
  return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
}
