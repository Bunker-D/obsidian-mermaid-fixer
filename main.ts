import { Plugin, addIcon, Notice } from 'obsidian';
// import { App, Editor, MarkdownView, Modal, Notice, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

// interface MyPluginSettings {
// 	mySetting: string;
// }

// const DEFAULT_SETTINGS: MyPluginSettings = {
// 	mySetting: 'default'
// };

const EMPTY_ICON = true;
const ARROW_ICON = `
		<g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
			<polygon fill="currentColor" points="55 54 80 67 55 80" />
			<path d="M20 20V47a20 20 0 0 0 20 20h12"/>
		</g>
	`;

export default class MyPlugin extends Plugin {
	// settings: MyPluginSettings;

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

		// // TODO ▼ ?
		// await this.loadSettings();

		// // This creates an icon in the left ribbon.
		// // Perform additional things with the ribbon
		// ribbonIconEl.addClass( 'my-plugin-ribbon-class' );

		// // This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		// const statusBarItemEl = this.addStatusBarItem();
		// statusBarItemEl.setText( 'Status Bar Text' );

		// // This adds a simple command that can be triggered anywhere
		// this.addCommand( {
		// 	id: 'open-sample-modal-simple',
		// 	name: 'Open sample modal (simple)',
		// 	callback: () => {
		// 		new SampleModal( this.app ).open();
		// 	}
		// } );
		// // This adds an editor command that can perform some operation on the current editor instance
		// this.addCommand( {
		// 	id: 'sample-editor-command',
		// 	name: 'Sample editor command',
		// 	editorCallback: ( editor: Editor, view: MarkdownView ) => {
		// 		console.log( editor.getSelection() );
		// 		editor.replaceSelection( 'Sample Editor Command' );
		// 	}
		// } );
		// // This adds a complex command that can check whether the current state of the app allows execution of the command
		// this.addCommand( {
		// 	id: 'open-sample-modal-complex',
		// 	name: 'Open sample modal (complex)',
		// 	checkCallback: ( checking: boolean ) => {
		// 		// Conditions to check
		// 		const markdownView = this.app.workspace.getActiveViewOfType( MarkdownView );
		// 		if ( markdownView ) {
		// 			// If checking is true, we're simply "checking" if the command can be run.
		// 			// If checking is false, then we want to actually perform the operation.
		// 			if ( !checking ) {
		// 				new SampleModal( this.app ).open();
		// 			}

		// 			// This command will only show up in Command Palette when the check function returns true
		// 			return true;
		// 		}
		// 	}
		// } );

		// // This adds a settings tab so the user can configure various aspects of the plugin
		// this.addSettingTab( new SampleSettingTab( this.app, this ) );

		// // If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// // Using this function will automatically remove the event listener when this plugin is disabled.
		// this.registerDomEvent( document, 'click', ( evt: MouseEvent ) => {
		// 	console.log( 'click', evt );
		// } );

		// // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval( window.setInterval( () => console.log( 'setInterval' ), 5 * 60 * 1000 ) );
	}

	onunload() {

	}

	// async loadSettings() {
	// 	this.settings = Object.assign( {}, DEFAULT_SETTINGS, await this.loadData() );
	// }

	// async saveSettings() {
	// 	await this.saveData( this.settings );
	// }
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
