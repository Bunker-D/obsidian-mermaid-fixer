import { DIAGRAM_TYPES, DiagramType } from 'src/mermaid_data';
import { MermaidDefinitions } from 'src/mermaid_definitions';
import { App, Notice, Plugin, PluginSettingTab, Setting, addIcon } from 'obsidian';
import { SVGContent } from 'src/base_types';


//TODO For test purposes, make buttons for each chart type, that modifies its contained IDs for activate/deactivate, to check the effects of each

//TODO A function to get the Mermaid definitions based on selected chart types
//TODO   → Must put those definitions in a <defs>
//TODO   → Must communicate incompatible definition overlap

//TODO Setting page for selecting the covered chart types

//TODO Alternative option: select the chart types dynamically based on active tab?

const DEV_MODE = true;
const EMPTY_ICON = true;
const BUTTON_ICON = `
		<g fill="none" stroke="currentColor" stroke-width="8.3" stroke-linecap="round" stroke-linejoin="round">
			<path d="M64.38,95.75L64.38,81.63C64.36,73.49 68.37,65.85 75.08,61.24C88.17,52.31 95.75,37.2 95.08,21.37C75.12,20.51 56.8,32.79 50,51.57C43.2,32.79 24.87,20.51 4.91,21.37C4.25,37.2 11.83,52.31 24.92,61.24C31.63,65.85 35.64,73.49 35.62,81.63L35.62,95.75" />
		</g>
	`;

interface MermaidArrowSaverSettings {
	selectedDiagramTypes: DiagramType[];
};

const DEFAULT_SETTINGS: MermaidArrowSaverSettings = {
	selectedDiagramTypes: [ 'flowchart', 'classDiagram' ], //TODO better default settings
};

export default class MermaidArrowSaver extends Plugin {
	settings: MermaidArrowSaverSettings;

	async onload() {
		await this.loadSettings();
		this.addButtonForDiagramTypes( this.settings.selectedDiagramTypes );
	}

	async loadSettings() {
		this.settings = { ...DEFAULT_SETTINGS, ...( await this.loadData() ) };
	}

	addButtonForDiagramTypes( diagramTypes: DiagramType[] ) { //HACK
		const definitions = new MermaidDefinitions( diagramTypes );
		const defSVG = definitions.getDefinitions();
		const iconName = `mermaid-redef`;
		addIcon( iconName, defSVG + BUTTON_ICON );
		this.addRibbonIcon( iconName, 'Mermaid Arrow Saver', this.addOnButtonClick );
	}

	addOnButtonClick( evt: MouseEvent ) {
		new Notice( 'This button keep Mermaid arrows visible.\nClicking it does nothing.' );
	}

	// ▼ HACKS FOR DEV EXPERIMENTS

	oneButtonPerDiagramType() { //HACK
		let diagramType: DiagramType;
		for ( diagramType in DIAGRAM_TYPES ) {
			this.addButtonForSingleDiagramType( diagramType );
		}
	}

	addButtonForSingleDiagramType( diagramType: DiagramType ) { //HACK
		const definitions = new MermaidDefinitions( [ diagramType ] );
		const defSVG = definitions.getDefinitions().replace( '<defs>', `<defs id="${ this.getRedefID( diagramType ) }">` );
		const iconName = `mermaid-redef-${ diagramType }`;
		const buttonName = `Mermaid ${ diagramType }`;
		addIcon( iconName, defSVG + BUTTON_ICON );
		this.addRibbonIcon( iconName, buttonName, this.getDisplayToggler( diagramType ) );
	}

	getRedefID( diagramType: DiagramType ): string { //HACK
		return `redef-${ diagramType }`;
	}

	getDisplayToggler( diagramType: DiagramType ) { //HACK
		const id = this.getRedefID( diagramType );
		return () => { document.getElementById( id )?.classList.toggle( 'hidden-redef' ); };
	}
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

