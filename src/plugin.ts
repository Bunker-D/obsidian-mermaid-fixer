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
};

const DEFAULT_SETTINGS: MermaidArrowSaverSettings = {
	selectedDiagramTypes: [ 'flowchart', 'classDiagram' ], //HACK better default settings
};

const DEV_MODE = true as const;
const DEFS_ID = 'mermaid-defs-saver' as const;

export default class MermaidArrowSaver extends Plugin {
	settings: MermaidArrowSaverSettings;

	async onload() {
		await this.loadSettings();
		this.addButtonForDiagramTypes( this.settings.selectedDiagramTypes );
		this.addSettingTab( new MermaidArrowSaverSettingTab( this.app, this ) );
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
		const defs = document.getElementById( DEFS_ID );
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
