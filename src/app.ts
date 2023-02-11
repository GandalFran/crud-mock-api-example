// Copyright 2023 Francisco Pinto-Santos (@gandalfran)
// See LICENSE for details.

"use strict";

import Cors from 'cors';
import * as Fs from "fs";
import * as Path from "path";
import * as HTTP from "http";
import Express from "express";
import * as HTTPS from "https";
import * as BodyParser from 'body-parser';

import { Log } from "./log";
import { Config } from "./config";
import { CharacterController } from "./controller/characterController";


/** Class to handle the express APIs. */
export class Application {

    /** Express application. */
    public application: Express.Express;

    /** Create an express application and configures it */
    constructor() {

        Log.setLogLevel(Config.getInstance().logLevel);

        this.application = Express();
        this.application.use(Cors());
        this.registerParsers();
        this.registerControllers();
    }

    /** Initializes the express HTTP and HTTPS servers. */
    public start() {
        if(Config.getInstance().redirect === true){
            // redirect to https
            HTTP.createServer(function(request, response){
                response.writeHead(301, { Location: 'https://' + request.headers.host + request.url });
                response.end();
            }).on("error", (e: any) => {
                Log.info(`[HTTP] ${e}`);
            }).listen(Config.getInstance().http.port, Config.getInstance().http.bind, () => {
                Log.info(`[HTTP] Application listening on http://${Config.getInstance().http.bind}:${Config.getInstance().http.port}`);
            });
        }else{
            // register http server
            HTTP.createServer(this.application).on("error", (e: any) => {
                Log.info(`[HTTP] ${e}`);
            }).listen(Config.getInstance().http.port, Config.getInstance().http.bind, () => {
                Log.info(`[HTTP] Application listening on http://${Config.getInstance().http.bind}:${Config.getInstance().http.port}`);
            });
        }

        if(Config.getInstance().https.caFile){
            // https server
            HTTPS.createServer({
                ca: Fs.readFileSync(Path.resolve(__dirname, "..", "..", Config.getInstance().https.caFile)),
                key: Fs.readFileSync(Path.resolve(__dirname, "..", "..", Config.getInstance().https.keyFile)),
                cert: Fs.readFileSync(Path.resolve(__dirname, "..", "..", Config.getInstance().https.certFile))
            }, this.application).on("error", (e: any) => {
                Log.info(`[HTTPS] ${e}`);
            }).listen(Config.getInstance().https.port, Config.getInstance().https.bind, () => {
                Log.info(`[HTTPS] Application listening on https://${Config.getInstance().https.bind}:${Config.getInstance().https.port}`);
            });
        }

    }

    /** Initialize express request parsers. */
    private registerParsers() {
        this.application.use(BodyParser.raw());
        this.application.use(BodyParser.text());
        this.application.use(BodyParser.json({ limit: "1mb" }));
        this.application.use(BodyParser.urlencoded({ limit: "1mb", extended: true }));
    }

    /** Register controllers. */
    private registerControllers() {

        // declare controllers

        const characterController = new CharacterController();

        // register controllers

        characterController.registerController(this.application);
    }
}