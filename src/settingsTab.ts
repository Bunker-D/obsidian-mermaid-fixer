import { App, PluginSettingTab, Setting } from 'obsidian';
import MermaidFixer from './plugin';
import { DiagramType, Mermaid } from './mermaid';
import { Conflict } from './mermaidDefinitions';

const HIGHLIGHT_CLASS = 'mermaid-fixer-highlight' as const;
const CALLOUT_CLASS = 'mermaid-fixer-setting-callout' as const;
const ID_PREFIX = 'mermaid-fixer-opt-' as const;

export class MermaidFixerSettingTab extends PluginSettingTab {
	private plugin: MermaidFixer;
	private diagramTypesSelection: { [ key in DiagramType ]: boolean; };
	private conflictsSection: HTMLElement;
	private conflictsListEl: HTMLElement;

	constructor( app: App, plugin: MermaidFixer ) {
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
			.setDesc( 'The button is needed, but does nothing.' )
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
		const h3 = this.conflictsSection.createEl( 'h3' );
		const warningSVG = h3.createSvg( 'svg', {
			attr: {
				'viewBox': '0 0 24 24',
				'width': '24',
				'height': '24',
				'fill': 'none',
				'stroke': 'currentColor',
				'stroke-width': '2',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
			}
		} );
		warningSVG.createSvg( 'path', {
			attr: {
				'd': 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z'
			}
		} );
		warningSVG.createSvg( 'line', {
			attr: {
				'x1': '12',
				'y1': '9',
				'x2': '12',
				'y2': '13',
			}
		} );
		warningSVG.createSvg( 'line', {
			attr: {
				'x1': '12',
				'y1': '17',
				'x2': '12.01',
				'y2': '17',
			}
		} );
		// h3.appendChild( WARNING_SVG() )
		h3.appendText( ' "Conflicts between selected diagram types:"' );
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
