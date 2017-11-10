export const constructAcknowledgeCommand = sendPost => (host, service, cb) => {
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

export const constructServiceDowntimeCommand = sendPost => (
  host,
  service,
  duration,
  cb
) => {
  const data = {
    host: host,
    service: service,
    duration: duration,
    comment: 'Downtime on service ' + service + ' scheduled from slack',
    author: 'slack-nagios-bot',
  };

  const scheduleDowntimeEndpoint = 'schedule_downtime';
  sendPost(scheduleDowntimeEndpoint, data, cb);
};

export const constructHostDowntimeCommand = sendPost => (
  host,
  duration,
  cb
) => {
  const data = {
    host: host,
    duration: duration,
    comment: 'Downtime on ' + host + ' scheduled from slack',
    author: 'slack-nagios-bot',
  };

  const scheduleDowntimeEndpoint = 'schedule_downtime';
  sendPost(scheduleDowntimeEndpoint, data, cb);
};
