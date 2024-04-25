# Exchange rate sender

Exchange rate push to App.  
Use Firebase Functions.  
for node 20

## Setup

1. Configuration files
    ```
    /functions/config/application.yaml
    /functions/config/sdk.yaml
    ```
1. Initialize
    ```
    npm install -g firebase-tools
    firebase login:ci
    export FIREBASE_TOKEN={login token}
    firebase init
    ```

## Operations

* deploy
    ```
    cd functions/
    npm run deploy-functions
    ```
