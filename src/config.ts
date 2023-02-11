// Copyright 2023 Francisco Pinto-Santos (@gandalfran)
// See LICENSE for details.

"use strict";


import { Log } from "./log";


/** Class to store the express HTTP server configuration. */
export class HttpConfig {

    /** The HTTP listen port. */
    public port: number;
    /** The HTTP listen address. */
    public bind: string;

    /**
     * Create a HttpConfig.
     */
    constructor() {
        this.port = 0;
        this.bind = "";
    }
}

/** Class to store the express HTTPS server configuration. */
export class HttpsConfig extends HttpConfig{

    /** The HTTPS certification authority file. */
    public caFile: string;
    /** The HTTPS certificate's key file. */
    public keyFile: string;
    /** The HTTPS certificate file. */
    public certFile: string;

    /**
     * Create a HttpsConfig.
     */
    constructor() {
        super();
        this.caFile = "";
        this.keyFile = "";
        this.certFile = "";
    }
}

export class Config {

    private static instance: Config = null;
    public static getInstance(): Config {
        if (! Config.instance) {
            Config.instance = Config.buildConfig();
        }
        return Config.instance;
    }

    public static buildConfig(): Config {
        const config: Config = new Config();
        Config.load(config);
        return config;
    }

    private static load(config: Config){

        // load other info
        config.logLevel = process.env.LOG_LEVEL || 'INFO';
        config.redirect = Boolean(process.env.REDIRECT) || false;
        config.charactersFile = process.env.CHARACTERS_FILE || 'characters.json';

        // load http info
        config.http = new HttpConfig();
        config.http.port = Number(process.env.HTTP_PORT) || 80;
        config.http.bind = process.env.HTTP_BIND || '0.0.0.0';

        // load https info
        config.https = new HttpsConfig();
        config.https.port = Number(process.env.HTTPS_PORT) || 443;
        config.https.bind = process.env.HTTPS_BIND || '0.0.0.0';
        config.https.caFile = process.env.HTTPS_CA_FILE || null;
        config.https.keyFile = process.env.HTTPS_KEY_FILE || null;
        config.https.certFile = process.env.HTTPS_CERT_FILE || null;
    }

    /** redirect configuration. */
    public redirect: boolean;
    /** logger configuration. */
    public logLevel: string;
    /** characters file configuration. */
    public charactersFile: string;
    /** HTTP configuration. */
    public http: HttpConfig;
    /** HTTPS configuration. */
    public https: HttpsConfig;
}
