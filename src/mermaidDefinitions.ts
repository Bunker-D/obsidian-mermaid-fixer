import { Mermaid, DiagramType, SVGContent, CSSContent, MarkerID, MarkersByDiagramType } from './mermaid';

export type Conflict = { markerID: MarkerID, diagramTypes: DiagramType[]; };

export class MermaidDefinitions {

	private markersByIDThenDiagramType: { [ key: MarkerID ]: MarkersByDiagramType; };
	private styles: { [ key in DiagramType ]?: CSSContent; };

	constructor( diagramTypesList: DiagramType[] ) {
		this.flush();
		for ( const diagramType of diagramTypesList ) {
			this.addDiagramType( diagramType );
		}
	}

	private flush() {
		this.markersByIDThenDiagramType = {};
		this.styles = {};
	}

	private addDiagramType( diagramType: DiagramType ) {
		const diagramMarkers = Mermaid.getMarkersForDiagramType( diagramType );
		for ( const markerID in diagramMarkers ) {
			this.markersByIDThenDiagramType[ markerID ] ??= {};
			this.markersByIDThenDiagramType[ markerID ][ diagramType ] = diagramMarkers[ markerID ];
		}
		this.styles[ diagramType ] = Mermaid.getDiagramTypeStyle( diagramType );
	}

	getSVGDefinitions(): SVGContent {
		let definitions: SVGContent = '';
		for ( const markerID in this.markersByIDThenDiagramType ) {
			const markerDefinitions = Object.values( this.markersByIDThenDiagramType[ markerID ] );
			const firstMarkerDefinition = markerDefinitions[ 0 ];
			definitions += firstMarkerDefinition;
		}
		return definitions;
	}

	getStyles(): CSSContent {
		let style = '';
		let diagramType: DiagramType;
		for ( diagramType in this.styles ) {
			style += this.styles[ diagramType ];
		}
		return style;
	}

	getConflicts(): Conflict[] {
		const conflicts: Conflict[] = [];
		for ( const markerID in this.markersByIDThenDiagramType ) {
			if ( !this.hasConflictForID( markerID ) ) continue;
			const diagramTypes = Object.keys( this.markersByIDThenDiagramType[ markerID ] ) as DiagramType[];
			conflicts.push( { markerID, diagramTypes } );
		}
		return conflicts;
	}

	private hasConflictForID( markerID: MarkerID ): boolean {
		const markersList: SVGContent[] = Object.values( this.markersByIDThenDiagramType[ markerID ] );
		const ref = markersList.pop();
		for ( const marker of markersList ) {
			if ( marker !== ref ) return true;
		}
		return false;
	}
}
