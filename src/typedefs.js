/**
 * A food truck listing.
 * @typedef {{ name: string, address: string }} FoodTruckListing
 */

/**
 * API query parameters.
 * @typedef {object} QueryParams - query parameters for the API call
 * @property {number} [day=0] - day of week
 * @property {string} [time='00:00'] - time as HH:MM
 * @property {number} [limit=10] - max size of result set
 */

/**
 * Paging state.
 * @typedef {{ data: FoodTruckListing[], hasMore: boolean }} PagingState
 * @property {boolean} hasMore - whether or not more data is available
 */

/**
* Used to get another page of {@link FoodTruckListing}.
* @callback Next
* @returns {Promise<boolean>}
*/
