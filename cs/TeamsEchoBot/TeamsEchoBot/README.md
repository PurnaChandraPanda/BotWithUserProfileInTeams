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