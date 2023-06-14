import { App, ColorComponent, PluginSettingTab, Setting } from 'obsidian';
import MermaidArrowSaver from './plugin';
import { DiagramType, Mermaid } from './mermaid';
import { Conflict } from './mermaidDefinitions';
import { WARNING_SVG } from './icons';

const HIGHLIGHT_CLASS = 'mermaid-save-arrow-highlight' as const;
const CALLOUT_CLASS = 'mermaid-arrow-saver-setting-callout' as const;
const ID_PREFIX = 'mermaid-save-arrow-opt-' as const;

export class MermaidArrowSaverSettingTab extends PluginSettingTab {
	private plugin: MermaidArrowSaver;
	private diagramTypesSelection: { [ key in DiagramType ]: boolean; };
	private conflictsSection: HTMLElement;
	private conflictsListEl: HTMLElement;

	constructor( app: App, plugin: MermaidArrowSaver ) {
		super( app, plugin );
		this.plugin = plugin;
	}

	display(): void {
		this.containerEl.empty();
		this.buildButtonVisibilityToggle();
		this.buildDiagramTypesSettings();
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
			.setName( createFragment( ( el ) => {
				el.createSpan( {
					text: Mermaid.getDiagramTypeDescription( diagramType ),
					cls: ID_PREFIX + diagramType
				} );
			} ) )
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
		this.updateConflicts();
	}

	private buildEmptyConflictSection(): void {
		this.conflictsSection =
			this.containerEl
				.createDiv( {
					cls: 'callout ' + CALLOUT_CLASS,
					attr: { 'data-callout': 'warning' }
				} );
		this.conflictsSection.createEl( 'h3' )
			.innerHTML = WARNING_SVG + ' "Conflicts between selected diagram types:"';
		this.conflictsListEl = this.conflictsSection.createEl( 'ul' );
	}

	private updateConflicts(): void {
		const conflictsList: Conflict[] = this.plugin.getConflicts();
		this.flushConflicts();
		for ( const conflict of conflictsList ) {
			this.addConflict( conflict );
		}
	}

	private flushConflicts(): void {
		this.conflictsListEl.empty();
		this.flushHighlights();
	}

	private flushHighlights(): void {
		const highlightedElems = [ ...this.containerEl.getElementsByClassName( HIGHLIGHT_CLASS ) ];
		for ( const el of highlightedElems ) {
			el.removeClass( HIGHLIGHT_CLASS );
		}
	}

	private addConflict( conflict: Conflict ): void {
		console.log( conflict );
		const { diagramTypes, markerID } = conflict;
		this.conflictsListEl.createEl( 'li', undefined, ( li ) => {
			for ( let i = 0; i < diagramTypes.length; i++ ) {
				if ( i ) {
					li.appendText( ( i === diagramTypes.length - 1 ) ? ' and ' : ', ' );
				}
				li.createEl( 'strong', {
					text: Mermaid.getDiagramTypeDescription( diagramTypes[ i ] )
				} );
			}
			li.appendText( ' define different markers for ID ' );
			li.createEl( 'code', { text: `"${ markerID }"` } );
			li.appendText( '.' );
		} );
		for ( const diagType of diagramTypes ) {
			this.addHighlight( diagType );
		}
	}
	private addHighlight( diagramType: DiagramType ): void {
		const elems = [ ...this.containerEl.getElementsByClassName( ID_PREFIX + diagramType ) ];
		for ( const el of elems ) {
			el.addClass( HIGHLIGHT_CLASS );
		}
	}
}
