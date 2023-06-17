import { Notice, Plugin, addIcon } from 'obsidian';
import { DiagramType } from './mermaid';
import { Conflict, MermaidDefinitions } from './mermaidDefinitions';
import { BUTTON_ICON } from './icons'; import { MermaidFixerSettingTab } from './settingsTab';

interface MermaidFixerSettings {
	selectedDiagramTypes: DiagramType[];
	visibleButton: boolean;
};

const DEFAULT_SETTINGS: MermaidFixerSettings = {
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

const BUTTON_DEFS_ID = 'mermaid-fixer-defs' as const;
const BUTTON_PATH_ID = 'mermaid-fixer-button-path' as const;

export default class MermaidFixer extends Plugin {
	private settings: MermaidFixerSettings;
	private mermaidDefinitions: MermaidDefinitions;

	async onload() {
		await this.loadSettings();
		this.addButtonForDiagramTypes();
		this.addSettingTab( new MermaidFixerSettingTab( this.app, this ) );
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
		const defSVG = `<defs id="${ BUTTON_DEFS_ID }">${ this.buildDefsContent() }</defs>`;
		const buttonIcon = `<g id="${ BUTTON_PATH_ID }">${ ( this.settings.visibleButton ) ? BUTTON_ICON : '' }</g>`;
		addIcon( 'mermaid-fixer', defSVG + buttonIcon );
		this.addRibbonIcon( 'mermaid-fixer', 'Mermaid Fixer', this.createButtonFunction() );
	}

	private buildDefsContent(): string {
		return this.mermaidDefinitions.getSVGDefinitions() +
			`<style>${ this.mermaidDefinitions.getStyles() }</style>`;
	}

	private createButtonFunction(): ( e: MouseEvent ) => void {
		return ( e ) => {
			new Notice( 'This button keeps Mermaid arrows visible.\nClicking it does nothing.' );
			// this.toggleDefIDs(); //HACK Uncomment when updating the Mermaid markers, to toggle their effects by clicking the button.
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
		definitionsEl.innerHTML = this.buildDefsContent();
	}

	private toggleDefIDs(): void {
		const defs = document.getElementById( BUTTON_DEFS_ID );
		if ( !defs ) return;
		const mustDeactivate = defs.dataset.inactive !== 'true';
		defs.dataset.inactive = '' + mustDeactivate;
		const modID: ( id: string ) => string =
			( mustDeactivate )
				? ( id ) => '---' + id
				: ( id ) => id.substring( 3 );
		for ( const el of defs.children ) {
			if ( el.tagName === 'style' ) {
				( el as HTMLStyleElement ).disabled = mustDeactivate;
			} else {
				el.id = modID( el.id );
			}
		}
		const message = ( mustDeactivate ) ? '🧜‍♀️🚫 DEACTIVATED ❌' : '🧜‍♀️🔱 ACTIVATED ✅';
		new Notice( message );
		console.log( message );
	}

}
