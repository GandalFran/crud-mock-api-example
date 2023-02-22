// Copyright 2023 Francisco Pinto-Santos (@gandalfran)
// See LICENSE for details.

"use strict";

import * as fs from "fs";

import { v4 as uuidv4 } from 'uuid';
import {Log} from "../log";
import {Config} from "../config";
import {CharacterBean} from "../bean/character";
import {CharacterNotFoundException} from "../exception/characterNotFoundException";


export class CharacterModel {

    private characters: { [key: string]: CharacterBean };
    private filePath: string;

    public constructor(filePath?: string) {
        if (filePath) {
            this.filePath = filePath;
        } else {
            this.filePath = "characters.json";
        }
        this.characters = this.load();
    }

    /**
     * Retrieves a new character
     * @param id - id of the character to retrieve
     */
    public retrieveById(id: string): CharacterBean {

        if (!(id in this.characters)) {
            throw new CharacterNotFoundException(id);
        }

        const character = this.characters[id];

        return character;
    }

    /**
     * Adds a new character
     * @param character - Character instance
     */
    public create(character: CharacterBean): string {

        const id = uuidv4();

        this.characters[id] = character;
        this.save();

        return id;
    }

    /**
     * Updates a character by id
     * @param id - id of the character to update
     * @param character - Character instance with updated information
     */
    public updateById(id: string, character: CharacterBean): void {

        if (!(id in this.characters)) {
            throw new CharacterNotFoundException(id);
        }

        const currentCharacter = this.characters[id];
        currentCharacter.update(character);
        this.save();
    }

    /**
     * Deletes a character by id
     * @param id - id of the character to delete
     */
    public deleteById(id: string): void {

        if (!(id in this.characters)) {
            throw new CharacterNotFoundException(id);
        }
        delete this.characters[id];
        this.save();
    }

    /**
     * Loads the data from the JSON file
     */
    private load() {
        if (!fs.existsSync(this.filePath)) {
          Log.info('[CharacterModel] model field not found, another one is beign created.')
          fs.writeFileSync(this.filePath, '{}');
        }

        try {
            const data = fs.readFileSync(this.filePath, "utf-8");
            return Object.fromEntries(
                Object.entries(JSON.parse(data)).map((d) => {

                    const id: any = d[0];
                    const c: any = d[1];

                    const name = c.name || null;
                    const surname = c.surname || null;
                    const nickname = c.nickname || null;
                    const email = c.email || null;
                    const phone = c.phone || null;
                    const address = c.address || null;
                    const active = (c.active === null || c.active === undefined) ? null : c.active;

                    const character = new CharacterBean(name, surname, nickname, email, phone, address, active);

                    return [id, character];
                })
            );
        } catch (e) {
            Log.warning('[CharacterModel] error on data file loading.');
            throw new Error(`Error loading data from file: ${e}`);
        }
    }


    /**
     * Saves the data from the JSON file
     */
    private save() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.characters), 'utf-8');
        } catch (e) {
            Log.warning('[CharacterModel] error on data file saving.');
            throw new Error(`Error saving data to file: ${e}`);
        }
    }
}
