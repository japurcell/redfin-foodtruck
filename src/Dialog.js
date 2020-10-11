import * as process from 'process';
import * as readline from 'readline';
import './typedefs.js';

/**
 * Handles the rendering of food truck info
 * as well as listening for user input to the console.
 */
const Dialog = () =>
{
  /**
   * Displays food truck data.
   *
   * @param {PagingState} state - latest paging state
   * @return {Promise<boolean>} - whether or not more data is available
   */
  async function render({data, hasMore})
  {
    data.forEach(item => console.log(`${item.name} ${item.address}`));

    return Promise.resolve(hasMore);
  }

  /**
   * Begins listening for user input to the console.
   *
   * @param {Next} next
   * @return {Promise<void>}
   */
  async function start(next)
  {
    async function callNext()
    {
      console.clear();
      const hasMore = await next();

      if (hasMore)
      {
        console.log('\nPress any key for more...');
      }
      else
      {
        process.exit();
      }
    }

    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY)
    {
      process.stdin.setRawMode(true);
    }

    await callNext();

    process.stdin.on('keypress', async (key, data) =>
    {
      if (data.ctrl && data.name === 'c')
      {
        process.exit();
      }
      else
      {
        await callNext();
      }
    });
  }

  return {
    render: render,
    start: start
  };
};

export default Dialog;
