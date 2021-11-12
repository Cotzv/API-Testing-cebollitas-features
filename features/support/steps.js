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
let _error= '';

Given(/^I have valid credentials$/, function () {
    validCredentials = true;
})

Given(/^I have a (.*) payload and (.*) feature$/, async function (payload, feature) {

    switch(feature){
        case 'UserById':
            data = payloads.UserById[payload]
            break;
        case 'Posts':
            data = payloads.Posts[payload]
            break;
        case 'Categories':
            data = payloads.Categories[payload]
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

    if(endpoint.includes('{id}')){
        _endpoint = endpoint.replace('{id}', this.id);
    }else{
        _endpoint = endpoint;
    }
    await HttpRequestManager.makeRequest(verb, _endpoint, data, validCredentials)
        .then(function (response) {
            _response = response;
        })
        .catch(function (error) {
            _error= error;
        })
})

Then(/^the status code should be (\d+) (.*)$/, function(statusCode, statusText){
    if (_error) {
        expect(_error.response.status).to.equal(statusCode);
        expect(_error.response.statusText).to.equal(statusText);
    }
    else {
        expect(_response.status).to.equal(statusCode);
        expect(_response.statusText).to.equal(statusText);
    }
})

Then(/^the error code should be (.*)$/, function (errorMessage) {
    if (_error) {
        expect(_error.response.data.code).to.equal(errorMessage);
    }
})

Then(/^the post|block|category is created|updated|deleted$/, function(){
    expect(_response.data.id).not.to.be.undefined
    this.id = _response.data.id;
})

Then(/^the page is validated$/, function () {
    // const _schema = {
    //     type: "object",
    //     required: ['id'],
    //     properties: {
    //         id: { type: 'integer' },
    //     }
    // }
    expect(_response.data).to.be.jsonSchema(schema);
})