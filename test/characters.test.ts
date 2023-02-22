// Copyright 2023 Francisco Pinto Santos @ GandalFran in GitHub
// See LICENSE for details.


import request from "supertest";
import { Config } from "../src/config";
import { Application } from "../src/app";


const app = new Application();


test("test creation", async () => {

    // create character

    const createResponse = await request(app.application).post("/character").send({
        "name": "Gandalf",
        "surname": "The Grey",
        "nickname": "Gandalf the Grey",
        "email": "gandalf@middleearth.com",
        "phone": "555-555-1212",
        "address": "The Shire",
        "active": true
    });

    expect(createResponse.status).toEqual(201);
    expect(createResponse.type).toEqual('application/json');
    expect(createResponse.body.id).not.toBeNull();

});

test("test successfull retrieval", async () => {

    // create character

    const createResponse = await request(app.application).post("/character").send({
        "name": "Saruman",
        "surname": "of Many Colors",
        "nickname": "The White",
        "email": "saruman@isengard.com",
        "phone": "555-555-1213",
        "address": "Isengard, Fangorn, Rohan",
        "active": true
    });
    expect(createResponse.status).toEqual(201);
    expect(createResponse.type).toEqual('application/json');
    expect(createResponse.body.id).not.toBeNull();

    // retrieve 

    const retrieveResponse = await request(app.application).get(`/character/${createResponse.body.id}`)
    expect(retrieveResponse.status).toEqual(200);
    expect(retrieveResponse.type).toEqual('application/json');
    expect(retrieveResponse.body.name).toEqual('Saruman');
    expect(retrieveResponse.body.surname).toEqual('of Many Colors');
    expect(retrieveResponse.body.nickname).toEqual('The White');
    expect(retrieveResponse.body.email).toEqual('saruman@isengard.com');
    expect(retrieveResponse.body.phone).toEqual('555-555-1213');
    expect(retrieveResponse.body.address).toEqual('Isengard, Fangorn, Rohan');
    expect(retrieveResponse.body.active).toEqual(true);

});

test("test successfull update", async () => {

    // create character

    const createResponse = await request(app.application).post("/character").send({
        "name": "Frodo",
        "surname": "Baggins",
        "nickname": "Ring-bearer",
        "email": "frodo@thefellowship.com",
        "phone": "555-555-1212",
        "address": "Bag End, Hobbiton, Shire",
        "active": true
    });
    expect(createResponse.status).toEqual(201);
    expect(createResponse.type).toEqual('application/json');
    expect(createResponse.body.id).not.toBeNull();

    // update

    const updateResponse = await request(app.application).patch(`/character/${createResponse.body.id}`).send({
        "name": "not Frodo",
        "surname": "not Baggins",
        "nickname": "not Ring-bearer",
        "active": false
    });
    expect(updateResponse.status).toEqual(204);

    // retrieve 

    const retrieveResponse = await request(app.application).get(`/character/${createResponse.body.id}`)
    expect(retrieveResponse.status).toEqual(200);
    expect(retrieveResponse.type).toEqual('application/json');
    expect(retrieveResponse.body.name).toEqual('not Frodo');
    expect(retrieveResponse.body.surname).toEqual('not Baggins');
    expect(retrieveResponse.body.nickname).toEqual('not Ring-bearer');
    expect(retrieveResponse.body.email).toEqual('frodo@thefellowship.com');
    expect(retrieveResponse.body.phone).toEqual('555-555-1212');
    expect(retrieveResponse.body.address).toEqual('Bag End, Hobbiton, Shire');
    expect(retrieveResponse.body.active).toEqual(false);
});

test("test sucessfull deletion", async () => {

    const createResponse = await request(app.application).post("/character").send({
        "name": "Bilbo",
        "surname": "Baggins",
        "nickname": "Bilbo the Hobbit",
        "email": "bilbo@thefellowship.com",
        "phone": "555-555-1212",
        "address": "Bag End, Hobbiton, Shire",
        "active": true
    });
    expect(createResponse.status).toEqual(201);
    expect(createResponse.type).toEqual('application/json');
    expect(createResponse.body.id).not.toBeNull();

    // delete character

    const deleteResponse = await request(app.application).delete(`/character/${createResponse.body.id}`);
    expect(deleteResponse.status).toEqual(204);

    // check if character was deleted

    const retrieveResponse = await request(app.application).get(`/character/${createResponse.body.id}`);
    expect(retrieveResponse.status).toEqual(404);
    expect(retrieveResponse.type).toEqual('application/json');
});

test("test failed retrieval", async () => {
    let failedResponse = await request(app.application).get("/character/not-a-uuid");
    expect(failedResponse.status).toEqual(404);
    expect(failedResponse.type).toEqual('application/json');
});

test("test failed update", async () => {
    let failedResponse = await request(app.application).patch("/character/not-a-uuid").send({active: false});
    expect(failedResponse.status).toEqual(404);
    expect(failedResponse.type).toEqual('application/json');
});

test("test failed update (with no arguments)", async () => {
    
    // create character

    const createResponse = await request(app.application).post("/character").send({
        "name": "Frodo",
        "surname": "Baggins",
        "nickname": "Ring-bearer",
        "email": "frodo@thefellowship.com",
        "phone": "555-555-1212",
        "address": "Bag End, Hobbiton, Shire",
        "active": true
    });
    expect(createResponse.status).toEqual(201);
    expect(createResponse.type).toEqual('application/json');
    expect(createResponse.body.id).not.toBeNull();

    // update

    const updateResponse = await request(app.application).patch(`/character/${createResponse.body.id}`).send();
    expect(updateResponse.status).toEqual(400);
});

test("test failed deletion", async () => {
    let failedResponse = await request(app.application).delete("/character/not-a-uuid");
    expect(failedResponse.status).toEqual(404);
    expect(failedResponse.type).toEqual('application/json');
});