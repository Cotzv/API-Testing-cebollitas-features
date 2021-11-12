import {
    BeforeAll,
    Before,
    AfterAll,
    After,
    BeforeStep,
    AfterStep
} from "@cucumber/cucumber";
import { expect } from "chai";
import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from "../../../src/resources/endpoints.json";
import payloads from "../../../src/resources/payloads.json";

Before(
    {
        tags: "@Blocks-CRUD"
    },
    async function () {
        let _response = "";
        await HttpRequestManager.makeRequest(
            "POST",
            endpoints.blocks,
            payloads.BlocksById.POST
        )
            .then(function (response) {
                expect(response.status).to.be.equal(201);
                expect(response.statusText).to.be.equal("Created");
                _response = response;
            })
            .catch(function (error) {
                throw error;
            });

        this.id = _response.data.id;
    }
);
