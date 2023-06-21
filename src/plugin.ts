import { Notice, Plugin, addIcon, removeIcon, setIcon, getIconIds } from 'obsidian';
import { DiagramType, SVGContent } from './mermaid';
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

export default class MermaidFixer extends Plugin {
	private settings: MermaidFixerSettings;
	private mermaidDefinitions: MermaidDefinitions;
	private ribbonButton: HTMLElement;
	private iconID: string;

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
		this.updateIcon();
		this.saveSettings();
	}

	getSelectedDiagramTypes(): DiagramType[] {
		return this.settings.selectedDiagramTypes;
	}

	async setSelectedDiagramTypes( diagramType: DiagramType[] ) {
		this.settings.selectedDiagramTypes = diagramType;
		this.updateMermaidDefinitions();
		this.updateIcon();
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
		this.updateIcon();
		this.ribbonButton = this.addRibbonIcon( this.iconID, 'Mermaid Fixer', this.createButtonFunction() );
	}

	private updateIcon(): void {
		if ( this.iconID ) {
			removeIcon( this.iconID );
		}
		this.renewIconID();
		const defSVG: SVGContent = `<defs>${ this.buildDefsContent() }</defs>`;
		const buttonIcon: SVGContent = ( this.settings.visibleButton ) ? BUTTON_ICON : '';
		addIcon( this.iconID, defSVG + buttonIcon );
		if ( this.ribbonButton ) {
			setIcon( this.ribbonButton, this.iconID );
		}
	}

	private renewIconID(): void {
		if ( !this.iconID ) {
			this.iconID = 'mermaid-fixer';
			return;
		}
		if ( this.iconID.endsWith( '-' ) ) {
			this.iconID = this.iconID.substring( 0, this.iconID.length - 1 );
			return;
		}
		this.iconID += '-';
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

	private toggleDefIDs(): void {
		if ( getIconIds().indexOf( 'mermaid-fixer-off' ) < 0 ) {
			const strike: SVGContent = '<line id="mermaid-fixer-off" x1="0" y1="100" x2="100" y2="0" stroke="currentColor" stroke-width="8.3" />';
			addIcon( 'mermaid-fixer-off', BUTTON_ICON + strike );
		}
		if ( document.getElementById( 'mermaid-fixer-off' ) ) {
			this.updateIcon();
		} else {
			setIcon( this.ribbonButton, 'mermaid-fixer-off' );
		}
	}

}
