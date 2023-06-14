import { Mermaid, DiagramType, SVGContent, MarkerID, MarkersByDiagramType, MarkersByID } from './mermaid';

export type Conflict = { markerID: MarkerID, diagramTypes: DiagramType[]; };

export class MermaidDefinitions {

	private markersByIDThenDiagramType: { [ key: MarkerID ]: MarkersByDiagramType; };

	constructor( diagramTypesList: DiagramType[] ) {
		this.flush();
		for ( const diagramType of diagramTypesList ) {
			this.addDiagramType( diagramType );
		}
	}

	private flush() {
		this.markersByIDThenDiagramType = {};
	}

	private addDiagramType( diagramType: DiagramType ) {
		const diagramMarkers = Mermaid.getMarkersForDiagramType( diagramType );
		for ( const markerID in diagramMarkers ) {
			this.markersByIDThenDiagramType[ markerID ] ??= {};
			this.markersByIDThenDiagramType[ markerID ][ diagramType ] = diagramMarkers[ markerID ];
		}
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
