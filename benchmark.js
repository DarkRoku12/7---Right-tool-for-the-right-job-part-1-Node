const getTime = () => ( new Date ).getTime();

const CollectGarbage = function()
{
  if( global.gc )
    global.gc();
  else
    console.warn( "No GC hook: please, start the program as: node --expose-gc index.js" );
};

export default async function Benchmark( callback , name , iteration )
{
  CollectGarbage();
  console.log( `Benchmarking: ${name} | iteration: ${iteration}` );
  const start = getTime();
  await callback();
  const end = getTime();
  const mem = process.memoryUsage.rss() / 1024 / 1024;
  console.log( `** Took: ${end - start}ms | memory: ${mem} MB` );
};