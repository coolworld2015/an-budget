# AN Budget
git clone https://github.com/coolworld2015/an-budget.git
-------------------------------------------------------------------------------------------------
git config --global user.name "coolworld2015"
-------------------------------------------------------------------------------------------------
git config --global user.email "wintermute2015@ukr.net"
-------------------------------------------------------------------------------------------------
npm install -g react-native-cli
-------------------------------------------------------------------------------------------------
npm install (for rn-base.git)
-------------------------------------------------------------------------------------------------
react-native init AwesomeProject
-------------------------------------------------------------------------------------------------
rn-base\android -> local.properties -> sdk.dir = C:/Users/ed/AppData/Local/Android/sdk
-------------------------------------------------------------------------------------------------
Android SDK Manager -> Android SDK Build-tools (23.0.1)
-------------------------------------------------------------------------------------------------
ANDROID_HOME -> C:/Users/ed/AppData/Local/Android/sdk
-------------------------------------------------------------------------------------------------
Genymotion -> Ctrl+M -> Menu
-------------------------------------------------------------------------------------------------
react-native run-android
-------------------------------------------------------------------------------------------------
APK -> react-native bundle --dev false --platform android --entry-file index.android.js --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug
-------------------------------------------------------------------------------------------------
APK -> cd android -> gradlew assembleDebug(assembleRelease) -> \android\app\build\outputs\apk
-------------------------------------------------------------------------------------------------
PIC -> /android/app/src/main/res/mipmap
-------------------------------------------------------------------------------------------------
CONFIG -> android/app ->build.gradle
-------------------------------------------------------------------------------------------------