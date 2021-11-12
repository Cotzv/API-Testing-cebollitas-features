import { BeforeAll, Before, AfterAll, After, BeforeStep, AfterStep } from "@cucumber/cucumber";
import { expect } from 'chai';
import HttpRequestManager from '../../../src/common/api/http.request.manager';
import endpoints from '../../../src/resources/endpoints.json';
import payloads from '../../../src/resources/payloads.json'

BeforeAll({ tags: "@CRUD" }, function () {
    console.log(' -- before all scenarios --')
})

Before({ tags: "@Users" }, async function () {
    let _response = ''

    await HttpRequestManager.makeRequest('POST', endpoints.users, payloads.UserById.POST)
        .then(function (response) {
            expect(response.status).to.be.equal(201)
            expect(response.statusText).to.be.equal('Created')
            _response = response
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })

    this.id = _response.data.id
    console.log(`user ${this.id} created`)
})

BeforeStep({ tags: "@CRUD" }, function () {
    console.log(' -- before step --')
})

AfterAll({ tags: "@CRUD" }, function () {
    console.log(' -- after all scenarios --')
})

After({ tags: "@Users" }, async function () {
    let _deleteId = this.id

    await HttpRequestManager.makeRequest('DELETE_USER', endpoints.userById.replace('{id}', _deleteId), payloads.UserById.DELETE_USER)
        .then(function (response) {
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
            console.log(`user ${_deleteId} deleted`)
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })
})
/*
After({ tags: "@PUT" }, async function () {
    let _putId = this.id
    await HttpRequestManager.makeRequest('DELETE', endpoints.userById.replace('{id}', _putId))
        .then(function (response) {
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
            console.log(`user ${_putId} deleted`)
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })
})*/

AfterStep({ tags: "@CRUD" }, function () {
    console.log(' -- after step --')
})