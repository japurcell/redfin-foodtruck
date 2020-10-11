import * as process from 'process';
import * as readline from 'readline';

/**
 * Handles the rendering of food truck info
 * as well as listening for user input to the console.
 */
const Dialog = () =>
{
  /**
   * Displays food truck data
   *
   * @param {Array} data
   * @returns {Promise<Boolean>} - whether or not any data was rendered
   */
  async function render(data)
  {
    let result = true;

    if (Array.isArray(data) && data.length)
    {
      data.forEach(item => console.log(`${item.name} ${item.address}`));
    }
    else
    {
      result = false;
    }

    return Promise.resolve(result);
  }

  /**
   * Begins listening for user input to the console
   *
   * @param {Function} next - returns a `Promise<boolean>` indicating if more user input is expected
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
    process.stdin.setRawMode(true);

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
