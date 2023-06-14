import { Notice, Plugin, addIcon } from 'obsidian';
import { DiagramType } from './mermaid';
import { Conflict, MermaidDefinitions } from './mermaidDefinitions';
import { BUTTON_ICON } from './icons'; import { MermaidArrowSaverSettingTab } from './settingsTab';

interface MermaidArrowSaverSettings {
	selectedDiagramTypes: DiagramType[];
	visibleButton: boolean;
};

const DEFAULT_SETTINGS: MermaidArrowSaverSettings = {
	selectedDiagramTypes: [
		'flowchart',
		'sequenceDiagram',
		'classDiagram',
		'stateDiagram',
		'erDiagram',
		'gantt',
		'pie',
		'requirementDiagram',
		'gitGraph',
	],
	visibleButton: true,
};

const BUTTON_DEFS_ID = 'mermaid-defs-saver' as const;
const BUTTON_PATH_ID = 'mermaid-defs-saver-path' as const;

export default class MermaidArrowSaver extends Plugin {
	private settings: MermaidArrowSaverSettings;
	private mermaidDefinitions: MermaidDefinitions;

	async onload() {
		await this.loadSettings();
		this.addButtonForDiagramTypes();
		this.addSettingTab( new MermaidArrowSaverSettingTab( this.app, this ) );
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
		this.updateMermaidDefinitions();
		this.applyDiagramTypesSelection();
		this.saveSettings();
	}

	getConflicts(): Conflict[] {
		return this.mermaidDefinitions.getConflicts();
	}

	private updateMermaidDefinitions() {
		this.mermaidDefinitions = new MermaidDefinitions( this.settings.selectedDiagramTypes );
	}

	private async loadSettings() {
		this.settings = { ...DEFAULT_SETTINGS, ...( await this.loadData() ) };
		this.updateMermaidDefinitions();
	}

	private async saveSettings() {
		await this.saveData( this.settings );
	}

	private addButtonForDiagramTypes(): void {
		const defSVG = `<defs id="${ BUTTON_DEFS_ID }">${ this.mermaidDefinitions.getSVGDefinitions() }</defs>`;
		const buttonIcon = `<g id="${ BUTTON_PATH_ID }">${ ( this.settings.visibleButton ) ? BUTTON_ICON : '' }</g>`;
		addIcon( 'mermaid-arrow-saver', defSVG + buttonIcon );
		this.addRibbonIcon( 'mermaid-arrow-saver', 'Mermaid Arrow Saver', this.createButtonFunction() );
	}

	private createButtonFunction(): ( e: MouseEvent ) => void {
		return ( e ) => {
			// new Notice( 'This button keeps Mermaid arrows visible.\nClicking it does nothing.' ); //HACK
			this.toggleDefIDs(); //HACK Uncomment when updating the Mermaid markers, to toggle their effects by clicking the button.
		};
	}

	private applyButtonVisibility(): void {
		const buttonIconEl = document.getElementById( BUTTON_PATH_ID );
		if ( !buttonIconEl ) return;
		if ( this.settings.visibleButton ) {
			buttonIconEl.innerHTML = BUTTON_ICON;
		} else {
			buttonIconEl.innerHTML = '';
		}
	}

	private applyDiagramTypesSelection(): void {
		const definitionsEl = document.getElementById( BUTTON_DEFS_ID );
		if ( !definitionsEl ) return;
		definitionsEl.innerHTML = this.mermaidDefinitions.getSVGDefinitions();
	}

	private toggleDefIDs(): void {
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
		const message = ( idsAreInactive ) ? '🧜‍♀️🔱 ACTIVATED ✅' : '🧜‍♀️🚫 DEACTIVATED ❌';
		new Notice( message );
		console.log( message );
	}

}
