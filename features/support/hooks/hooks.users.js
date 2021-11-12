import { BeforeAll, Before, AfterAll, After, BeforeStep, AfterStep } from "@cucumber/cucumber";
import { expect } from 'chai';
import HttpRequestManager from '../../../src/common/api/http.request.manager';
import endpoints from '../../../src/resources/endpoints.json';
import payloads from '../../../src/resources/payloads.json';
import loggers from '../../../utils/loggers';

Before({ tags: "@Users" }, async function () {
    let _response = ''
    let _error = '';

    await HttpRequestManager.makeRequest('POST', endpoints.users, payloads.Users.POST)
        .then(function (response) {
            expect(response.status).to.be.equal(201)
            expect(response.statusText).to.be.equal('Created')
            _response = response
            loggers.debug("Status: " + response.status);
            loggers.debug("StatusText: " + response.statusText)
        })
        .catch(function (error) {
            _error = error;
            expect(_error.response.status).to.equal(500);
            expect(_error.response.data.code).to.equal('existing_user_login');
            loggers.error("Status: " + _error.response.status);
            loggers.error("Error Code: " + _error.response.data.code);
        })

    this.id = _response.data.id
    loggers.debug(`user ${this.id} created`)
})

After({ tags: "@Users" }, async function () {
    let _deleteId = this.id
    let _error = '';

    await HttpRequestManager.makeRequest('DELETE_USER', endpoints.userById.replace('{id}', _deleteId), payloads.Users.DELETE_USER)
        .then(function (response) {
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
            loggers.debug("Status: " + response.status);
            loggers.debug("StatusText: " + response.statusText)
            loggers.debug(`user ${_deleteId} deleted`)
        })
        .catch(function (error) {
            _error = error;
            expect(_error.response.data.code).to.equal('existing_user_login');
            loggers.error("Status: " + _error.response.status);
            loggers.error("Error Code: " + _error.response.data.code);
        })
})