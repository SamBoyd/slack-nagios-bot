import { describe, it } from 'mocha';
import { expect, should } from 'chai';
import nock from 'nock';

import { handleDowntime } from '../src/downtimeHandler';

describe('handleDowntime', () => {
  it('should respond with an error if the not in a valid format', done => {
    const inputText = { text: 'schedule downtime for blah blah blah' };
    const bot = {
      reply: function(originalMessage, message) {
        expect(message).to.equal('Invalid input for scheduling downtime.');
        done();
      },
    };

    handleDowntime(bot, inputText);
  });

  it('should respond with an error if the not in a valid format', done => {
    const inputText = { text: 'schedule downtime for blah blah blah' };
    const bot = {
      reply: function(originalMessage, message) {
        expect(message).to.equal('Invalid input for scheduling downtime.');
        done();
      },
    };

    handleDowntime(bot, inputText);
  });

  it('should send the correct request and reply with the correct message', done => {
    const inputText = {
      text:
        'schedule downtime for Check auction log archiving on S3 on some-host for 10',
    };
    const bot = {
      reply: function(orginalMessage, message) {
        expect(message).to.equal(
          'Service:Check auction log archiving on S3, Host:some-host'
        );
        done();
      },
    };

    const expectedPostData = {
      host: 'some-host',
      duration: '10',
      service: 'Check auction log archiving on S3',
      author: 'slack-nagios-bot',
      comment:
        'Downtime on service Check auction log archiving on S3 scheduled from slack',
    };

    const successfulResponse = {
      content: 'schedule_downtime',
      result: true,
    };

    nock('http://example.com')
      .post('/schedule_downtime', expectedPostData)
      .reply(200, successfulResponse);

    nock('http://example.com')
      .get('/status')
      .reply(200, sampleStatusReponse);

    handleDowntime(bot, inputText);
  });

  it('should send the correct request and reply with the correct message when adding downtime to host', done => {
    const inputText = { text: 'schedule downtime on some-host for 10' };
    const bot = {
      reply: function(orginalMessage, message) {
        expect(message).to.equal('Host:some-host');
        done();
      },
    };

    const expectedPostData = {
      host: 'some-host',
      duration: '10',
      author: 'slack-nagios-bot',
      comment: 'Downtime on some-host scheduled from slack',
    };

    const successfulResponse = {
      content: 'schedule_downtime',
      result: true,
    };

    nock('http://example.com')
      .post('/schedule_downtime', expectedPostData)
      .reply(200, successfulResponse);

    nock('http://example.com')
      .get('/status')
      .reply(200, sampleStatusReponse);

    handleDowntime(bot, inputText);
  });

  it('should reply with the correct message when adding downtime to an unknown host', done => {
    const inputText = { text: 'schedule downtime on not-a-host for 10' };
    const bot = {
      reply: function(orginalMessage, message) {
        expect(message).to.equal("I can't seem to find that host");
        done();
      },
    };

    nock('http://example.com')
      .get('/status')
      .reply(200, sampleStatusReponse);

    handleDowntime(bot, inputText);
  });
});

var sampleStatusReponse =
  '{\n' +
  '  "content": {\n' +
  '    "some-host": {\n' +
  '      "active_checks_enabled": "1",\n' +
  '      "current_attempt": "1",\n' +
  '      "performance_data": {},\n' +
  '      "last_hard_state": "0",\n' +
  '      "notifications_enabled": "1",\n' +
  '      "current_state": "0",\n' +
  '      "downtimes": {},\n' +
  '      "plugin_output": "NRPE v2.14",\n' +
  '      "last_check": "1509459063",\n' +
  '      "problem_has_been_acknowledged": "0",\n' +
  '      "last_state_change": "1509451221",\n' +
  '      "scheduled_downtime_depth": "0",\n' +
  '      "services": {\n' +
  '        "Upload Auction Logs to S3": {\n' +
  '          "active_checks_enabled": "0",\n' +
  '          "current_attempt": "1",\n' +
  '          "performance_data": {},\n' +
  '          "last_hard_state": "0",\n' +
  '          "notifications_enabled": "1",\n' +
  '          "current_state": "0",\n' +
  '          "downtimes": {},\n' +
  '          "plugin_output": "Successfully uploaded auction logs to S3",\n' +
  '          "last_check": "1509458447",\n' +
  '          "problem_has_been_acknowledged": "0",\n' +
  '          "last_state_change": "1509451243",\n' +
  '          "scheduled_downtime_depth": "0",\n' +
  '          "comments": {},\n' +
  '          "last_notification": "0",\n' +
  '          "max_attempts": "4"\n' +
  '        },\n' +
  '        "Check auction log archiving on S3": {\n' +
  '          "active_checks_enabled": "1",\n' +
  '          "current_attempt": "1",\n' +
  '          "performance_data": {},\n' +
  '          "last_hard_state": "0",\n' +
  '          "notifications_enabled": "1",\n' +
  '          "current_state": "0",\n' +
  '          "downtimes": {},\n' +
  '          "plugin_output": "",\n' +
  '          "last_check": "1509458997",\n' +
  '          "problem_has_been_acknowledged": "0",\n' +
  '          "last_state_change": "1509451797",\n' +
  '          "scheduled_downtime_depth": "0",\n' +
  '          "comments": {},\n' +
  '          "last_notification": "0",\n' +
  '          "max_attempts": "4"\n' +
  '        }\n' +
  '      },\n' +
  '      "comments": {},\n' +
  '      "last_notification": "0",\n' +
  '      "max_attempts": "4"\n' +
  '    }\n' +
  '  },\n' +
  '  "success": true\n' +
  '}';
