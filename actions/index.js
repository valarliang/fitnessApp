import { fetchCalendarResults } from "../utils/api";
import { dailyReminder, timeToString } from "../utils/helpers";

export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';
export const ADD_ENTRY = 'ADD_ENTRY'
export const receiveEntries = (entries) => ({
  type: RECEIVE_ENTRIES,
  entries,
})

export const addEntry = (entry) => ({
  type: ADD_ENTRY,
  entry,
})

export const loadCalendar = () => (dispatch) =>
fetchCalendarResults()
.then((entries) => dispatch(receiveEntries(entries)))
.then(({ entries }) => {
  const key = timeToString();
  if (!entries[key]) {
    dispatch(addEntry({ [key]: dailyReminder }))
  }
})
