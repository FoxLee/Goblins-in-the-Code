import { BladesActorSheet } from "../../systems/blades-in-the-dark/module/blades-actor-sheet.js";

export default class BladesActorSheet_Fox extends BladesActorSheet {
	
	/** @override */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["blades-in-the-dark", "sheet", "goblins", "actor", "pc", (screen.availWidth < 768 ? "mobile" : "")],
			template: "modules/fox-goblins-in-the-code/templates/actor-sheet.html",
			width: ((screen.availWidth < 768) ? (screen.availWidth - 40) : 455),
			height: ((screen.availWidth < 768) ? (screen.availHeight - 40) : 720),
			tabs: [{navSelector: ".tabs", contentSelector: ".tab-content", initial: ((screen.availWidth < 768) ? "opener" : "abilities")}],
			panels: {left:"true",bottom:"false"}
		});
	}
	
	/** @override */
	async getData(options) {
		const theData = await super.getData(options);
		return foundry.utils.mergeObject(theData,{
			panels:options.panels
		});
	}
	
	activateListeners(html) {
		super.activateListeners(html);
		
		html.find('.panel-toggle').click(ev => {
			const source = ev.currentTarget.id;
			//const target = (source == 'tab-close' ? document.getElementById('panel-bottom-status') : document.getElementById('panel-left-status'));
			switch(source){
				case('tab-close'):
					this.options.panels.bottom = "false";
					document.getElementById('panel-bottom-status').value = "false";
					break;
				case('upper-left-toggle'):
					this.options.panels.left = "true";
					document.getElementById('panel-left-status').value = "true";
					break;
				case('upper-right-toggle'):
					this.options.panels.left = "false";
					document.getElementById('panel-left-status').value = "false";
					break;
				default:
					this.options.panels.bottom = "true";
					document.getElementById('panel-bottom-status').value = "true";
			}
			//this.render(false);
		});
		
		// Everything below here is only needed if the sheet is editable
		if (!this.options.editable) return;

		// Update Inventory Item
		html.find('.item-edit').click(ev => {
		  const element = $(ev.currentTarget).siblings(".item");
		  const item = this.actor.items.get(element.data("itemId"));
		  item.sheet.render(true);
		});
		
	}
	
}

Actors.registerSheet("blades-in-the-dark", BladesActorSheet_Fox, {
	types: ["character"],
	label: "Goblin Style"
});

/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const Fox_LoadHandlebarTemplates = async function() {
	
	// Define template paths to load
	const templatePaths = [	
	"modules/fox-goblins-in-the-code/templates/parts/attributes.html",
	];

  // Load the template parts
  return loadTemplates(templatePaths);
};

Hooks.once( "init", function() {
  Fox_LoadHandlebarTemplates();
});

Hooks.on("renderBladesActorSheet_Fox", (app, html, data) => {
	if(typeof goblinWatcher == 'undefined'){
		var goblinWatcher = new ResizeObserver(function(entries) {
			// since we are observing only a single element, so we access the first element in entries array
			let container = entries[0].contentRect;
			
			if(document.getElementById('chara_sheet')){
				if(container.width < 356){
					document.getElementById('chara_sheet').classList.add('super-skinny');
					if(container.width > 305){
						var s = document.getElementsByClassName('character-harm')[0];
						var t = document.getElementsByClassName('harm-container-alt')[0];
						t.appendChild(s);
					}else{
						var s = document.getElementsByClassName('character-harm')[0];
						var t = document.getElementsByClassName('harm-container-default')[0];
						t.prepend(s);	
					}
				}else{
					document.getElementById('chara_sheet').classList.remove('super-skinny');
				}
				
				if(container.width < 305){
					document.getElementById('chara_sheet').classList.add('ultra-skinny');
				}else{
					document.getElementById('chara_sheet').classList.remove('ultra-skinny');
				}
				
				if(container.width < 433){
					document.getElementById('chara_sheet').classList.add('skinny');
				}else{
					document.getElementById('chara_sheet').classList.remove('skinny');
				}
				
				if(container.width > 720){
					document.getElementById('chara_sheet').classList.add('wide');
				}else{
					document.getElementById('chara_sheet').classList.remove('wide');
				}
				
			}
		});

		// start observing for resize
		goblinWatcher.observe(document.getElementById('chara_sheet'));
	}	
});

Hooks.on("closeBladesActorSheet_Fox", (app, el) => {
	if( typeof goblinWatcher !== 'undefined' ){
		goblinWatcher.unobserve(document.getElementById('chara_sheet'));
		goblinWatcher.disconnect();
	}
});