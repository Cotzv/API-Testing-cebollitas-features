import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import HttpRequestManager from '../../src/common/api/http.request.manager';
import payloads from '../../src/resources/payloads.json';
import schema from '../../src/schemas/schema.json';
const chai = require('chai');
chai.use(require('chai-json-schema-ajv'));

import errors from "../../src/resources/errors.json";

let validCredentials = false;
var _response = '';
let data = '';
let _error = '';

Given(/^I have valid credentials$/, function () {
    validCredentials = true;
});

Given(/^I have a (.*) payload and (.*) feature$/, async function (payload, feature) {

    switch (feature) {
        case 'UserById':
            data = payloads.UserById[payload]
            break;
        case 'Posts':
            data = payloads.Posts[payload]
            break;
        case 'Categories':
            data = payloads.Categories[payload]
            break;
        case 'Pages':
            data = payloads.Pages[payload]
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
    }
    else {
        expect(_response.status).to.equal(statusCode);
        expect(_response.statusText).to.equal(statusText);
    }
});

Then(/^the error code should be (.*)$/, function (errorMessage) {
    if (_error) {
        expect(_error.response.data.code).to.equal(errorMessage);
    }
})

Then(/^the post|block|category|page is created|updated|deleted$/, function () {
    expect(_response.data.id).not.to.be.undefined
    this.id = _response.data.id;
})

/**
 * Validations for Pages feature
 */

Then(/^the response should be an array$/, function () {
    expect(_response.data).to.be.an('array');
})

Then(/^the response should be an object$/, function () {
    expect(_response.data).to.be.an('object');
})

Then(/^a page has publish status$/, function () {
    if (Array.isArray(_response.data)) {
        if (_response.data.length > 0) {
            expect(_response.data[0].status).to.equal('publish');
        }
    } else {
        expect(_response.data.status).to.equal('publish');
    }
})

Then(/^the page is validated$/, function () {
    expect(_response.data).to.be.jsonSchema(schema);
})

Then(/^the response should be an empty array$/, function () {
    expect(_response.data.length).to.equal(0);
})

Then(/^the response should have 10 objects as maximum$/, function () {
    expect(_response.data.length).to.be.at.most(10);
})
