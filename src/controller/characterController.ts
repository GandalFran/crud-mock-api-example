// Copyright 2023 Francisco Pinto-Santos (@gandalfran)
// See LICENSE for details.

"use strict";

import {Request, Response, Express} from "express";


import {Log} from "../log";
import {Config} from "../config";
import {CharacterBean} from "../bean/character";
import {CharacterModel} from "../model/characterModel";
import {CharacterNotFoundException} from "../exception/characterNotFoundException";


export class CharacterController {

    private model: CharacterModel;

    public constructor(){
        this.model = new CharacterModel(Config.getInstance().charactersFile);
    }

    /**
     * Register the controller's endpoints.
     * @param application - the express aplication.
     */
    public registerController(application: Express): any {
        application.post("/character", this.create.bind(this));
        application.get("/character/:id", this.retrieve.bind(this));
        application.patch("/character/:id", this.update.bind(this));
        application.delete("/character/:id", this.delete.bind(this));
    }

    /**
     * Creates a moovie character.
     * @param request - the express request.
     * @param response - the express response.
     */
    public async create(request: Request, response: Response) {

        Log.debug('POST /character');

        // retrieve request data

        const name = request.body.name || null;
        const surname = request.body.surname || null;
        const nickname = request.body.nickname || null;
        const email = request.body.email || null;
        const phone = request.body.phone || null;
        const address = request.body.address || null;
        const active = (request.body.active === null || request.body.active === undefined) ? null :  request.body.active;

        // validate request data

        if (name === null) {
            Log.error("[CharacterController] missing parameter name.");
            response.status(400);
            response.contentType("application/json");
            response.json({error: "missing parameter name."});
            response.send();
            return;
        }

        if (surname === null) {
            Log.error("[CharacterController] missing parameter surname.");
            response.status(400);
            response.contentType("application/json");
            response.json({error: "missing parameter surname."});
            response.send();
            return;
        }

        if (nickname === null) {
            Log.error("[CharacterController] missing parameter nickname.");
            response.status(400);
            response.contentType("application/json");
            response.json({error: "missing parameter nickname."});
            response.send();
            return;
        }

        if (email === null) {
            Log.error("[CharacterController] missing parameter email.");
            response.status(400);
            response.contentType("application/json");
            response.json({error: "missing parameter email."});
            response.send();
            return;
        }

        if (phone === null) {
            Log.error("[CharacterController] missing parameter phone.");
            response.status(400);
            response.contentType("application/json");
            response.json({error: "missing parameter phone."});
            response.send();
            return;
        }

        if (address === null) {
            Log.error("[CharacterController] missing parameter address.");
            response.status(400);
            response.contentType("application/json");
            response.json({error: "missing parameter address."});
            response.send();
            return;
        }

        if (active === null) {
            Log.error("[CharacterController] missing parameter active.");
            response.status(400);
            response.contentType("application/json");
            response.json({error: "missing parameter active."});
            response.send();
            return;
        }

        // create character

        let characterId = null;

        try {
            const character = new CharacterBean(name, surname, nickname, email, phone, address, active);
            characterId = this.model.create(character);
        } catch (e) {
            Log.error("[CharacterController] Error during character creation");
            response.status(500);
            response.contentType("application/json");
            response.json({error: "unkown error, please contact the administrator"});
            response.send();
            return;
        }

        // build output

        const result = {id: characterId};

        // send result

        response.status(201);
        response.contentType("application/json");
        response.json(result);
        response.send();
    }

    /**
     * Retrieves a moovie character.
     * @param request - the express request.
     * @param response - the express response.
     */
    public async retrieve(request: Request, response: Response) {

        Log.debug('GET /character');

        // retrieve request data

        const id = request.params.id || null;
        Log.info(`recived id [${id}]`);

        // validate request data

        if (id === null) {
            Log.error("[CharacterController] missing parameter id.");
            response.status(400);
            response.contentType("application/json");
            response.json({error: "missing parameter id."});
            response.send();
            return;
        }

        // retrieve character

        let character = null;

        try {
            character = this.model.retrieveById(id);
        } catch (e) {
            if (e instanceof CharacterNotFoundException) {
                Log.error(`[CharacterController][id=${id}] Error during character fetching, character not found.`);
                response.status(404);
                response.contentType("application/json");
                response.json({error: `character with id ${id} was not found.`});
                response.send();
                return;
            } else {
                Log.error(`[CharacterController][id=${id}] Error during character fetching`);
                response.status(500);
                response.contentType("application/json");
                response.json({error: "unkown error, please contact the administrator."});
                response.send();
                return;
            }
        }

        // send result

        response.status(200);
        response.contentType("application/json");
        response.json(character);
        response.send();
    }

    /**
     * Deletes a moovie character by id.
     * @param request - the express request.
     * @param response - the express response.
     */
    public async delete(request: Request, response: Response) {

        Log.debug('DELETE /character');

        // retrieve request data

        const id = request.params.id || null;

        // validate request data

        if (id === null) {
            Log.error("[CharacterController] missing parameter id.");
            response.status(400);
            response.contentType("application/json");
            response.json({error: "missing parameter id."});
            response.send();
            return;
        }

        // delete character

        try {
            this.model.deleteById(id);
        } catch (e) {
            if (e instanceof CharacterNotFoundException) {
                Log.error(`[CharacterController][id=${id}] Error during character fetching, character not found.`);
                response.status(404);
                response.contentType("application/json");
                response.json({error: `character with id ${id} was not found.`});
                response.send();
                return;
            } else {
                Log.error(`[CharacterController][id=${id}] Error during character deleting character`);
                response.status(500);
                response.contentType("application/json");
                response.json({error: "unkown error, please contact the administrator."});
                response.send();
                return;
            }
        }

        // send result

        response.status(204);
        response.send();
    }

    /**
     * Updates a moovie character.
     * @param request - the express request.
     * @param response - the express response.
     */
    public async update(request: Request, response: Response) {

        Log.debug('PATCH /character');

        // retrieve request data

        const id = request.params.id || null;
        const name = request.body.name || null;
        const surname = request.body.surname || null;
        const nickname = request.body.nickname || null;
        const email = request.body.email || null;
        const phone = request.body.phone || null;
        const address = request.body.address || null;
        const active = (request.body.active === null || request.body.active === undefined) ? null :  request.body.active;

        // validate request data

        if (id === null) {
            Log.error("[CharacterController] missing parameter id.");
            response.status(400);
            response.contentType("application/json");
            response.json({error: "missing parameter id."});
            response.send();
            return;
        }

        if (name === null && surname === null && nickname === null && email === null && phone === null && address === null && active === null) {
            Log.error("[CharacterController] missing all parameteres of attributes to update.");
            response.status(400);
            response.contentType("application/json");
            response.json({error: "missing update parameters."});
            response.send();
            return;
        }

        // update character

        try {
            const character = new CharacterBean(name, surname, nickname, email, phone, address, active);
            this.model.updateById(id, character);
        } catch (e) {
            if (e instanceof CharacterNotFoundException) {
                Log.error(`[CharacterController][id=${id}] Error during character fetching, character not found.`);
                response.status(404);
                response.contentType("application/json");
                response.json({error: `character with id ${id} was not found.`});
                response.send();
                return;
            } else {
                Log.error(`[CharacterController][id=${id}] Error during character updating`);
                response.status(500);
                response.contentType("application/json");
                response.json({error: "unkown error, please contact the administrator"});
                response.send();
                return;
            }
        }

        // send result

        response.status(204);
        response.send();
    }

}
