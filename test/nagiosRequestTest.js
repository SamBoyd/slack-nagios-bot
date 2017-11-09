import {describe, it} from 'mocha'
import {expect} from 'chai'

var sinon = require('sinon');
import nock from 'nock'

const superagent = require('superagent');

import {sendPost} from '../src/nagiosRequest'

describe('sendPost', () => {
    it('should send the request to the correct host and endpoint', () => {

        const expectedHost = 'http://example.com/api';
        const endpoint = 'api';

        let request = sinon.spy(superagent, 'post');

        sendPost(endpoint, expectedHost, () => {
        });

        request.restore();
        sinon.assert.calledOnce(request);
        sinon.assert.calledWith(request, expectedHost)
    });

    it('should send the correct data', done => {
        const expectedData = {body: 'some data'};
        const endpoint = 'api';

        nock('http://example.com')
            .post('/api', expectedData)
            .reply(200, {ok: true});


        sendPost(endpoint, expectedData, (err, res) => {
            expect(res.body).to.deep.equal({ok: true});
            done()
        });
    })
});