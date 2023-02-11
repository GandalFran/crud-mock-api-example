// Copyright 2023 Francisco Pinto-Santos (@gandalfran)
// See LICENSE for details.

import { Log } from "./src/log";
import { Application } from "./src/app";

// start crash guard
process.on("uncaughtException", function(e: Error){
	Log.error(`[NOT CONTROLLED EXCEPTION]`, e);
});

// start application
const app: Application = new Application();
app.start();
