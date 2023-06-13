import { App, Notice, Plugin, PluginSettingTab, Setting, addIcon } from 'obsidian';
import { DiagramType } from './mermaid';
import { MermaidDefinitions } from './mermaid_definitions';
import { BUTTON_ICON } from './icons';

//TODO For test purposes, make buttons for each chart type, that modifies its contained IDs for activate/deactivate, to check the effects of each

//TODO A function to get the Mermaid definitions based on selected chart types
//TODO   → Must put those definitions in a <defs>
//TODO   → Must communicate incompatible definition overlap

//TODO Setting page for selecting the covered chart types

//TODO Alternative option: select the chart types dynamically based on active tab?

interface MermaidArrowSaverSettings {
	selectedDiagramTypes: DiagramType[];
};

const DEFAULT_SETTINGS: MermaidArrowSaverSettings = {
	selectedDiagramTypes: [ 'flowchart', 'classDiagram' ], //TODO better default settings
};

const DEV_MODE = true as const;
const DEFS_ID = 'mermaid-defs-saver' as const;

export default class MermaidArrowSaver extends Plugin {
	settings: MermaidArrowSaverSettings;

	async onload() {
		await this.loadSettings();
		this.addButtonForDiagramTypes( this.settings.selectedDiagramTypes );
	}

	private async loadSettings() {
		this.settings = { ...DEFAULT_SETTINGS, ...( await this.loadData() ) };
	}

	private addButtonForDiagramTypes( diagramTypes: DiagramType[] ) {
		const definitions = new MermaidDefinitions( diagramTypes );
		const defSVG = definitions.getSVGDefinitions( DEFS_ID );
		addIcon( DEFS_ID, defSVG + BUTTON_ICON );
		const onButtonClick = ( DEV_MODE ) ? this._devOnButtonClick : this.onButtonClick;
		this.addRibbonIcon( DEFS_ID, 'Mermaid Arrow Saver', onButtonClick );
	}

	private onButtonClick( evt: MouseEvent ) {
		new Notice( 'This button keep Mermaid arrows visible.\nClicking it does nothing.' );
	}

	private _devOnButtonClick() {
		MermaidArrowSaver._toggleDefIDs();
	}

	private static _toggleDefIDs() {
		console.log( 'DEV CLICK' );
		const defs = document.getElementById( DEFS_ID );
		console.log( defs );
		if ( !defs || !defs.firstElementChild ) return;
		const firstID = defs.firstElementChild.id;
		const idsAreInactive = firstID.startsWith( '---' );
		console.log( idsAreInactive );
		const modID: ( id: string ) => string =
			( idsAreInactive )
				? ( id ) => id.substring( 3 )
				: ( id ) => '---' + id;
		for ( const marker of defs.children ) {
			marker.id = modID( marker.id );
		}
	}

	// ▼ HACKS FOR DEV EXPERIMENTS

	// oneButtonPerDiagramType() { //HACK
	// 	let diagramType: DiagramType;
	// 	for ( diagramType in DIAGRAM_TYPES ) {
	// 		this.addButtonForSingleDiagramType( diagramType );
	// 	}
	// }

	// addButtonForSingleDiagramType( diagramType: DiagramType ) { //HACK
	// 	const definitions = new MermaidDefinitions( [ diagramType ] );
	// 	const defSVG = definitions.getDefinitions().replace( '<defs>', `<defs id="${ this.getRedefID( diagramType ) }">` );
	// 	const iconName = `mermaid-redef-${ diagramType }`;
	// 	const buttonName = `Mermaid ${ diagramType }`;
	// 	addIcon( iconName, defSVG + BUTTON_ICON );
	// 	this.addRibbonIcon( iconName, buttonName, this.getDisplayToggler( diagramType ) );
	// }

	// getRedefID( diagramType: DiagramType ): string { //HACK
	// 	return `redef-${ diagramType }`;
	// }

	// getDisplayToggler( diagramType: DiagramType ) { //HACK
	// 	const id = this.getRedefID( diagramType );
	// 	return () => { document.getElementById( id )?.classList.toggle( 'hidden-redef' ); };
	// }
}

class MermaidArrowSaverSettingTab extends PluginSettingTab {
	plugin: MermaidArrowSaver;

	constructor( app: App, plugin: MermaidArrowSaver ) {
		super( app, plugin );
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl( 'h2', { text: 'Settings for my awesome plugin.' } );
		// TODO
		// new Setting( containerEl )
		// 	.setName( 'Setting #1' )
		// 	.setDesc( 'It\'s a secret' )
		// 	.addText( text => text
		// 		.setPlaceholder( 'Enter your secret' )
		// 		.setValue( this.plugin.settings.mySetting )
		// 		.onChange( async ( value ) => {
		// 			console.log( 'Secret: ' + value );
		// 			this.plugin.settings.mySetting = value;
		// 			await this.plugin.saveSettings();
		// 		} ) );
	}

}

