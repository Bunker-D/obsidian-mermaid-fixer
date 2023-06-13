import { App, PluginSettingTab, Setting } from 'obsidian';
import MermaidArrowSaver from './plugin';
import { DiagramType, Mermaid } from './mermaid';

export class MermaidArrowSaverSettingTab extends PluginSettingTab {
	plugin: MermaidArrowSaver;
	diagramTypesSelection: { [ key in DiagramType ]: boolean; };
	conflictsSection: HTMLElement;
	conflictsListEl: HTMLElement;

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
		this.buildEmptyConflictSection();
		this.updateConflicts();
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

	private buildEmptyConflictSection(): void {
		this.conflictsSection = this.containerEl.createEl(
			'div', { cls: 'callout mermaid-arrow-saver-setting-callout', attr: { 'data-callout': 'warning' } }
		);
		this.conflictsSection.createEl( 'h3', { text: 'Conflicts between selected diagram types:' } );
		this.conflictsListEl = this.conflictsSection.createEl( 'ul' );
	}

	private updateConflicts(): void {
		//TODO build conflicts from this.diagramTypesSelection
		
		const conflicts: { diagramTypes: DiagramType[], markerID: string; }[] = [ // HACK
			{
				diagramTypes: [ 'flowchart', 'classDiagram' ],
				markerID: 'flow-class',
			},
			{
				diagramTypes: [ 'flowchart', 'classDiagram', 'erDiagram' ],
				markerID: 'flow-class-relationship',
			},
		];
		for ( const conflict in conflicts ) {
			this.addConflict( conflict );
		}
	}

	private flushConflicts(): void {
		this.conflictsListEl.empty(); 
	}

	private addConflict( conflict: any /*TODO*/ ): void {
		this.conflictsListEl.createEl( 'li', 'conflict' ); //HACK
		// TODO
	}
	/* Target conflict section:
		<div class="mermaid-arrow-saver-warning" data-callout="warning">
			<h2>
				<ObsidianIcon icon="alert-triangle" />" Conflicts between diagram types"
			</h2>
			<ul>
				<li>
					<strong>Flowcharts</strong>, <strong>Class diagrams</strong> and <strong>Entity relationship diagrams</strong>
					defines differents for id <code>test-id</code>
				</li>
			</ul>
	</div>
	*/
}
