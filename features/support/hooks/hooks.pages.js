import { BeforeAll, Before, AfterAll, After, BeforeStep, AfterStep } from "@cucumber/cucumber";
import { expect } from "chai";
import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from "../../../src/resources/endpoints.json";
import payloads from "../../../src/resources/payloads.json";

Before({ tags: "@GETDATA" }, async function () {
    console.log(' -- BEFORE SCENARIO --');
    let _response = ''
    await HttpRequestManager.makeRequest('POST', endpoints.pages, payloads.Pages.POST)
        .then(response => {
            expect(response.status).to.equal(201);
            expect(response.statusText).to.equal('Created');
            _response = response;
        })
        .catch(error => {
            throw error;
        })
    this.id = _response.data.id;
    console.log(`The project ${this.id} was created`)
});

After({ tags: "@POST" }, async function () {
    console.log(' -- AFTER SCENARIO DELETE--');
    let _postId = this.id;
    await HttpRequestManager.makeRequest('DELETE', endpoints.pagesById.replace('{id}', _postId))
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal('OK');
            console.log(`project ${_postId} deleted`);
        })
        .catch(error => {
            console.log(error);
            throw error;
        })
});

After({ tags: "@PUT" }, async function () {
    console.log(' -- AFTER SCENARIO DELETE--');
    let _putId = this.id;
    await HttpRequestManager.makeRequest('DELETE', endpoints.Pages.pagesById.replace('{id}', _putId))
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal('OK');
            console.log(`project ${_putId} deleted`);
        })
        .catch(error => {
            console.log(error);
            throw error;
        })
});
