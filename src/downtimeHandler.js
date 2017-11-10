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

  if (parsedInput.service) {
    scheduleDowntimeForService(
      parsedInput.host,
      parsedInput.service,
      parsedInput.duration,
      (err, res) => {
        if (err) {
          console.log('', err);
          bot.reply(message, 'Unable to add downtime for that service');
        } else {
          bot.reply(
            message,
            'Service:' + parsedInput.service + ', Host:' + parsedInput.host
          );
        }
      }
    );
  } else {
    isAHost(parsedInput.host)
      .then(() => {
        scheduleDowntimeForHost(
          parsedInput.host,
          parsedInput.duration,
          (err, res) => {
            if (err) {
              bot.reply(message, 'Unable to add downtime for that host');
            } else {
              bot.reply(message, 'Host:' + parsedInput.host);
            }
          }
        );
      })
      .catch(() => {
        bot.reply(message, "I can't seem to find that host");
      });
  }
};
