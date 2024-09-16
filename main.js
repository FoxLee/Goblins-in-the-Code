import {registerConfigs} from "./config.js";

export default class GoblinStyle{
	static ID = 'fox-goblins-in-the-code';
	static NAME = 'GoblinStyle';

	static SETTINGS = {
		JOURNAL_STYLES: 'style-journal',
		CHAT_STYLES: 'style-chat',
		GLOBAL_STYLES: 'style-global'
	}

	static loadCSS() {
		// Get HTML head element
		var head = document.getElementsByTagName('HEAD')[0];
		
		if (game.settings.get(GoblinStyle.ID,GoblinStyle.SETTINGS.JOURNAL_STYLES)){
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = './modules/fox-goblins-in-the-code/styles/journal.css';
			head.appendChild(link);
		}
		
		if (game.settings.get(GoblinStyle.ID,GoblinStyle.SETTINGS.CHAT_STYLES)){
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = './modules/fox-goblins-in-the-code/styles/chat.css';
			head.appendChild(link);
		}
		
		if (game.settings.get(GoblinStyle.ID,GoblinStyle.SETTINGS.GLOBAL_STYLES)){
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = './modules/fox-goblins-in-the-code/styles/global.css';
			head.appendChild(link);
		}
		
	}
}

Hooks.once('init', () => {
	registerConfigs();
	GoblinStyle.loadCSS();
});