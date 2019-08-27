// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');
var BotConnector = require('botframework-connector');
const { ConnectorClient } = require('botframework-connector');

class MyBot extends ActivityHandler {
    constructor() {
        super();

        // onMessage() be hit after run()
        this.onMessage(async (context, next) => {
            // if only Teams channel, retrieve user information
            if(context.activity.channelId === "msteams"){
                // variable to hold user details
                let userResponse = null;
                // set the app credentials
                var credentials = new BotConnector.MicrosoftAppCredentials(
                    context.adapter.credentials.appId, 
                    context.adapter.credentials.appPassword
                );
                // initialize connector client
                var connector = new ConnectorClient(credentials, {baseUri: context.activity.serviceUrl});
                
                // enumerate the members of conversation
                /*
                connector.conversations.getConversationMembers(context.activity.conversation.id, async function(err, result)
                {
                    if(err){
                        console.log(`There is some error - ${err.message}!`);
                    }else{
                        //console.log('%s', JSON.stringify(result));
                    }
                });
                */
                var result = await connector.conversations.getConversationMembers(context.activity.conversation.id);
                userResponse = `from ${result[0].givenName} ${result[0].surname} with ${result[0].email}`;
                await context.sendActivity(`Echo: '${context.activity.text}' .. ${userResponse}`);
            }else{
                await context.sendActivity(`Echo: '${context.activity.text}'`);
            }            
            
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
