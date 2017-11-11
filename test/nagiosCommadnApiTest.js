import { describe, it } from 'mocha';
import { expect, should } from 'chai';
var td = require('testdouble');

import {
  acknowledgeService,
  scheduleDowntimeForService,
  scheduleDowntimeForHost,
} from '../src/nagiosCommandApi';

import * as nr from '../src/nagiosRequest';

describe('nagiosCommandApi', () => {
  afterEach(function() {
    td.reset();
  });

  describe('acknowledgeService', () => {
    it('should send request to the correct endpoint', () => {
      const validInput = { host: 'some host', service: 'some service' };
      const expectedEndpoint = 'acknowledge';

      let send = td.replace(nr, 'sendPost');

      acknowledgeService(validInput.host, validInput.service, () => {});

      td.verify(
        send(expectedEndpoint, td.matchers.anything(), td.matchers.anything())
      );
    });

    it('should send the correct data blob', () => {
      const validInput = { host: 'some host', service: 'some service' };
      const expectedData = {
        host: 'some host',
        service: 'some service',
        comment: 'Service some service acknowledged from slack',
        sticky: true,
        notify: false,
        persistent: true,
        author: 'slack-nagios-bot',
      };

      let send = td.replace(nr, 'sendPost');

      acknowledgeService(validInput.host, validInput.service, () => {});

      td.verify(
        send(td.matchers.anything(), expectedData, td.matchers.anything())
      );
    });

    it('should pass callback down to the request', () => {
      const validInput = { host: 'some host', service: 'some service' };
      const callback = (err, res) => {};

      let send = td.replace(nr, 'sendPost');

      acknowledgeService(validInput.service, validInput.host, callback);

      td.verify(send(td.matchers.anything(), td.matchers.anything(), callback));
    });
  });

  describe('scheduleDowntimeForService', () => {
    it('should send request to the correct endpoint', () => {
      const validInput = {
        host: 'some host',
        service: 'some service',
        duration: '100',
      };
      const expectedEndpoint = 'schedule_downtime';

      let send = td.replace(nr, 'sendPost');

      scheduleDowntimeForService(
        validInput.host,
        validInput.service,
        validInput.duration,
        () => {}
      );

      td.verify(
        send(expectedEndpoint, td.matchers.anything(), td.matchers.anything())
      );
    });

    it('should send the correct data blob for adding downtime to a service', () => {
      const validInput = {
        host: 'some host',
        service: 'some service',
        duration: '100',
      };
      const expectedData = {
        host: 'some host',
        service: 'some service',
        duration: '100',
        comment: 'Downtime on service some service scheduled from slack',
        author: 'slack-nagios-bot',
      };

      let send = td.replace(nr, 'sendPost');

      scheduleDowntimeForService(
        validInput.host,
        validInput.service,
        validInput.duration,
        () => {}
      );

      td.verify(
        send(td.matchers.anything(), expectedData, td.matchers.anything())
      );
    });

    it('should pass callback down to the request', () => {
      const validInput = {
        host: 'some host',
        service: 'some service',
        duration: '100',
      };

      const callback = (err, res) => {};

      let send = td.replace(nr, 'sendPost');

      scheduleDowntimeForService(
        validInput.host,
        validInput.service,
        validInput.duration,
        callback
      );

      td.verify(send(td.matchers.anything(), td.matchers.anything(), callback));
    });
  });

  describe('scheduleDowntimeForHost', () => {
    it('should send request to the correct endpoint', () => {
      const validInput = {
        host: 'some host',
        duration: '100',
      };
      const expectedEndpoint = 'schedule_downtime';

      let send = td.replace(nr, 'sendPost');

      scheduleDowntimeForHost(validInput.host, validInput.duration, () => {});

      td.verify(
        send(expectedEndpoint, td.matchers.anything(), td.matchers.anything())
      );
    });

    it('should send the correct data blob for adding downtime to a host', () => {
      const validInput = {
        host: 'some host',
        duration: '100',
      };
      const expectedData = {
        host: 'some host',
        duration: '100',
        comment: 'Downtime on some host scheduled from slack',
        author: 'slack-nagios-bot',
      };

      let send = td.replace(nr, 'sendPost');

      scheduleDowntimeForHost(validInput.host, validInput.duration, () => {});

      td.verify(
        send(td.matchers.anything(), expectedData, td.matchers.anything())
      );
    });

    it('should pass callback down to the request', () => {
      const validInput = {
        host: 'some host',
        duration: '100',
      };

      const callback = (err, res) => {};

      let send = td.replace(nr, 'sendPost');

      scheduleDowntimeForHost(validInput.host, validInput.duration, callback);

      td.verify(send(td.matchers.anything(), td.matchers.anything(), callback));
    });
  });
});
