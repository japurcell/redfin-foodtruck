const State = (offsetLimit) =>
{
  let offset = 0;
  let lastPageCount = offsetLimit;

  function increment(data)
  {
    if (Array.isArray(data))
    {
      offset += offsetLimit
      lastPageCount = data.length;
    }

    return Promise.resolve(data);
  }

  return {
    increment: increment,
    offset: () => offset
  };
};

export default State;
