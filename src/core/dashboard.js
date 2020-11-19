import {combineLatest, merge} from 'rxjs';
import 'rxjs/add/operator/map';
import {
  debounceTime,
  filter,
  map,
  mapTo,
  throttleTime,
  timestamp,
} from 'rxjs/operators';

const NO_VALUE_DELAY = 1000;
const MAX_EMIT_FREQUENCY = 100;

export const createDashboard = (...sources$) => {
  const timedSources$ = sources$.map(source$ => {
    const emptyValue$ = source$.pipe(debounceTime(NO_VALUE_DELAY),
        mapTo('N/A'));
    return merge(source$, emptyValue$).pipe(timestamp());
  });

  return combineLatest(timedSources$, (...sources) => {
    const changed = sources.slice(0)
        .sort((a, b) => b.timestamp - a.timestamp)[0];

    const values = sources.map(s => s.value);
    return {
      values,
      trigger: changed.value,
    };

  })
      .pipe(throttleTime(MAX_EMIT_FREQUENCY),
          filter(({trigger}) => trigger !== 'N/A'),
          map(({values}) => values));
};
