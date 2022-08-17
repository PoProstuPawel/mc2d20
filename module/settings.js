export function registerSettings() {
    game.settings.register('mc2d20', 'partyMomentum', {
        name: 'Party Momentum',
        scope: 'world',
        config: false,
        default: 0,
        type: Number,
    });
    game.settings.register('mc2d20', 'gmMomentum', {
        name: 'GM Momentum',
        scope: 'world',
        config: false,
        default: 0,
        type: Number,
    });
    game.settings.register('mc2d20', 'maxMomentum', {
        name: 'Max Momentum',
        scope: 'world',
        config: false,
        default: 6,
        type: Number,
    });
    game.settings.register('mc2d20', 'gmMomentumShowToPlayers', {
        name: 'Show GM Momentum To Players',
        hint: "Shows the GM momentum window to everyone. Requires refresh on players side.",
        scope: 'world',
        config: true,
        default: false,
        type: Boolean,
    });
    game.settings.register('mc2d20', 'maxAppShowToPlayers', {
        name: 'Players Can Setup Max App',
        hint: "Allows players to settup the Party's MAX AP. Requires refresh on players side.",
        scope: 'world',
        config: true,
        default: false,
        type: Boolean,
    });
    game.settings.register('mc2d20', 'compendium-skills', {
        name: 'Skills Compendium',
        scope: 'world',
        config: true,
        default: "mc2d20.skills",
        type: String,
    });
}
