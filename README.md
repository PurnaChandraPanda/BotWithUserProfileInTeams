# BotWithUserProfileInTeams

This sample would help pull user information when being called from Teams client.

## Prerequisites

- Make sure bot channels registration is ready
- Pull AppId/ Password aside
- Update those values in appsettings.json and .bot files
- Have an ngrok endpoint ready for loacal debugging
- Map that uri in bot channels registration
- Make call from Teams client in 1:1 and pull user details

## Core logic

```diff
        protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
        {
            var connector = new ConnectorClient(new Uri(turnContext.Activity.ServiceUrl),
                                            (_credentialProvider as ConfigurationCredentialProvider)?.AppId,
                                            (_credentialProvider as ConfigurationCredentialProvider)?.Password);
+            var members = await connector.Conversations.GetConversationMembersAsync(turnContext.Activity.Conversation?.Id);

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

+            var userResponse = $"from {(members?[0]).Properties["givenName"]} {(members?[0]).Properties["surname"]} with {(members?[0]).Properties["email"]}";

            await turnContext.SendActivityAsync(MessageFactory.Text($"Echo: {turnContext.Activity.Text} .. {userResponse}"), cancellationToken);
       }
```

On this sample, the logic in its entirity is in EchoBot.cs. 