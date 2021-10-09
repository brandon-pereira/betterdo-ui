import.meta.hot;

/**
 * During the migration from Webpack to Snowpack we
 * needed to move from EnvironmentPlugin to SNOWPACK_ENV
 * However, this is fairly flakey IMO because it requires
 * us to add `imports 'meta.hot' method` to all files which reference it.
 * As such, I've created this constants file as a single place
 * for managing environment variables. If I had to guess, the snowpack
 * Api will change for this down the road (did again in v3), so
 * this should help isolate the refactoring.
 *
 * Related Issues:
 * https://github.com/snowpackjs/snowpack/issues/3621#issuecomment-907731004
 * https://github.com/snowpackjs/snowpack/issues/3768
 *

export const VERSION = __SNOWPACK_ENV__.VERSION;

export const SERVER_URL = __SNOWPACK_ENV__.SERVER_URL;

export const isProduction = __SNOWPACK_ENV__.NODE_ENV === 'production';
