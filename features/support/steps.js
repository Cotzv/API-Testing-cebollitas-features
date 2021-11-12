import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import HttpRequestManager from '../../src/common/api/http.request.manager';
import payloads from '../../src/resources/payloads.json';
import loggers from '../../utils/loggers';

let validCredentials = false;
let _response = '';
let data = '';
let _error = '';

Given(/^I have valid credentials$/, function () {
    validCredentials = true;
})
Given(/^I have invalid credentials$/, function () {
    validCredentials = true;
})

Given(/^I have a (.*) payload and (.*) feature$/, async function (payload, feature) {
    switch (feature) {
        case 'Users':
            data = payloads.Users[payload]
            break;
        case 'PostsById':
            data = payloads.PostsById[payload]
            break;
        case 'PagesById':
            data = payloads.PagesById[payload]
            break;
        case 'BlocksById':
            data = payloads.BlocksById[payload]
            break;
    }

})

When(/^I execute a (.*) request to (.*) endpoint$/, { timeout: 60 * 1000 }, async function (verb, endpoint) {
    let _endpoint = ''

    if (endpoint.includes('{id}')) {
        _endpoint = endpoint.replace('{id}', this.id);
    } else {
        _endpoint = endpoint;
    }
    await HttpRequestManager.makeRequest(verb, _endpoint, data, validCredentials)
        .then(function (response) {
            _response = response;
        })
        .catch(function (error) {
            _error = error;
        })
})
Then(/^the status code should be (\d+) (.*)$/, function (statusCode, statusText) {

    if (_error) {
        expect(_error.response.status).to.equal(statusCode);
        expect(_error.response.statusText).to.equal(statusText);
        loggers.error(_error.response.status);
        loggers.error(_error.response.statusText);
        loggers.debug(statusCode);
        loggers.debug(statusText);
    }
    else {
        expect(_response.status).to.equal(statusCode);
        expect(_response.statusText).to.equal(statusText);
        loggers.debug(_response.status);
        loggers.debug(_response.statusText);
    }
})

Then(/^the error code should be (.*)$/, function (errorMessage) {
    if (_error) {
        expect(_error.response.data.code).to.equal(errorMessage);
    }
})

Then(/^the post is created|updated|deleted$/, function () {
    expect(_response.data.id).not.to.be.undefined
    this.id = _response.data.id;
})