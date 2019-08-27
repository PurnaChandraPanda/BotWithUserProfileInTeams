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

- For C# sample flow, the logic in its entirity is in [EchoBot.cs](https://github.com/PurnaChandraPanda/BotWithUserProfileInTeams/blob/master/cs/TeamsEchoBot/TeamsEchoBot/Bots/EchoBot.cs#L32).
- For .js sample flow, the logic in its entirity is in [bot.js](https://github.com/PurnaChandraPanda/BotWithUserProfileInTeams/blob/master/js/teams-echo-bot/src/bot.js#L13).
- For .ts sample flow, the logic in its entirity is in [bot.ts](https://github.com/PurnaChandraPanda/BotWithUserProfileInTeams/blob/master/ts/teams-echo-bot/src/bot.ts#L13).