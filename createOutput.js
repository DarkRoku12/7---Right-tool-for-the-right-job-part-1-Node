import fs from "fs";

export function streams( logTypes )
{
  /* 16KB (NodeJS default) -> Make the internal buffer x300 bigger, default value is too slow */
  const bufferSize = 16384 * 300;
  const streams    = {};

  for( let type of logTypes )
    streams[type] = fs.createWriteStream( `./output/${type}-output.txt` , { highWaterMark : bufferSize });

  return streams;
};

export async function files( logTypes )
{
  /* 16KB (NodeJS default) -> Make the internal buffer x300 bigger, default is too slow */
  const bufferSize = 16384 * 300;
  const files      = {};

  for( let type of logTypes )
    files[type] = await fs.promises.open( `./output/${type}-output.txt` , "w+" );

  return files;
};
