import './typedefs.js';

/**
 * Used to calculate paging state.
 *
 * @param {number} offsetLimit - max length of a result set
 */
const PagingState = (offsetLimit) =>
{
  let offset = 0;
  let lastPageCount = offsetLimit;

  /**
   * Increments paging state based on `data`.
   *
   * @param {FoodTruckListing[]} data
   * @return {Promise<PagingState>}
   */
  function increment(data)
  {
    let retData = [];

    if (Array.isArray(data))
    {
      offset += offsetLimit;
      lastPageCount = data.length;
      retData = data;
    }

    return Promise.resolve({
      data: retData,
      hasMore: lastPageCount == offsetLimit
    });
  }

  return {
    increment: increment,
    /**
     * @return {number} - the current offset index
     */
    offset: () => offset
  };
};

export default PagingState;
