import { App, PluginSettingTab, Setting } from "obsidian";
import MermaidArrowSaver from "./plugin";
import { DiagramType, Mermaid } from "./mermaid";

export class MermaidArrowSaverSettingTab extends PluginSettingTab {
	plugin: MermaidArrowSaver;
	diagramTypesSelection: { [ key in DiagramType ]: boolean; };

	constructor( app: App, plugin: MermaidArrowSaver ) {
		super( app, plugin );
		this.plugin = plugin;
	}

	display(): void {
		this.containerEl.empty();
		this.buildButtonVisibilityToggle();
		this.buildDiagramTypesSettings();
		//TODO conflict info
	}

	private buildButtonVisibilityToggle(): void {
		new Setting( this.containerEl )
			.setName( 'Visible button' )
			.setDesc(
				createFragment( ( el ) => {
					el.appendText( 'Make the plugin button more discrete by making it empty.' );
					el.createEl( 'br' );
					el.appendText( '(The plugin relies on this button, but clicking it does nothing.)' );
				} ),
			)
			.addToggle( ( toggle ) => {
				toggle.setValue( this.plugin.getButtonVisibility() );
				toggle.onChange( ( value ) => { this.plugin.setButtonVisibility( value ); } );
			} );
	}

	private buildDiagramTypesSettings(): void {
		this.initializeDiagramTypeSelection();
		this.containerEl.createEl( 'h2', { text: 'Covered Mermaid diagram types:' } );
		let diagramType: DiagramType;
		for ( diagramType in this.diagramTypesSelection ) {
			this.buildDiagramTypeToggle( diagramType );
		}
	}

	private initializeDiagramTypeSelection(): void {
		this.diagramTypesSelection = Mermaid.getMapForDiagramTypes( false );
		const currentDiagramTypes = this.plugin.getSelectedDiagramTypes();
		let activeDiagramType: DiagramType;
		for ( activeDiagramType of currentDiagramTypes ) {
			this.diagramTypesSelection[ activeDiagramType ] = true;
		}
	}

	private buildDiagramTypeToggle( diagramType: DiagramType ): void {
		new Setting( this.containerEl )
			.setName( Mermaid.getDiagramTypeDescription( diagramType ) )
			.addToggle( ( toggle ) => {
				toggle.setValue( this.diagramTypesSelection[ diagramType ] );
				toggle.onChange( ( value ) => {
					this.diagramTypesSelection[ diagramType ] = value;
					this.updateDiagramTypesSelection();
				} );
			} );
	}

	private updateDiagramTypesSelection(): void {
		const selectedDiagramTypes: DiagramType[] = [];
		let diagramType: DiagramType;
		for ( diagramType in this.diagramTypesSelection ) {
			if ( this.diagramTypesSelection[ diagramType ] ) {
				selectedDiagramTypes.push( diagramType );
			}
		}
		this.plugin.setSelectedDiagramTypes( selectedDiagramTypes );
	}

}
