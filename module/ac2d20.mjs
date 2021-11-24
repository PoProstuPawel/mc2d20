// Import document classes.
import { ACActor } from "./documents/actor.mjs";
import { ACItem } from "./documents/item.mjs";
// Import sheet classes.
import { ACActorSheet } from "./sheets/actor-sheet.mjs";
import { ACItemSheet } from "./sheets/item-sheet.mjs";
// Import helper/utility classes and constants.
import { AC2D20 } from "./helpers/config.mjs";
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { registerHandlebarsHelpers } from "./helpers/handlebars.mjs"
//Import Roll2D20
import { Roller2D20 } from "./roller/ac2d20-roller.mjs"
import { Dialog2d20 } from './roller/dialog2d20.js'
import { DialogD6 } from './roller/dialogD6.js'
import DieACChallenge from './roller/challengeDie.js'

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */
registerHandlebarsHelpers();


Hooks.once('init', async function () {
    // Add utility classes to the global game object so that they're more easily
    // accessible in global contexts.
    console.warn('INIT')
    game.ac2d20 = {
        ACActor,
        ACItem,
        Roller2D20,
        Dialog2d20,
        DialogD6
    };

    // Add custom constants for configuration.
    CONFIG.AC2D20 = AC2D20;

    /**
   * Set an initiative formula for the system
   * @type {String}
   */
    CONFIG.Combat.initiative = {
        formula: "2d20",
        decimals: 0
    };

    // Define custom Document classes
    CONFIG.Actor.documentClass = ACActor;
    CONFIG.Item.documentClass = ACItem;
    CONFIG.Dice.terms["p"] = DieACChallenge;

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("ac2d20", ACActorSheet, { makeDefault: true });
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("ac2d20", ACItemSheet, { makeDefault: true });

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
                let ac2d20Roll = message.data.flags.ac2d20roll;
                if (ac2d20Roll.diceFace == "d20") {
                    Roller2D20.rerollD20({
                        rollname: ac2d20Roll.rollname,
                        rerollIndexes: rerollIndex,
                        successTreshold: ac2d20Roll.successTreshold,
                        critTreshold: ac2d20Roll.critTreshold,
                        complicationTreshold: ac2d20Roll.complicationTreshold,
                        dicesRolled: ac2d20Roll.dicesRolled
                    });
                } else if (ac2d20Roll.diceFace == "d6") {
                    Roller2D20.rerollD6({
                        rollname: ac2d20Roll.rollname,
                        rerollIndexes: rerollIndex,
                        dicesRolled: ac2d20Roll.dicesRolled,
                        weapon: message.data.flags.weapon
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
            let ac2d20Roll = message.data.flags.ac2d20roll;
            let weapon = message.data.flags.weapon;
            game.ac2d20.DialogD6.createDialog({ rollname: ac2d20Roll.rollname, diceNum: 1, ac2d20Roll: ac2d20Roll, weapon: weapon })
        });
    }

});



/* -------------------------------------------- */
/*  DICE SO NICE                                */
/* -------------------------------------------- */

Hooks.once("diceSoNiceReady", (dice3d) => {
    dice3d.addSystem(
        { id: "ac2d20", name: "Achtung Cthulhu 2d20" },
        true
    );

    dice3d.addColorset(
        {
            name: "ac2d20",
            description: "Achtung Cthulhu 2d20",
            category: "Colors",
            foreground: "#000000",
            background: "#4d5a46",
            outline: "#4d5a46",
            texture: "none",
        }
    );

    dice3d.addDicePreset({
        type: "dp",
        labels: [
            "systems/ac2d20/assets/dice/d1.webp",
            "systems/ac2d20/assets/dice/d2.webp",
            "systems/ac2d20/assets/dice/d3.webp",
            "systems/ac2d20/assets/dice/d4.webp",
            "systems/ac2d20/assets/dice/d5.webp",
            "systems/ac2d20/assets/dice/d6.webp",
        ],
        system: "ac2d20",
        colorset: "ac2d20"
    });
});