const fs = require('fs');
const path = require('path');

const appJsonPath = path.join(__dirname, '../app.json');

try {
  const data = fs.readFileSync(appJsonPath, 'utf8');
  const appJson = JSON.parse(data);

  // Increment versionCode
  let currentVersionCode = appJson.expo.android?.versionCode || 1;
  appJson.expo.android = appJson.expo.android || {};
  appJson.expo.android.versionCode = currentVersionCode + 1;

  // Increment version (patch)
  let currentVersion = appJson.expo.version || "1.0.0";
  let parts = currentVersion.split('.');
  if (parts.length === 3) {
    parts[2] = parseInt(parts[2], 10) + 1;
    appJson.expo.version = parts.join('.');
  } else {
    appJson.expo.version = currentVersion + ".1"; // fallback
  }

  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2), 'utf8');
  console.log(`Successfully bumped version to ${appJson.expo.version} (versionCode: ${appJson.expo.android.versionCode})`);
} catch (error) {
  console.error('Error bumping version:', error);
  process.exit(1);
}
