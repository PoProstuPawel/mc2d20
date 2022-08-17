/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    "systems/mc2d20/templates/actor/parts/actor-header.html",
    "systems/mc2d20/templates/actor/parts/actor-abilities.html",
    "systems/mc2d20/templates/actor/parts/actor-talents.html",
    "systems/mc2d20/templates/actor/parts/actor-spells.html",
    "systems/mc2d20/templates/actor/parts/actor-weapons.html",
    "systems/mc2d20/templates/actor/parts/actor-armor.html",
    "systems/mc2d20/templates/actor/parts/actor-skillkit.html",
    "systems/mc2d20/templates/actor/parts/actor-equipment.html",
    "systems/mc2d20/templates/actor/parts/actor-encumbrance.html",
    "systems/mc2d20/templates/actor/parts/actor-effects.html",
    "systems/mc2d20/templates/actor/parts/npc-abilities.html",
    "systems/mc2d20/templates/actor/parts/npc-header.html",
    "systems/mc2d20/templates/actor/parts/vehicle-header.html",
    "systems/mc2d20/templates/actor/parts/vehicle-abilities.html",
    "systems/mc2d20/templates/item/parts/item-header.html",
    "systems/mc2d20/templates/item/parts/item-effects.html",
    "systems/mc2d20/templates/actor/parts/simple-expandable-item.html"
  ]);
};
