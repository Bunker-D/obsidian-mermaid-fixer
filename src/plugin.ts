import { Notice, Plugin, addIcon } from 'obsidian';
import { DiagramType } from './mermaid';
import { MermaidDefinitions } from './mermaidDefinitions';
import { BUTTON_ICON } from './icons';
import { MermaidArrowSaverSettingTab } from './settingsTab';

//TODO Setting page for selecting the covered chart types
//TODO The setting page must inform of conflicts

//IMPROVE Alternative option: select the chart types dynamically based on active tab?

interface MermaidArrowSaverSettings {
	selectedDiagramTypes: DiagramType[];
	emptyButton: boolean;
};

const DEFAULT_SETTINGS: MermaidArrowSaverSettings = {
	selectedDiagramTypes: [ 'flowchart', 'classDiagram' ], //HACK better default settings
	emptyButton: false,
};

const DEV_MODE = true as const;
const BUTTON_DEFS_ID = 'mermaid-defs-saver' as const;
const BUTTON_PATH_ID = 'mermaid-defs-saver-path' as const;

export default class MermaidArrowSaver extends Plugin {
	settings: MermaidArrowSaverSettings;

	async onload() {
		await this.loadSettings();
		this.addButtonForDiagramTypes( this.settings.selectedDiagramTypes );
		this.addSettingTab( new MermaidArrowSaverSettingTab( this.app, this ) );
	}

	getEmptyButtonSetting(): boolean {
		return this.settings.emptyButton;
	}
	async setEmptyButtonSetting( emptyButton: boolean ) {
		console.log( this );
		this.settings.emptyButton = emptyButton;
		this.applyEmptyButtonSetting();
		this.saveSettings();
	}

	async loadSettings() {
		this.settings = { ...DEFAULT_SETTINGS, ...( await this.loadData() ) };
	}

	async saveSettings() {
		console.log( 'SAVE SETTINGS:' );  //HACK
		console.log( this.settings );     //HACK
		// await this.saveData( this.settings );
	}

	addButtonForDiagramTypes( diagramTypes: DiagramType[] ) {
		const definitions = new MermaidDefinitions( diagramTypes );
		const defSVG = definitions.getSVGDefinitions( BUTTON_DEFS_ID );
		const buttonIcon = `<g id="${ BUTTON_PATH_ID }">${ ( this.settings.emptyButton ) ? '' : BUTTON_ICON }</g>`;
		addIcon( 'mermaid-arrow-saver', defSVG + buttonIcon );
		this.addRibbonIcon( 'mermaid-arrow-saver', 'Mermaid Arrow Saver', this.createButtonFunction() );
	}

	private createButtonFunction(): ( e: MouseEvent ) => void {
		if ( DEV_MODE ) {
			return ( e ) => { this.onDevButtonClick(); };
		}
		return ( e ) => { this.onButtonClick(); };
	}

	private onButtonClick() {
		new Notice( 'This button keep Mermaid arrows visible.\nClicking it does nothing.' );
	}

	private onDevButtonClick() {
		console.log( this );
		this.toggleDefIDs();
	}

	applyEmptyButtonSetting() {
		const buttonPath = document.getElementById( BUTTON_PATH_ID );
		if ( !buttonPath ) return;
		if ( this.settings.emptyButton ) {
			buttonPath.innerHTML = '';
		} else {
			buttonPath.innerHTML = BUTTON_ICON;
		}
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
