# Exchange rate sender

Exchange rate push to App.  
Use Firebase Functions.  
for Node 14

## Setup

1. Configuration files
    ```
    /functions/config/application.yaml
    /functions/config/sdk.json
    ```
1. Initialize
    ```
    npm install -g firebase-tools
    firebase login:ci
    export FIREBASE_TOKEN={login token}
    firebase init
    ```

## Operation
* deploy
    ```
    cd functions/
    num run deploy-hosting # or deploy-functions
    ```
