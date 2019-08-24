// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');
var BotConnector = require('botframework-connector');
const { ConnectorClient } = require('botframework-connector');
// var teams = require("botbuilder-teams");

class MyBot extends ActivityHandler {
    constructor(adapter) {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            
            var credentials = new BotConnector.MicrosoftAppCredentials({
                appId: adapter.appId,
                appPassword: adapter.appPassword
            });
            var connector = new ConnectorClient(credentials, {baseUri: context.activity.serviceUrl});
            connector.conversations.getConversationMembers(context.activity.conversation.id, function (err, result){
                if (err) {                    
                    console.log(`There is some error - ${err.message}!`);
                }
                else {
                    console.log('%s', JSON.stringify(result));
                }
            });
            
            /*
            var connector = new teams.TeamsChatConnector({
                appId: adapter.appId,
                appPassword: adapter.appPassword
            });
            var conversationId = context.activity.conversation.id;
            connector.fetchMembers(context.activity.serviceUrl, conversationId, function (err, result) {
                if (err) {
                    console.log('There is some error');
                }
                else {
                    console.log('%s', JSON.stringify(result));
                }
            });
            */

            await context.sendActivity(`You said '${ context.activity.text }'`);
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Hello and welcome!');
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.MyBot = MyBot;
