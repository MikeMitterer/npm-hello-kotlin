# Hello Kotlin
Project's setup using kotlin and webpack

## Install

```
npm install
```

## Run
There are two ways to run this example

### NPM only
Make sure the `KotlinWebpackPlugin` section under *plugins* in webpack.config.js  
is not commented out.

```bash
    npm run start
```

### In combination with Gradle
Comment out the `KotlinWebpackPlugin` section under *plugins* in webpack.config.js

Now - open your first terminal window
```bash
    npm run start
``` 

Open another terminal window
```bash
    gradle -t build
``` 
