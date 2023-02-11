// Copyright 2023 Francisco Pinto Santos @ GandalFran in GitHub
// See LICENSE for details.

"use strict";

/**
 * Available loglevels
 */
export enum LogLevel {
    DEBUG = 1,
    INFO = 2,
    WARNING = 3,
    ERROR = 4,
    NONE = 5
}

/**
 * Class for logging purposes
 */
export class Log {

   /**
    * The loglevel set
    */
    private static logLevel : LogLevel;

   /**
    * Logs information.
    * @param msg - the message to write to standar output
    */
    private static log(msg: string) {
        console.log(`[${Log.getDate()}] ${msg}`);
    }

   /**
    * Formats the current date and time to display it on window.
    * @return a string with current date and time in the desired format.
    */
    private static getDate():string {
        return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }

   /**
    * Sets current log level.
    * @param level - a string with the loglevel to set.
    */
    public static setLogLevel(level: string){
        switch (level) {
            case "NONE":
                Log.log(`[INFO] loglevel set to ${level}`);
                Log.logLevel = LogLevel.NONE;
                break;
            case "DEBUG":
                Log.log(`[INFO] loglevel set to ${level}`);
                Log.logLevel = LogLevel.DEBUG;
                break;
            case "INFO":
                Log.log(`[INFO] loglevel set to ${level}`);
                Log.logLevel = LogLevel.INFO;
                break;
            case "WARNING":
                Log.log(`[INFO] loglevel set to ${level}`);
                Log.logLevel = LogLevel.WARNING;
                break;
            case "ERROR":
                Log.log(`[INFO] loglevel set to ${level}`);
                Log.logLevel = LogLevel.ERROR;
                break;
            default:
                Log.logLevel = LogLevel.NONE;
                Log.log(`[ERROR] Given log level ${level} not found, using NONE instead`);
        }
    }

   /**
    * To log debug level information
    * @param msg - the message to log.
    */
    public static debug(msg: string) {
        if(Log.logLevel <= LogLevel.DEBUG){
            Log.log(`[DEBUG] ${msg}`);
        }
    }

   /**
    * To log info level information
    * @param msg - the message to log.
    */
    public static info(msg: string) {
        if(Log.logLevel <= LogLevel.INFO){
            Log.log(`[INFO] ${msg}`);
        }
    }

   /**
    * To log warning level information
    * @param msg - the message to log.
    */
    public static warning(msg: string) {
        if(Log.logLevel <= LogLevel.WARNING){
            Log.log(`[WARNING] ${msg}`);
        }
    }

   /**
    * To log error level information
    * @param msg - the message to log.
    * @param e - the error to log associated to msg.
    */
    public static error(msg: string, e?: Error) {
        if(Log.logLevel <= LogLevel.ERROR){
            if(e){
                Log.log(`[ERROR] ${msg}\nException ${e.name}: ${e.message} \n ${e.stack}`);
            }else{
                Log.log(`[ERROR] ${msg}`);
            }
        }
    }

   /**
    * To log exceptions at error level
    * @param err - the exception to log
    */
    public static exception(err: Error) {
        if(Log.logLevel <= LogLevel.ERROR){
            Log.log(`[ERROR] ${err.message} \n ${err.stack}`);
        }
    }

}