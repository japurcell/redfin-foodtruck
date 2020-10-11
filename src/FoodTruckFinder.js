import Dialog from './Dialog.js';
import PagingState from './PagingState.js';
import ScheduleApi from './ScheduleApi.js';

const OFFSET_LIMIT = 10;
const datetime = new Date();
const hour = `${datetime.getHours()}`.padStart(2, '0');
const minutes = `${datetime.getMinutes()}`.padStart(2, '0');
const time = hour + ':' + minutes;

const queryParams = {
  day: datetime.getDay(),
  time: time,
  limit: OFFSET_LIMIT
};

const api = ScheduleApi(queryParams);
const state = PagingState(OFFSET_LIMIT);
const dialog = Dialog();

const next = async () =>
  await api
    .fetchSchedule(state.offset())
    .then(state.increment)
    .then(dialog.render)
    .catch(error =>
    {
      console.error(error);
      return false;
    });

(async () => await dialog.start(next))();
