# TeamsEchoBot

This sample would help pull user information when being called from Teams client. Bot service code is written in Node.JS (JavaScript language) V4 SDK.

## Prerequisites

- [Node.js](https://nodejs.org) version 10.14.1 or higher
    ```bash
    # determine node version
    node --version
    ```
- Create a `.env` file in the root folder as of `package.json`
    ```bash
    MicrosoftAppId=your-bot-service-appId
    MicrosoftAppPassword=your-bot-service-appPassword
    ```

## To run the bot

- Install modules
    ```bash
    npm install
    ```
- Start the bot
    ```bash
    npm start
    ```
- You can use VS Code to open the folder "teams-echo-bot"
- Press `F5` to run the project in debug mode
- Create an ngrok endpoint
- Update the same in Azure bot registraion 


## Testing the bot

You could use the `Test in webchat` or `Microsoft Teams` clients to test the 1:1 flow.
