import { App, PluginSettingTab, Setting } from "obsidian";
import MermaidArrowSaver from "./plugin";

export class MermaidArrowSaverSettingTab extends PluginSettingTab {
	plugin: MermaidArrowSaver;

	constructor( app: App, plugin: MermaidArrowSaver ) {
		super( app, plugin );
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		this.buildEmptyButtonSetting();
		containerEl.createEl( 'h2', { text: 'Covered Mermaid diagram types' } );
		//TODO split line
		//TODO category: covered diagram types
		//TODO toggle for every covered diagram type
		//TODO conflict info
	}

	private buildEmptyButtonSetting() {
		console.log( this );
		new Setting( this.containerEl )
			.setName( 'Empty button' )
			.setDesc(
				createFragment( ( descEl ) => {
					descEl.appendText( 'Make the plugin button more discrete by making it empty.' );
					descEl.createEl( 'br' );
					descEl.appendText( '(The plugin relies on this button, but clicking it does nothing.)' );
				} ),
			)
			.addToggle( ( toggle ) => {
				toggle.setValue( this.plugin.getEmptyButtonSetting() );
				toggle.onChange( ( value ) => { this.plugin.setEmptyButtonSetting( value ); } );
			} );

	}

}
