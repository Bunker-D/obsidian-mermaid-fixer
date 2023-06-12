import { Plugin, addIcon, Notice } from 'obsidian';

//TODO For test purposes, make buttons for each chart type, that modifies its contained IDs for activate/deactivate, to check the effects of each

//TODO A function to get the Mermaid definitions based on selected chart types
//TODO   → Must put those definitions in a <defs>
//TODO   → Must communicate incompatible definition overlap

//TODO Setting page for selecting the covered chart types

//TODO Alternative option: select the chart types dynamically based on active tab?

const EMPTY_ICON = true;
const ARROW_ICON = `
		<g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
			<polygon fill="currentColor" points="55 54 80 67 55 80" />
			<path d="M20 20V47a20 20 0 0 0 20 20h12"/>
		</g>
	`;

export default class MermaidArrowSaver extends Plugin {
	async onload() {
		const mermaidMarkers = `
				<g fill="currentColor" stroke="currentColor">
					<marker id="flowchart-pointEnd" class="marker flowchart" viewBox="0 0 10 10" refX="10" refY="5"
						markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto">
						<path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></path>
					</marker>
					<marker id="flowchart-pointStart" class="marker flowchart" viewBox="0 0 10 10" refX="0" refY="5"
						markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto">
						<path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></path>
					</marker>
					<marker id="flowchart-circleEnd" class="marker flowchart" viewBox="0 0 10 10" refX="11" refY="5"
						markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto">
						<circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></circle>
					</marker>
					<marker id="flowchart-circleStart" class="marker flowchart" viewBox="0 0 10 10" refX="-1" refY="5"
						markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto">
						<circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></circle>
					</marker>
					<marker id="flowchart-crossEnd" class="marker cross flowchart" viewBox="0 0 11 11" refX="12" refY="5.2"
						markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto">
						<path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"></path>
					</marker>
					<marker id="flowchart-crossStart" class="marker cross flowchart" viewBox="0 0 11 11" refX="-1" refY="5.2"
						markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto">
						<path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"></path>
					</marker>
				</g>
			`;
		const iconPath = ( EMPTY_ICON ) ? '' : ARROW_ICON;
		const iconFullSVG = ( mermaidMarkers + iconPath ).trim().replace( /\s+/g, ' ' );
		const iconName = 'mermaidMarkers';
		addIcon( iconName, iconFullSVG );
		this.addRibbonIcon( iconName, 'Mermaid markers', ( evt: MouseEvent ) => {
			new Notice( 'This button keeps Mermaid arrows visible.\nClicking it does nothing.' );
		} );
	}

	onunload() {}
}

// class SampleModal extends Modal {
// 	constructor( app: App ) {
// 		super( app );
// 	}

// 	onOpen() {
// 		const { contentEl } = this;
// 		contentEl.setText( 'Woah!' );
// 	}

// 	onClose() {
// 		const { contentEl } = this;
// 		contentEl.empty();
// 	}
// }

// class SampleSettingTab extends PluginSettingTab {
// 	plugin: MyPlugin;

// 	constructor( app: App, plugin: MyPlugin ) {
// 		super( app, plugin );
// 		this.plugin = plugin;
// 	}

// 	display(): void {
// 		const { containerEl } = this;

// 		containerEl.empty();

// 		containerEl.createEl( 'h2', { text: 'Settings for my awesome plugin.' } );

// 		new Setting( containerEl )
// 			.setName( 'Setting #1' )
// 			.setDesc( 'It\'s a secret' )
// 			.addText( text => text
// 				.setPlaceholder( 'Enter your secret' )
// 				.setValue( this.plugin.settings.mySetting )
// 				.onChange( async ( value ) => {
// 					console.log( 'Secret: ' + value );
// 					this.plugin.settings.mySetting = value;
// 					await this.plugin.saveSettings();
// 				} ) );
// 	}
// }
