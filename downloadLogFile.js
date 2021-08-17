import StreamPromises from "stream/promises";
import Axios          from "axios";
import Tar            from "tar";
import fs             from "fs";

// Download Android.log if needed.
export default async function downloadLogFile()
{
  const url          = "https://zenodo.org/record/3227177/files/Android.tar.gz?download=1";
  const logPath      = "./Android.log";
  const writeTarPath = "./Android.tar.gz";
  try // Check if the log file does exists.
  {
    fs.accessSync( logPath );
  }
  catch( err ) // Download the file.
  {
    console.log( `Downloading ${writeTarPath}` );
    const httpStream = ( await Axios.get( url , {  responseType : "stream" }) ).data;
    const fileStream = fs.createWriteStream( writeTarPath );
    await StreamPromises.pipeline( httpStream , fileStream );
    await StreamPromises.finished( fileStream );
    console.log( `Extracting ${logPath}` );
    await Tar.extract({ file : writeTarPath }); // Will decompress the file to the current directory.
    console.log( `Removing ${writeTarPath}` );
    await fs.promises.unlink( writeTarPath );
  }
}