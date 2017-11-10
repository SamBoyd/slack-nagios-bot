import { handleAcknowledgement } from './acknowledgeHandler'
import Botkit from 'botkit'
import auth from './auth'

const reactionIcon = (bot, message) => {
    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
    }, function (err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });
};

let controller = Botkit.slackbot({
    debug: true,
});

let bot = controller.spawn({
    token: auth.apiToken
}).startRTM();

controller.hears('acknowledge', ['direct_message', 'direct_mention', 'mention'], (bot, message) => {
    reactionIcon(bot, message);
    handleAcknowledgement(bot, message)
});
