import { MC2D20 } from "../helpers/config.mjs";
import { onManageActiveEffect, prepareActiveEffectCategories } from "../helpers/effects.mjs";
import { MCActorSheet } from "./actor-sheet.mjs";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {MCActorSheet}
 */
export class MCNPCSheet extends MCActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["mc2d20", "sheet", "actor"],
            template: "systems/mc2d20/templates/actor/npc-sheet.html",
            width: 550,
            height: 780,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "abilities" }]
        });
    }
}
