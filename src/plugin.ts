import { Notice, Plugin, addIcon } from 'obsidian';
import { DiagramType } from './mermaid';
import { MermaidDefinitions } from './mermaidDefinitions';
import { BUTTON_ICON } from './icons'; import { MermaidArrowSaverSettingTab } from './settingsTab';

//IMPROVE Alternative option: select the chart types dynamically based on active tab?

interface MermaidArrowSaverSettings {
	selectedDiagramTypes: DiagramType[];
	visibleButton: boolean;
};

const DEFAULT_SETTINGS: MermaidArrowSaverSettings = {
	selectedDiagramTypes: [ 'flowchart', 'classDiagram' ], //HACK better default settings
	visibleButton: true,
};

const DEV_MODE = true as const;
const BUTTON_DEFS_ID = 'mermaid-defs-saver' as const;
const BUTTON_PATH_ID = 'mermaid-defs-saver-path' as const;

export default class MermaidArrowSaver extends Plugin {
	settings: MermaidArrowSaverSettings;

	async onload() {
		await this.loadSettings();
		this.addButtonForDiagramTypes();
		this.addSettingTab( new MermaidArrowSaverSettingTab( this.app, this ) );
	}

	async loadSettings() {
		this.settings = { ...DEFAULT_SETTINGS, ...( await this.loadData() ) };
	}

	async saveSettings() {
		console.log( 'SAVE SETTINGS:' );  //HACK
		console.log( this.settings );     //HACK
		// await this.saveData( this.settings );
	}

	getButtonVisibility(): boolean {
		return this.settings.visibleButton;
	}

	async setButtonVisibility( buttonVisibility: boolean ) {
		this.settings.visibleButton = buttonVisibility;
		this.applyButtonVisibility();
		this.saveSettings();
	}

	getSelectedDiagramTypes(): DiagramType[] {
		return this.settings.selectedDiagramTypes;
	}

	async setSelectedDiagramTypes( diagramType: DiagramType[] ) {
		this.settings.selectedDiagramTypes = diagramType;
		this.applyDiagramTypesSelection();
		this.saveSettings();
	}

	addButtonForDiagramTypes( ): void {
		const definitions = new MermaidDefinitions(  this.settings.selectedDiagramTypes  );
		const defSVG = `<defs id="${ BUTTON_DEFS_ID }">${ definitions.getSVGDefinitions() }</defs>`;
		const buttonIcon = `<g id="${ BUTTON_PATH_ID }">${ ( this.settings.visibleButton ) ? BUTTON_ICON : '' }</g>`;
		addIcon( 'mermaid-arrow-saver', defSVG + buttonIcon );
		this.addRibbonIcon( 'mermaid-arrow-saver', 'Mermaid Arrow Saver', this.createButtonFunction() );
	}

	private createButtonFunction(): ( e: MouseEvent ) => void {
		if ( DEV_MODE ) {
			return ( e ) => { this.onDevButtonClick(); };
		}
		return ( e ) => { this.onButtonClick(); };
	}

	private onButtonClick(): void {
		new Notice( 'This button keep Mermaid arrows visible.\nClicking it does nothing.' );
	}

	private onDevButtonClick(): void {
		console.log( this );
		this.toggleDefIDs();
	}

	applyButtonVisibility(): void {
		const buttonIconEl = document.getElementById( BUTTON_PATH_ID );
		if ( !buttonIconEl ) return;
		if ( this.settings.visibleButton ) {
			buttonIconEl.innerHTML = BUTTON_ICON;
		} else {
			buttonIconEl.innerHTML = '';
		}
	}

	applyDiagramTypesSelection(): void {
		const definitions = new MermaidDefinitions(  this.settings.selectedDiagramTypes  );
		const definitionsEl = document.getElementById( BUTTON_DEFS_ID );
		if ( !definitionsEl ) return;
		definitionsEl.innerHTML = definitions.getSVGDefinitions();
	}

	toggleDefIDs() {
		const defs = document.getElementById( BUTTON_DEFS_ID );
		if ( !defs || !defs.firstElementChild ) return;
		const firstID = defs.firstElementChild.id;
		const idsAreInactive = firstID.startsWith( '---' );
		const modID: ( id: string ) => string =
			( idsAreInactive )
				? ( id ) => id.substring( 3 )
				: ( id ) => '---' + id;
		for ( const marker of defs.children ) {
			marker.id = modID( marker.id );
		}
	}

}
