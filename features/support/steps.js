import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import HttpRequestManager from '../../src/common/api/http.request.manager';
import payloads from '../../src/resources/payloads.json'

let validCredentials = false;
let _response = '';
let data = '';
let _error= '';

Given(/^I have valid credentials$/, function () {
    validCredentials = true;
})

Given(/^I have a (.*) And (.*)$/, async function (payload, feature) {

    switch(feature){
        case 'UserById':
            data = payloads.UserById[payload]
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

    if(endpoint.includes('{id}')){
        _endpoint = endpoint.replace('{id}', this.id);
    }else{
        _endpoint = endpoint;
    }
    await HttpRequestManager.makeRequest(verb, _endpoint, data, validCredentials)
        .then(function (response) {
            _response = response;
            console.log(_response.data);
        })
        .catch(function (error) {
            _error= error;
        })
})

Then(/^the status code should be (\d+) (.*)$/, function(statusCode, statusText){
    switch (_response.status){
        
        case 200|201:
            expect(_response.status).to.equal(statusCode);
            expect(_response.statusText).to.equal(statusText);
            break;
        case 404:
            expect(_error.response.status).to.equal(statusCode);
            expect(_error.response.statusText).to.equal(statusText);
            expect(_error.response.data).to.equal(errors.NoRouteWasFound);
            expect(_error.response.data).to.equal(errors.InvalidId);
            
            break;
    }
})

Then(/^the post is created|updated|deleted$/, function(){
    expect(_response.data.id).not.to.be.undefined
    this.id = _response.data.id;
})