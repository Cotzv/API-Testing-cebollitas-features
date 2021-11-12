import { BeforeAll, Before, AfterAll, After, BeforeStep, AfterStep } from "@cucumber/cucumber";
import { expect } from "chai";
import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from "../../../src/resources/endpoints.json";
import payloads from "../../../src/resources/payloads.json";

Before({ tags: "@RetrieveById-Pages or @Update-Pages or @Delete-Pages" }, async function () {
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
});

Before({ tags: "@GetPagesNegative" }, async function () {
    await HttpRequestManager.makeRequest('GET', endpoints.pages)
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal('OK');
            response.data.forEach(page => {
                if (page.status === 'publish') {
                    HttpRequestManager.makeRequest('DELETE', endpoints.pagesById.replace('{id}', page.id))
                }
            });
        })
        .catch(error => {
            throw error;
        });
})

Before({ tags: "@GetMaximumPagesNegative" }, async function () {
    this.ids = [];
    payloads.Pages.TenPages.forEach(async (page) => {
        await HttpRequestManager.makeRequest('POST', endpoints.pages, page)
            .then(response => {
                expect(response.status).to.equal(201);
                expect(response.statusText).to.equal('Created');
                this.ids.push(response.data.id);
            })
            .catch(error => {
                throw error
            });
    })
})

After({ tags: "@RetrieveById-Pages" }, async function () {
    let _postId = this.id;
    await HttpRequestManager.makeRequest('DELETE', endpoints.pagesById.replace('{id}', _postId))
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal('OK');
        })
        .catch(error => {
            throw error;
        })
});

After({ tags: "@Create-Page or @Update-Pages" }, async function () {
    await HttpRequestManager.makeRequest('DELETE', endpoints.pagesById.replace('{id}', this.id))
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal('OK');
        })
        .catch(error => {
            throw error;
        })
});

After({ tags: "@GetMaximumPagesNegative" }, async function () {
    this.ids.forEach(async (id) => {
        await HttpRequestManager.makeRequest('DELETE', endpoints.pagesById.replace('{id}', id))
            .then(response => {
                expect(response.status).to.equal(200);
                expect(response.statusText).to.equal('OK');
            })
            .catch(error => {
                throw error;
            })
    });
});