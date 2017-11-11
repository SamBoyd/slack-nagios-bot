import { sendPost } from './nagiosRequest';

export const acknowledgeService = (host, service, cb) => {
  const data = {
    host: host,
    service: service,
    comment: 'Service ' + service + ' acknowledged from slack',
    sticky: true,
    notify: false,
    persistent: true,
    author: 'slack-nagios-bot',
  };

  const aknowledgementEndpoint = 'acknowledge';

  sendPost(aknowledgementEndpoint, data, cb);
};

export const scheduleDowntimeForService = (host, service, downtime, cb) => {
  const data = {
    host: host,
    service: service,
    duration: downtime,
    comment: 'Downtime on service ' + service + ' scheduled from slack',
    author: 'slack-nagios-bot',
  };

  const scheduleDowntimeEndpoint = 'schedule_downtime';
  sendPost(scheduleDowntimeEndpoint, data, cb);
};

export const scheduleDowntimeForHost = (host, downtime, cb) => {
  const data = {
    host: host,
    duration: downtime,
    comment: 'Downtime on ' + host + ' scheduled from slack',
    author: 'slack-nagios-bot',
  };

  const scheduleDowntimeEndpoint = 'schedule_downtime';
  sendPost(scheduleDowntimeEndpoint, data, cb);
};
