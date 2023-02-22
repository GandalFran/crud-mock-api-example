// Copyright 2023 Francisco Pinto-Santos (@gandalfran)
// See LICENSE for details.

"use strict";

export interface Character {
    name: string;
    surname: string;
    nickname: string;
    email: string;
    phone: string;
    address: string;
    active: boolean;
}

export class CharacterBean implements Character {
    public name: string;
    public surname: string;
    public nickname: string;
    public email: string;
    public phone: string;
    public address: string;
    public active: boolean;

    public constructor(name: string, surname: string, nickname: string, email: string, phone: string, address: string, active: boolean) {
        this.name = name || null;
        this.surname = surname || null;
        this.nickname = nickname || null;
        this.email = email || null;
        this.phone = phone || null;
        this.address = address || null;
        this.active = (active === null || active === undefined) ? null : active;

        this.validateFields();
    }

    public update(character: Character) {
        this.name = (character.name === null) ? this.name : character.name;
        this.surname = (character.surname === null) ? this.surname : character.surname;
        this.nickname = (character.nickname === null) ? this.nickname : character.nickname;
        this.email = (character.email === null) ? this.email : character.email;
        this.phone = (character.phone === null) ? this.phone : character.phone;
        this.address = (character.address === null) ? this.address : character.address;
        this.active = (character.active === null) ? this.active : character.active;
    }

    /**
     * Validates the fields of the CharacterBean
     * @param character - Character instance
     */
    private validateFields() {
        if (this.name === "") {
            throw new Error("Name is required");
        }
        if (this.surname === "") {
            throw new Error("Surname is required");
        }
        if (this.email === "") {
            throw new Error("Email is required");
        }
        if (this.phone === "") {
            throw new Error("Phone is required");
        }
    }
}
