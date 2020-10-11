import Dialog from './Dialog.js';
import ScheduleApi from './ScheduleApi.js';
import State from './State.js';

const OFFSET_LIMIT = 10;
const datetime = new Date();
const hour = `${datetime.getHours()}`.padStart(2, '0');
const minutes = `${datetime.getMinutes()}`.padStart(2, '0');
const time = hour + ':' + minutes;

const apiSettings = {
  day: datetime.getDay(),
  time: time,
  limit: OFFSET_LIMIT
};

const api = ScheduleApi(apiSettings);
const state = State(OFFSET_LIMIT);
const dialog = Dialog();

const next = async () =>
  await api
    .fetch({ offset: state.offset() })
    .then(state.increment)
    .then(dialog.render)
    .catch(error =>
      {
        console.error(error);
        return false;
      });

await dialog.start(next);
