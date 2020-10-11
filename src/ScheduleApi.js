import fetch from 'node-fetch';
import './typedefs.js';

/**
 * Handles HTTP requests for food truck data at a given time of day.
 *
 * @param {QueryParams} queryParams - query parameters for the API call
 */
const ScheduleApi = ({day = 0, time = '00:00', limit = 10}) =>
{
  function validateNumbers(url, offset)
  {
    return [[day, 'day'], [limit, 'limit'], [offset, 'offset']]
      .reduce(
        (prev, next) =>
          isNaN(next[0]) ?
            Promise.reject(new Error(`${next[1]} is not a number`)) :
            prev,
        Promise.resolve(url));
  }

  function validateTime(url)
  {
    if (time && time.length === 5 && time.charAt(2) === ':')
    {
      return url;
    }
    else
    {
      throw new Error('time must be formatted as HH:MM');
    }
  }

  /**
     * Fetches the schedule from the API.
     *
     * @param {number} offset - index of where to start result list
     * @return {Promise<FoodTruckListing[]>} - food truck schedule data
     */
  async function fetchSchedule(offset)
  {
    const url = [
      'https://data.sfgov.org/resource/jjew-r69b.json?' +
        '$select=applicant AS name,location AS address',
      `dayorder=${day}`,
      `$where=start24 <= '${time}' AND end24 >= '${time}'`,
      `$limit=${limit}`,
      `$offset=${offset}`,
      '$order=applicant ASC,location ASC'
    ].join('&');

    return validateNumbers(url, offset)
      .then(validateTime)
      .then(fetch)
      .then(async response =>
      {
        const json = await response.json();

        if (json.error)
        {
          throw new Error(json.message);
        }
        else
        {
          return json;
        }
      });
  }

  return {
    fetchSchedule: fetchSchedule
  };
};

export default ScheduleApi;
