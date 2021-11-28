import { onManageActiveEffect, prepareActiveEffectCategories } from "../helpers/effects.mjs";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class ACActorSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["ac2d20", "sheet", "actor"],
            template: "systems/ac2d20/templates/actor/actor-sheet.html",
            width: 720,
            height: 780,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "abilities" }]
        });
    }

    /** @override */
    get template() {
        return `systems/ac2d20/templates/actor/actor-${this.actor.data.type}-sheet.html`;
    }

    /* -------------------------------------------- */

    /** @override */
    getData() {
        // Retrieve the data structure from the base sheet. You can inspect or log
        // the context variable to see the structure, but some key properties for
        // sheets are the actor object, the data object, whether or not it's
        // editable, the items array, and the effects array.
        const context = super.getData();
        // Use a safe clone of the actor data for further operations.
        const actorData = context.actor.data;

        // Add the actor's data to context.data for easier access, as well as flags.
        context.data = actorData.data;
        context.flags = actorData.flags;

        // Prepare character data and items.
        if (actorData.type == 'character') {
            this._prepareItems(context);
            this._prepareCharacterData(context);
        }

        // Prepare NPC data and items.
        if (actorData.type == 'npc') {
            this._prepareItems(context)

        }

        // Prepare Creature data and items.
        if (actorData.type == 'creature') {
            this._prepareItems(context)

        }

        // Add roll data for TinyMCE editors.
        //context.rollData = context.actor.getRollData();

        // Prepare active effects
        context.effects = prepareActiveEffectCategories(this.actor.effects);
        context.AC2D20 = CONFIG.AC2D20;

        return context;
    }

    /**
     * Organize and classify Items for Character sheets.
     *
     * @param {Object} actorData The actor to prepare.
     *
     * @return {undefined}
     */
    _prepareCharacterData(context) {
        // Handle ability scores.
        // for (let [k, v] of Object.entries(context.data.attributes)) {
        //     v.label = game.i18n.localize(CONFIG.AC2D20.attributes[k]) ?? k;
        // }

        let allInjuries = [];
        // for (const [key, bp] of Object.entries(this.actor.data.data.body_parts)) {
        //     allInjuries.push.apply(allInjuries, bp.injuries);
        // }
        context.treatedInjuriesCount = allInjuries.filter(i => i == 1).length;
        context.openInjuriesCount = allInjuries.filter(i => i == 2).length;

    }

    /**
     * Organize and classify Items for Character sheets.
     *
     * @param {Object} actorData The actor to prepare.
     *
     * @return {undefined}
     */
    _prepareItems(context) {
        // Initialize containers.

        const skills = [];
        const perks = [];
        const apparel = [];
        const apparel_mods = [];
        const robotApparel = [];
        const robot_mods = [];
        const weapons = [];
        const weapon_mods = [];
        const ammo = [];
        const consumables = [];
        const books_and_magz = [];
        const miscellany = []
        const gear = [];
        const specialAbilities = []

        // Iterate through items, allocating to containers
        for (let i of context.items) {
            i.img = i.img || DEFAULT_TOKEN;
            // Append to gear.
            if (i.type === 'skill') {
                skills.push(i);
            }
            // Append to skills.
            else if (i.type === 'perk') {
                perks.push(i);
            }
            else if (i.type === 'apparel') {
                apparel.push(i);
            }
            else if (i.type === 'apparel_mod') {
                apparel_mods.push(i);
            }
            else if (i.type === 'robot_armor') {
                robotApparel.push(i);
            }
            else if (i.type === 'robot_mod') {
                robot_mods.push(i);
            }
            else if (i.type === 'weapon') {
                weapons.push(i);
            }
            else if (i.type === 'weapon_mod') {
                weapon_mods.push(i);
            }
            else if (i.type === 'ammo') {
                ammo.push(i);
            }
            else if (i.type === 'consumable') {
                consumables.push(i);
            }
            else if (i.type === 'books_and_magz') {
                books_and_magz.push(i);
            }
            else if (i.type === 'miscellany') {
                miscellany.push(i);
            }
            else if (i.type === 'special_ability') {
                specialAbilities.push(i)
            }
        }

        // Assign and return
        skills.sort(function (a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        });
        context.skills = skills;

        let clothing = apparel.filter(a => a.data.appareltype == 'clothing');
        let outfit = apparel.filter(a => a.data.appareltype == 'outfit');
        let headgear = apparel.filter(a => a.data.appareltype == 'headgear');
        let armor = apparel.filter(a => a.data.appareltype == 'armor');
        let powerArmor = apparel.filter(a => a.data.appareltype == 'powerArmor');
        let plating = robotApparel.filter(a => a.data.appareltype == 'plating');
        let robotArmor = robotApparel.filter(a => a.data.appareltype == 'armor');
        context.allApparel = [
            { apparelType: 'clothing', list: clothing },
            { apparelType: 'outfit', list: outfit },
            { apparelType: 'headgear', list: headgear },
            { apparelType: 'armor', list: armor },
            { apparelType: 'powerArmor', list: powerArmor }
        ];
        context.allRobotApparel = [
            { apparelType: 'plating', list: plating },
            { apparelType: 'armor', list: robotArmor }
        ];

        context.apparel_mods = apparel_mods;
        context.robot_mods = robot_mods;
        context.perks = perks;
        context.ammo = ammo;
        context.weapons = weapons;
        context.weapon_mods = weapon_mods;
        context.specialAbilities = specialAbilities;
        context.consumables = consumables;
        context.books_and_magz = books_and_magz;
        context.miscellany = miscellany;

        // WRAP INVENTORY DEPENDING ON THE CHARACTER TYPE:
        // for example put apparel in inventory for all except the character actor.

        // NPC and Creature Inventory = all physical items that are not weapons
        if (this.actor.type == 'npc' || this.actor.type == 'creature') {
            context.inventory = context.items.filter(i => {
                return (i.type !== 'weapon' && i.data.weight != null)
            });
        }
        if (this.actor.type == 'character') {
            context.inventory = [...robotApparel, ...robot_mods];
        }

    }

    /* -------------------------------------------- */

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // SWITCH TABS
        html.find('.tab-switch').click((evt) => {
            evt.preventDefault();
            const el = evt.currentTarget;
            const tab = el.dataset.tab;
            this._tabs[0].activate(tab);
        });

        // Render the item sheet for viewing/editing prior to the editable check.
        html.find('.item-edit').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            item.sheet.render(true);
        });

        // -------------------------------------------------------------
        // ! Everything below here is only needed if the sheet is editable
        if (!this.isEditable) return;

        // * SKILLS LISTENERS [clic, right-click, value change, focus ]
        // Click Skill Item
        html.find('.skill .skill-name, .skill-focus.focused ').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            let isFocused = $(ev.currentTarget).hasClass('focused');
            this._onRollSkill(item.name, item.data.data.value, this.actor.data.data.attributes[item.data.data.defaultAttribute].value, isFocused);
        });
        // Change Skill Rank value
        html.find('.skill .skill-value .skill-value-input').change(async (ev) => {
            let newRank = parseInt($(ev.currentTarget).val());
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            let updatedItem = { _id: item.id, data: { value: newRank } };
            await this.actor.updateEmbeddedDocuments("Item", [updatedItem]);
        });
        // Toggle Focus value
        html.find('.skill .item-skill-focus').click(async (ev) => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            let updatedItem = { _id: item.id, data: { focus: !item.data.data.focus } };
            await this.actor.updateEmbeddedDocuments("Item", [updatedItem]);
        });
        // * END SKILLS

        // * TRUTHS
        html.find('.truth-text').change(async (ev) => {
            let updates = [];
            $('.truth-cell').each((i, el) => {
                let _txt = this._clearTextAreaText($(el).find('.truth-text').val());
                let truth = {
                    text: _txt
                }
                updates.push(truth);
            });
            await this.actor.update({ 'data.truths': updates });
        });
        // * END TRUTHS


        // * AMMO COUNT UPDATE 
        html.find('.ammo-quantity').change(async (ev) => {
            let newQuantity = parseInt($(ev.currentTarget).val());
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            let updatedItem = { _id: item.id, data: { quantity: newQuantity } };
            await this.actor.updateEmbeddedDocuments("Item", [updatedItem]);
        });

        // * CLICK TO EXPAND
        html.find(".expandable-info").click((event) => this._onItemSummary(event));

        // * Add Inventory Item
        html.find('.item-create').click(this._onItemCreate.bind(this));

        // * Delete Inventory Item
        html.find('.item-delete').click(async (ev) => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            await item.delete();
            li.slideUp(200, () => this.render(false));
        });

        // * Toggle Stash Inventory Item
        html.find(".item-stash").click(async (ev) => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("item-id"));
            await this.actor.updateEmbeddedDocuments("Item", [this._toggleStashed(li.data("item-id"), item)]);
        });

        // * Toggle Power on Power Armor Item
        html.find(".item-powered").click(async (ev) => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("item-id"));
            await this.actor.updateEmbeddedDocuments("Item", [this._togglePowered(li.data("item-id"), item)]);
        });

        // * Toggle Equip Inventory Item
        html.find(".item-toggle").click(async (ev) => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("item-id"));
            await this.actor.updateEmbeddedDocuments("Item", [this._toggleEquipped(li.data("item-id"), item)]);
        });

        // * Toggle Favorite Inventory Item
        html.find(".item-favorite").click(async (ev) => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("item-id"));
            await this.actor.updateEmbeddedDocuments("Item", [this._toggleFavorite(li.data("item-id"), item)]);
        });

        // * INJURIES
        html.find('.injury-text, .treated, .injury-type').change(async (ev) => {
            let updates = [];
            $('.injury-cell.injury').each((i, el) => {
                let _txt = this._clearTextAreaText($(el).find('.injury-text').val());
                let inj = {
                    text: _txt,
                    treated: $(el).find('.controls .treated').is(":checked"),
                    injuryType: $(el).find('.controls .injury-type').is(":checked")
                }
                updates.push(inj);
            });
            await this.actor.update({ 'data.injuries.list': updates });
        });
        // * END INJURIES

        // * Active Effect management
        html.find(".effect-control").click(ev => onManageActiveEffect(ev, this.actor));

        // * ROLL WEAPON SKILL
        html.find(".weapon-roll").click((ev) => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("item-id"));
            let skillName, skill, attribute;
            let rollName = item.name;
            if (item.actor?.type == "creature") {
                skillName = game.i18n.localize(`AC2D20.CREATURE.${item.data.data.skill}`);
                skill = item.actor.data.data[item.data.data.skill];
                skill['focus'] = true;
                attribute = item.actor.data.data[item.data.data.attribute];
            } else {
                skillName = CONFIG.AC2D20.WEAPONS.weaponSkill[item.data.data.weaponType];
                let skillItem = item.actor.items.find(i => i.name == skillName);
                if (skillItem)
                    skill = skillItem.data.data
                else
                    skill = {
                        "value": 0,
                        "focus": false,
                        "defaultAttribute": "str"
                    };
                attribute = item.actor.data.data.attributes[skill.defaultAttribute];
            }
            game.ac2d20.Dialog2d20.createDialog({ rollName: rollName, diceNum: 2, attribute: attribute.value, skill: skill.value, focus: skill.focus, complication: 20 });
        });

        // * POWER ARMOR MONITOR
        html.find('.power-armor-monitor-helath-value').change((ev) => {
            const apparelId = $(ev.currentTarget).data('itemId');
            const newHealthValue = $(ev.currentTarget).val();
            let apparel = this.actor.items.get(apparelId);
            if (apparel) {
                if (apparel.data.data.appareltype == 'powerArmor') {
                    apparel.update({ "data.health.value": newHealthValue });
                }
            }

        });

        // * ROLL WEAPON DAMAGE
        html.find(".weapon-roll-damage").click((ev) => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("item-id"));
            let numOfDice = parseInt(item.data.data.damage.rating);
            if (item.data.data.weaponType == 'meleeWeapons' || item.data.data.weaponType == 'unarmed') {
                let dmgBonus = this.actor.data.data?.meleeDamage?.base ?? 0
                numOfDice += dmgBonus;
            }
            let rollName = item.data.name;
            game.ac2d20.DialogD6.createDialog({ rollName: rollName, diceNum: numOfDice, weapon: item.data.toObject() });
        });

        // Drag events for macros.
        if (this.actor.isOwner) {
            let handler = ev => this._onDragStart(ev);
            html.find('li.item').each((i, li) => {
                if (li.classList.contains("inventory-header")) return;
                if (li.classList.contains("skill")) return;
                li.setAttribute("draggable", true);
                li.addEventListener("dragstart", handler, false);
            });
        }

        // !CRATURES

        // ! DON'T LET NUMBER FIELDS EMPTY
        const numInputs = document.querySelectorAll('input[type=number]');
        numInputs.forEach(function (input) {
            input.addEventListener('change', function (e) {
                if (e.target.value == '') {
                    e.target.value = 0
                }
            })
        });
    }

    // * UTILS
    _clearTextAreaText(txt) {
        txt.trim();
        txt = txt.replace(/  +/g, ' ');
        //! replace new lines with encided \n so stupid textarea doesn't break
        txt = txt.replace(/(?:\r\n|\r|\n)/g, '&#13;&#10;');
        return txt;
    };

    /**
     * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
     * @param {Event} event   The originating click event
     * @private
     */
    async _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        // Get the type of item to create.
        const type = header.dataset.type;
        // Grab any data associated with this control.
        const data = duplicate(header.dataset);
        // Initialize a default name.
        const name = `New ${type.capitalize()}`;
        // Prepare the item object.   
        const itemData = {
            name: name,
            type: type,
            data: data
        };
        // Remove the type from the dataset since it's in the itemData.type prop.
        delete itemData.data["type"];
        // Finally, create the item!
        return await Item.create(itemData, { parent: this.actor });
    }

    async _onRightClickDelete(itemId) {
        const item = this.actor.items.get(itemId);
        await item.delete();
        //li.slideUp(200, () => this.render(false));
    }

    _onRightClickSkill(itemId, attribute) {
        const item = this.actor.items.get(itemId);
        this._onRollSkill(item.name, item.data.data.value, this.actor.data.data.attributes[attribute].value, item.data.data.focus);
    }
    _onRollSkill(skillName, rank, attribute, focus) {
        game.ac2d20.Dialog2d20.createDialog({ rollName: skillName, diceNum: 2, attribute: -1, skill: rank, focus: focus, complication: 20, actor: this.actor.data.data })
    }

    _onItemSummary(event) {
        event.preventDefault();
        let li = $(event.currentTarget).parents(".item");
        let item = this.actor.items.get(li.data("itemId"));
        let moreInfo = "";

        if (item.data.data.effect != null) {
            moreInfo = item.data.data.effect;
        } else {
            moreInfo = item.data.data.description;
        }
        // Toggle summary
        if (li.hasClass("expanded")) {
            let summary = li.children(".item-summary");
            summary.slideUp(200, () => {
                summary.remove();
            });
        } else {
            let div = $(
                `<div class="item-summary"><div class="item-summary-wrapper"><div>${moreInfo}</div></div></div>`
            );
            li.append(div.hide());
            div.slideDown(200);
        }
        li.toggleClass("expanded");
    }

    _getBodyPartStatus(injuries) {
        let maxStatus = Math.max(...injuries);
        let newStatus = 'healthy';
        if (maxStatus == 1)
            newStatus = 'wounded';
        else if (maxStatus == 2)
            newStatus = 'crippled';
        return newStatus;
    }

    // Toggle Stashed Item
    _toggleStashed(id, item) {
        return {
            _id: id,
            data: {
                stashed: !item.data.data.stashed,
            },
        };
    }

    // Toggle Equipment
    _toggleEquipped(id, item) {
        return {
            _id: id,
            data: {
                equipped: !item.data.data.equipped,
            },
        };
    }

    // Toggle Powered
    _togglePowered(id, item) {
        return {
            _id: id,
            data: {
                powered: !item.data.data.powered,
            },
        };
    }

    // Toggle Favorite
    _toggleFavorite(id, item) {
        return {
            _id: id,
            data: {
                favorite: !item.data.data.favorite,
            },
        };
    }

}
