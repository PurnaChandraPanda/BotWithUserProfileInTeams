# TeamsEchoBot

This sample would help pull user information when being called from Teams client. Bot service code is written in Node.JS (TypesScript language) V4 SDK.

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


## Core logic

```diff
        // onMessage() be hit after run()
+        this.onMessage(async (context, next) => {
        
            // if only Teams channel, retrieve user information
+            if(context.activity.channelId === "msteams"){
                // variable to hold user details
                let userResponse = null;

                // set the app credentials
                var credentials = new BotConnector.MicrosoftAppCredentials(
                    context.adapter['credentials'].appId,
                    context.adapter['credentials'].appPassword
                );
                // initialize connector client
+                var connector = new ConnectorClient(credentials, {baseUri: context.activity.serviceUrl});

                // enumerate the members of conversation
+                var result = await connector.conversations.getConversationMembers(context.activity.conversation.id);
                userResponse = `from ${result[0]['givenName']} ${result[0]['surname']} with ${result[0]['email']}`;
                await context.sendActivity(`Echo: '${context.activity.text}' .. ${userResponse}`);
            }else{
                await context.sendActivity(`Echo: '${context.activity.text}'`);
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
```

On this sample, the logic in its entirity is in [bot.ts](https://github.com/PurnaChandraPanda/BotWithUserProfileInTeams/blob/master/ts/teams-echo-bot/src/bot.ts#L13).