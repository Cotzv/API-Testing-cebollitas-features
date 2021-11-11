import { BeforeAll, Before, AfterAll, After, BeforeStep, AfterStep } from "@cucumber/cucumber";
import { expect } from "chai";
import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from "../../../src/resources/endpoints.json";
import payloads from "../../../src/resources/payloads.json";



Before({tags: "@RetrieveById or @Update or @Delete or @NegativePosts or @Negative-Autosaves"}, async function(){
    let _response= '';
    await HttpRequestManager.makeRequest('POST', endpoints.posts, payloads.PostsById.POST)
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
    console.log(`post ${this.id} created`);
})

Before({tags: "@Negative-Autosaves"}, async function(){
    let autosavesId= this.id;
    let _response= '';
    await HttpRequestManager.makeRequest('POST', endpoints.autosaves.replace('{parent}', autosavesId), payloads.Autosaves.POST)
    .then(function(response){
        expect(response.status).to.be.equal(200);
        expect(response.statusText).to.be.equal('OK');
        _response= response;
    })
    .catch(function(error){
        console.log(error);
        throw error;
    })
})

After({tags: "@RetrieveById or @Update or @NegativePosts or @Negative-Autosaves"}, async function(){
    let _postId = this.id;
    await HttpRequestManager.makeRequest('DELETE', endpoints.postsById.replace('{id}', _postId))
    .then(function(response){
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK');
        console.log(`posts ${_postId} deleted`);
    })
    .catch(function(error){
        console.log(error);
        throw error;
    })
})

