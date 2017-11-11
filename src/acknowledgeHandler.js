import { isAService } from './nagiosServiceApi';
import { acknowledgeService } from './nagiosCommandApi';
import { parseInputForAcknowledge } from './inputParser';

export const handleAcknowledgement = (bot, message) => {
  let parsedAcknowledge = parseInputForAcknowledge(message.text);

  if ('error' in parsedAcknowledge) {
    bot.reply(message, 'Invalid input for acknowledge.');
    return;
  }

  const callback = (err, res) => {
    if (res) {
      bot.reply(
        message,
        'Service:' +
          parsedAcknowledge.service +
          ', Host:' +
          parsedAcknowledge.host
      );
    } else {
      bot.reply(message, 'Unable to acknowledge that service');
    }
  };

  isAService(parsedAcknowledge.service, parsedAcknowledge.host)
    .then(() => {
      acknowledgeService(
        parsedAcknowledge.host,
        parsedAcknowledge.service,
        callback
      );
    })
    .catch(() => {
      bot.reply(message, "I can't seem to find that service");
    });
};
