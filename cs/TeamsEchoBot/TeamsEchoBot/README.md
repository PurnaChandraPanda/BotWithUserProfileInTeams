# TeamsEchoBot

This sample would help pull user information when being called from Teams client. Bot service code is written in C# V4 SDK.

## Prerequisites

- [.NET Core SDK](https://dotnet.microsoft.com/download) version 2.2

  ```bash
  # determine dotnet version
  dotnet --version
  ```
- Update `appsettings.json` with correct values of appId and appPassword

## To try this sample

- In a terminal, navigate to `TeamsEchoBot`

    ```bash
    # change into project folder
    cd # TeamsEchoBot
    ```

- Run the bot from a terminal or from Visual Studio, choose option A or B.

  A) From a terminal

  ```bash
  # run the bot
  dotnet run
  ```

  B) Or from Visual Studio

  - Launch Visual Studio
  - File -> Open -> Project/Solution
  - Select `TeamsEchoBot.csproj` file
  - Press `F5` to run the project

- Create an ngrok endpoint
- Update the same in Azure bot registraion 

## Testing the bot

You could use the `Test in webchat` or `Microsoft Teams` clients to test the 1:1 flow.

## Core logic

```diff
            // if only Teams channel, retrieve user information
+            if (turnContext.Activity.ChannelId == "msteams")
            {
                // initialize ConnectorClient
                var connector = new ConnectorClient(new Uri(turnContext.Activity.ServiceUrl),
                                                (_credentialProvider as ConfigurationCredentialProvider)?.AppId,
                                                (_credentialProvider as ConfigurationCredentialProvider)?.Password);

                // pull members which are part of this conversation from Teams
+                var members = await connector.Conversations.GetConversationMembersAsync(turnContext.Activity.Conversation?.Id);

                // simplest version is getting username, which you can read like:
                //      turnContext.Activity.From.Name
                // if more info needed, user related response would be in (members?[0]).Properties, and it looks like:
                // {{
                //      "objectId": "user-AAD-objectId-GUID",
                //      "givenName": "Purna Chandra",
                //      "surname": "Panda",
                //      "email": "pupanda@microsoft.com",
                //      "userPrincipalName": "pupanda@microsoft.com",
                //      "tenantId": "user-AAD-tenantId-GUID"
                //  }}
                // parse and reply user along with logical response
                // it's a Newtonsoft JObject ... so, respective parsing logic can be tried
                // just in case any further information needed about user profile, explore Microsoft.Graph APIs, where objectId and email values can be passed for AAD query

+                userResponse = $"from {(members?[0]).Properties["givenName"]} {(members?[0]).Properties["surname"]} with {(members?[0]).Properties["email"]}";
            }

            await turnContext.SendActivityAsync(MessageFactory.Text($"Echo: {turnContext.Activity.Text} .. {userResponse}"), cancellationToken);
```

On this sample, the logic in its entirity is in [EchoBot.cs](https://github.com/PurnaChandraPanda/BotWithUserProfileInTeams/blob/master/cs/TeamsEchoBot/TeamsEchoBot/Bots/EchoBot.cs#L32). 