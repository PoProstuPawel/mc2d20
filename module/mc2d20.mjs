// Import document classes.
import { MCActor } from "./documents/actor.mjs";
import { MCItem } from "./documents/item.mjs";
// Import sheet classes.
import { MCActorSheet } from "./sheets/actor-sheet.mjs";
import { MCNPCSheet } from "./sheets/npc-sheet.mjs";
import { MCVehicleSheet } from "./sheets/vehicle-sheet.mjs";
import { MCItemSheet } from "./sheets/item-sheet.mjs";
// Import helper/utility classes and constants.
import { MC2D20 } from "./helpers/config.mjs";
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { registerHandlebarsHelpers } from "./helpers/handlebars.mjs"
//Import Roll2D20
import { Roller2D20 } from "./roller/mc2d20-roller.mjs"
import { Dialog2d20 } from './roller/dialog2d20.js'
import { DialogD6 } from './roller/dialogD6.js'
import DieMCChallenge from './roller/challengeDie.js'
//Settings
import { registerSettings } from './settings.js';
//Momentum
import { MomentumTracker } from './app/momentum-tracker.mjs'

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */
registerHandlebarsHelpers();


Hooks.once('init', async function () {
    // Add utility classes to the global game object so that they're more easily
    // accessible in global contexts.

    game.mc2d20 = {
        MCActor,
        MCItem,
        Roller2D20,
        Dialog2d20,
        DialogD6
    };

    // Add custom constants for configuration.
    CONFIG.MC2D20 = MC2D20;

    /**
   * Set an initiative formula for the system
   * @type {String}
   */
    CONFIG.Combat.initiative = {
        formula: "1",
        decimals: 0
    };

    // Define custom Document classes
    CONFIG.Actor.documentClass = ACActor;
    CONFIG.Item.documentClass = ACItem;
    CONFIG.Dice.terms["s"] = DieACChallenge;

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("mc2d20", ACActorSheet, { types: ["character"], makeDefault: true });
    Actors.registerSheet("mc2d20", ACNPCSheet, { types: ["npc"], makeDefault: true });
    Actors.registerSheet("mc2d20", ACVehicleSheet, { types: ["vehicle"], makeDefault: true });
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("mc2d20", ACItemSheet, { makeDefault: true });

    // Register custom system settings
    registerSettings();

    return preloadHandlebarsTemplates();
});


Hooks.on('renderChatMessage', (message, html, data) => {
    let rrlBtn = html.find('.reroll-button');
    if (rrlBtn.length > 0) {
        rrlBtn[0].setAttribute('data-messageId', message.id);
        rrlBtn.click((el) => {
            //let selectedDiceForReroll = $(el.currentTarget).parent().find('.dice-selected');
            let selectedDiceForReroll = html.find('.dice-selected');
            let rerollIndex = [];
            for (let d of selectedDiceForReroll) {
                rerollIndex.push($(d).data('index'));
            }
            if (!rerollIndex.length) {
                ui.notifications.notify('Select Dice you want to Reroll');
            }
            else {
                let mc2d20Roll = message.data.flags.mc2d20roll;
                if (mc2d20Roll.diceFace == "d20") {
                    Roller2D20.rerollD20({
                        rollname: mc2d20Roll.rollname,
                        rerollIndexes: rerollIndex,
                        successTreshold: mc2d20Roll.successTreshold,
                        critTreshold: mc2d20Roll.critTreshold,
                        complicationTreshold: mc2d20Roll.complicationTreshold,
                        dicesRolled: mc2d20Roll.dicesRolled
                    });
                } else if (mc2d20Roll.diceFace == "d6") {
                    Roller2D20.rerollD6({
                        rollname: mc2d20Roll.rollname,
                        rerollIndexes: rerollIndex,
                        dicesRolled: mc2d20Roll.dicesRolled,
                        itemId: message.data.flags.itemId,
                        actorId: message.data.flags.actorId,
                    });
                } else {
                    ui.notifications.notify('No dice face reckognized');
                }

            }
        })
    }
    html.find('.dice-icon').click((el) => {
        //if ($(el.currentTarget).hasClass('reroll'))
        //return;
        if ($(el.currentTarget).hasClass('dice-selected')) {
            $(el.currentTarget).removeClass('dice-selected');
        } else {
            $(el.currentTarget).addClass('dice-selected')
        }
    });
    let addBtn = html.find('.add-button');
    if (addBtn.length > 0) {
        addBtn[0].setAttribute('data-messageId', message.id);
        addBtn.click((ev) => {
            let mc2d20Roll = message.data.flags.mc2d20roll;
            let itemId = message.data.flags.itemId;
            let actorId = message.data.flags.actorId;
            game.mc2d20.DialogD6.createDialog({ rollname: mc2d20Roll.rollname, diceNum: 1, mc2d20Roll: mc2d20Roll, itemId: itemId, actorId: actorId })
        });
    }

});



/* -------------------------------------------- */
/*  DICE SO NICE                                */
/* -------------------------------------------- */

Hooks.once("diceSoNiceReady", (dice3d) => {
    dice3d.addSystem(
        { id: "mc2d20", name: "Achtung Cthulhu 2d20" },
        true
    );

    dice3d.addColorset(
        {
            name: "mc2d20",
            description: "Achtung Cthulhu 2d20",
            category: "Colors",
            foreground: "#000000",
            background: "#000000",
            outline: "#000000",
            texture: "none",
        }
    );

    dice3d.addDicePreset({
        type: "ds",
        labels: [
            "systems/mc2d20/assets/dice/d1.webp",
            "systems/mc2d20/assets/dice/d2.webp",
            "systems/mc2d20/assets/dice/d3.webp",
            "systems/mc2d20/assets/dice/d4.webp",
            "systems/mc2d20/assets/dice/d5.webp",
            "systems/mc2d20/assets/dice/d6.webp",
        ],
        system: "mc2d20",
        colorset: "mc2d20"
    });
});
