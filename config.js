import GoblinStyle from "./main.js";

export function registerConfigs(){
	game.settings.register(GoblinStyle.ID, GoblinStyle.SETTINGS.JOURNAL_STYLES, {
		name: `GoblinStyle.settings.${GoblinStyle.SETTINGS.JOURNAL_STYLES}.Name`,
		default: true,
		type: Boolean,
		scope: 'client',
		config: true,
		hint: `GoblinStyle.settings.${GoblinStyle.SETTINGS.JOURNAL_STYLES}.Hint`,
		onChange: debouncedReload
	});
	game.settings.register(GoblinStyle.ID, GoblinStyle.SETTINGS.CHAT_STYLES, {
		name: `GoblinStyle.settings.${GoblinStyle.SETTINGS.CHAT_STYLES}.Name`,
		default: true,
		type: Boolean,
		scope: 'client',
		config: true,
		hint: `GoblinStyle.settings.${GoblinStyle.SETTINGS.CHAT_STYLES}.Hint`,
		onChange: debouncedReload
	});
	game.settings.register(GoblinStyle.ID, GoblinStyle.SETTINGS.GLOBAL_STYLES, {
		name: `GoblinStyle.settings.${GoblinStyle.SETTINGS.GLOBAL_STYLES}.Name`,
		default: true,
		type: Boolean,
		scope: 'client',
		config: true,
		hint: `GoblinStyle.settings.${GoblinStyle.SETTINGS.GLOBAL_STYLES}.Hint`,
		onChange: debouncedReload
	});
}