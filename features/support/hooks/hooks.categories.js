import { BeforeAll, Before, AfterAll, After, BeforeStep, AfterStep } from "@cucumber/cucumber";
import { expect } from "chai";
import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from "../../../src/resources/endpoints.json";
import payloads from "../../../src/resources/payloads.json";

Before({tags: "@RetrieveById-Categories or @Update-Categories or @Delete-Categories or @NegativeCategories"}, async function(){
    let _response= '';
    await HttpRequestManager.makeRequest('POST', endpoints.categories, payloads.Categories.POST)
    .then(function(response){
        expect(response.status).to.be.equal(201);
        expect(response.statusText).to.be.equal('Created');
        _response= response;
    })
    .catch(function(error){
        console.log(error);
        throw error;
    })
    this.id = _response.data.id;
    console.log(`category ${this.id} created`);
})

After({tags: "@Create-Categories or @RetrieveById-Categories or @Update-Categories or @NegativeCategories"}, async function(){
    let _postId = this.id;
    await HttpRequestManager.makeRequest('DELETE_CATEGORY', endpoints.categoriesById.replace('{id}', _postId), payloads.Categories.DELETE_CATEGORY)
    .then(function(response){
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK');
        console.log(`category ${_postId} deleted`);
    })
    .catch(function(error){
        console.log(error);
        throw error;
    })
})
