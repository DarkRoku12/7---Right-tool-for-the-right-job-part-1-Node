## The right tool for the right job. | Part 2 (final): Log classifier in NodeJS ##

This repo contains the full code of my [blog entry](https://code.darkroku12.ovh/7-log-classifier-part-2/).

## Install instructions:

Just run `npm install`. (This is a NodeJS app).

__Note:__ When you run the app, if `Android.log` does not exists it will try to download it from [this link](https://doi.org/10.5281/zenodo.1144100), the file is: Android.tar.gz (md5:1a1bac1cf0ea95bc88e296f689f0258f). Then it will be decompressed and the .tar.gz will be erased.

## Running instructions:

To be fair, the app `node <file.js>` must be ran using the flag `--expose-gc`,
so we can use `global.gc()` to do a full garbage collector run before test, so the garbage collector does not run
in the middle of the tests.

There are two 'different' ways of running it:
1) `node --expose-gc index.js`
2) `node --jitless --expose-gc index.js`

The way #2 actually disable the `jit` compiler with the flag `--jitless`.

## Setup info:
- CPU: I7-9700K
- RAM: 32GB - 3200MHz
- Windows 10 (20H2)
- Node version: v16.5.0

## Running samples:

| Method                  | Time    | Memory     |
|-------------------------|---------|------------|
| Filestreams             | 3730ms  | 73.07 MB   |
| Files (without streams) | 36406ms | 1028.51 MB |

## Author:
#### Enmanuel Reynoso | DarkRoku12 | enmarey2012@hotmail.com