import { describe, it } from 'mocha';
import { expect, should } from 'chai';

import {
  parseInputForAcknowledge,
  parseInputForDowntime,
} from '../src/inputParser';

describe('parse', () => {
  describe('acknowledgement', () => {
    it('should fail to parse with an error', () => {
      let parsed = parseInputForAcknowledge('acknowledge not a valid anything');

      expect(parsed).to.have.property('error');
    });

    it('should correctly parse an acknowledgement', () => {
      let parsed = parseInputForAcknowledge(
        'acknowledge Puppet run result across all exchanges on some-host'
      );

      expect(parsed).to.have.property('service');
      expect(parsed).to.have.property('host');

      expect(parsed.service).to.equal('Puppet run result across all exchanges');
      expect(parsed.host).to.equal('some-host');
    });
  });

  describe('downtime', () => {
    it('should fail to parse with an error', () => {
      let parsed = parseInputForDowntime(
        'schedule downtime for not a valid anything'
      );

      expect(parsed).to.have.property('error');
    });

    it('should correctly parse a downtime command with a service', () => {
      let parsed = parseInputForDowntime(
        'schedule downtime for Puppet run result across all exchanges on some-host for 100'
      );

      expect(parsed).to.have.property('service');
      expect(parsed).to.have.property('host');
      expect(parsed).to.have.property('duration');

      expect(parsed.service).to.equal('Puppet run result across all exchanges');
      expect(parsed.host).to.equal('some-host');
      expect(parsed.duration).to.equal('100');
    });

    it('should correctly parse a downtime command without a service', () => {
      let parsed = parseInputForDowntime(
        'schedule downtime on some-host for 100'
      );

      expect(parsed).to.not.have.property('service');
      expect(parsed).to.have.property('host');
      expect(parsed).to.have.property('duration');

      expect(parsed.host).to.equal('some-host');
      expect(parsed.duration).to.equal('100');
    });
  });
});
