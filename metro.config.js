// https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Fix: tslib ESM/CJS conflict caused by framer-motion (vaul → expo-router dependency)
// Metro converts ESM 'import tslib from tslib' to CJS, but tslib.default is undefined
// because tslib.js is a CJS module without __esModule flag.
// Solution: redirect ALL tslib imports to the explicit CJS build.
const tslibPath = path.resolve(__dirname, 'node_modules/tslib/tslib.js');

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'tslib' || moduleName.startsWith('tslib/')) {
    return { filePath: tslibPath, type: 'sourceFile' };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
