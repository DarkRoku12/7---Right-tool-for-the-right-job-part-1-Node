import "./exceptionHandler.js";
import os                from "os";
import readline          from "readline";
import fs , { read }     from "fs";
import events            from "events";
import downloadLogFile   from "./downloadLogFile.js";
import benchmark         from "./benchmark.js";
import * as createOutput from "./createOutput.js";

const LogTypes = [ "I" , "D" , "V" , "W" , "E" , "F" ];
const LogPath  = "./Android.log";

// Classify logs using writeable streams.
const classify_with_filestreams = async function()
{
  const reader = readline.createInterface({
    input  : fs.createReadStream( LogPath ) ,
    output : null ,
  });

  const outputStreams = createOutput.streams( LogTypes );

  // Handle when a new <line> is available in a asynchronous way.
  for await( const line of reader )
  {
    const matchesIterator = line.matchAll( /[\d\-\.\s]+([A-Z])/g );
    const matches         = matchesIterator.next().value;
    const identifier      = matches[1];
    const writeable       = outputStreams[ identifier ];

    if( !writeable.write( line ) ) // If the stream buffer is full, wait until is drained.
      await events.once( writeable , "drain" ); // Wait for the drain event.

    writeable.write( os.EOL ); // Append a new line.
  };

  // Close all write streams.
  for( const [ key , value ] of Object.entries( outputStreams ) )
  {
    value.close();
  }

  reader.close();
};

// Classify logs using files opened in W+ mode.
const classify_with_files = async function()
{
  const reader = readline.createInterface({
    input    : fs.createReadStream( LogPath ) ,
    output   : null ,
    terminal : false ,
  });

  const writePromises = {};
  const writeTask     = [];

  // Handle when a new <line> is available in a asynchronous way.
  for await( const line of reader )
  {
    const matchesIterator = line.matchAll( /[\d\-\.\s]+([A-Z])/g );
    const matches         = matchesIterator.next().value;
    const identifier      = matches[1];
    writeTask.push({ type : identifier , line : line + os.EOL });
  };

  const outputFiles = await createOutput.files( LogTypes );

  // Write each line on its target file.
  for await( const task of writeTask )
  {
    await writePromises[ task.type ];
    writePromises[ task.type ] = outputFiles[ task.type ].write( task.line );
  }

  // Close all files handlers.
  for( const [ key , value ] of Object.entries( outputFiles ) )
  {
    value.close();
  }

  reader.close();
};

const main = async function()
{
  // Download Android.log if not exists //
  await downloadLogFile();

  // Start the benchmark //
  await benchmark( () => classify_with_filestreams() , "Using filestreams" , 1 );
  await benchmark( () => classify_with_files() , "Using files (without streams)" , 1 );
};

main();