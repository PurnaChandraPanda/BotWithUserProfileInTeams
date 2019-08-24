// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
//
// Generated with Bot Builder V4 SDK Template for Visual Studio EchoBot v4.3.0

using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Connector;
using Microsoft.Bot.Connector.Authentication;
using Microsoft.Bot.Schema;

namespace TeamsEchoBot.Bots
{
    public class EchoBot : ActivityHandler
    {
        // this property is added to pull AppId Password information via Middleware DI for type - ICredentialProvider
        private readonly ICredentialProvider _credentialProvider;

        public EchoBot(ICredentialProvider credentialProvider)
        {
            _credentialProvider = credentialProvider;
        }

        protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
        {
            string userResponse = string.Empty;

            // if only Teams channel, retrieve user information
            if (turnContext.Activity.ChannelId == "msteams")
            {
                // initialize ConnectorClient
                var connector = new ConnectorClient(new Uri(turnContext.Activity.ServiceUrl),
                                                (_credentialProvider as ConfigurationCredentialProvider)?.AppId,
                                                (_credentialProvider as ConfigurationCredentialProvider)?.Password);

                // pull members which are part of this conversation from Teams
                var members = await connector.Conversations.GetConversationMembersAsync(turnContext.Activity.Conversation?.Id);

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

                userResponse = $"from {(members?[0]).Properties["givenName"]} {(members?[0]).Properties["surname"]} with {(members?[0]).Properties["email"]}";
            }

            await turnContext.SendActivityAsync(MessageFactory.Text($"Echo: {turnContext.Activity.Text} .. {userResponse}"), cancellationToken);
        }

        protected override async Task OnMembersAddedAsync(IList<ChannelAccount> membersAdded, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
        {
            foreach (var member in membersAdded)
            {
                if (member.Id != turnContext.Activity.Recipient.Id)
                {
                    await turnContext.SendActivityAsync(MessageFactory.Text($"Hello and Welcome!"), cancellationToken);
                }
            }
        }
    }
}
