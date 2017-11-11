import { parseInputForDowntime } from './inputParser';
import {
  scheduleDowntimeForService,
  scheduleDowntimeForHost,
} from './nagiosCommandApi';
import { isAHost } from './nagiosServiceApi';

export const handleDowntime = (bot, message) => {
  const parsedInput = parseInputForDowntime(message.text);

  if ('error' in parsedInput) {
    bot.reply(message, 'Invalid input for scheduling downtime.');
    return;
  }

  const callbackForServiceDowntime = (err, res) => {
    if (err) {
      bot.reply(
        message,
        'Service:' + parsedInput.service + ', Host:' + parsedInput.host
      );
    } else {
      bot.reply(message, 'Unable to add downtime for that service');
    }
  };

  const callbackForHostDowntime = (err, res) => {
    if (err) {
      bot.reply(message, 'Unable to add downtime for that host');
    } else {
      bot.reply(message, 'Host:' + parsedInput.host);
    }
  };

  if (isAServiceDowntimeRequest(parsedInput)) {
    scheduleDowntimeForService(
      parsedInput.host,
      parsedInput.service,
      parsedInput.duration,
      callbackForServiceDowntime
    );
  } else {
    isAHost(parsedInput.host)
      .then(() => {
        scheduleDowntimeForHost(
          parsedInput.host,
          parsedInput.duration,
          callbackForHostDowntime
        );
      })
      .catch(() => {
        bot.reply(message, "I can't seem to find that host");
      });
  }
};

const isAServiceDowntimeRequest = input => {
  return input.service !== undefined;
};
