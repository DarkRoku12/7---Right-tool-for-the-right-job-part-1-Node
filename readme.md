## Demystifying Premature Optimization ##

This repo contains the full code of my [blog entry](https://code.darkroku12.ovh/1-demystifying-premature-optimization/).

## Install instructions:

Just run `npm install`. (This is a NodeJS app).

__Note:__ When you run the app, if `Android.log` does not exists it will try to download it from [this link](https://doi.org/10.5281/zenodo.1144100), the file is: Android.tar.gz (md5:1a1bac1cf0ea95bc88e296f689f0258f). Then it will be decompressed and the .tar.gz will be erased.

## Running instructions:

In order to the test to be fair `node <file.js>` must be ran using the flag `--expose-gc`,
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

`TABLE_SIZE: 1500000 | SAMPLE_SIZE: 0.667 | ITERATIONS: 4`
| service version | run 1  | run 2  | run 3  | run 4  |
|-----------------|--------|--------|--------|--------|
| v1              | 4915ms | 4690ms | 4668ms | 4608ms |
| v2              | 3593ms | 3556ms | 3598ms | 3607ms |
| v3              | 2762ms | 2736ms | 2720ms | 2720ms |
| v4              | 2515ms | 2457ms | 2479ms | 2479ms |
| v4.1            | 1578ms | 1530ms | 1533ms | 1541ms |
| v5              | 1723ms | 1727ms | 1798ms | 1789ms |
| v6              | 1715ms | 1720ms | 1736ms | 1730ms |

For more samples you can go to `/logs/*` and read the `.txt` files.
Also you can ran the test by yourself 😊.

## Author:
#### Enmanuel Reynoso | DarkRoku12 | enmarey2012@hotmail.com