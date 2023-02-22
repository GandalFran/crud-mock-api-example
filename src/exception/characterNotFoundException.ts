// Copyright 2023 Francisco Pinto-Santos (@gandalfran)
// See LICENSE for details.

"use strict";

export class CharacterNotFoundException extends Error {
    public constructor(id: string) {
        super(`Character with ID ${id} not found`);
        this.name = "CharacterNotFoundException";
        Object.setPrototypeOf(this, CharacterNotFoundException.prototype);
    }
}