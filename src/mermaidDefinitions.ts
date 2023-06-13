import { Mermaid, DiagramType, SVGContent, MarkerID, MarkersByDiagramType, MarkersByID } from './mermaid';

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

	public getSVGDefinitions( defsID?: string ): SVGContent {
		let definitions: SVGContent = '';
		for ( const markerID in this.markersByIDThenDiagramType ) {
			const markerDefinitions = Object.values( this.markersByIDThenDiagramType[ markerID ] );
			const firstMarkerDefinition = markerDefinitions[ 0 ];
			definitions += firstMarkerDefinition;
		}
		const id = ( defsID ) ? ` id="${ defsID }"` : '';
		return `<defs${ id }>${ definitions }</defs>`;
	}

	// public getConflicts(): MermaidDefinitionConflict[] {
	// 	const conflicts: MermaidDefinitionConflict[] = [];
	// 	for ( const id in this.markersByIDThenDiagramType ) {
	// 		if ( !this.hasConflict( id ) ) continue;
	// 		const 

	// 			conflicts.push( new MermaidDefinitionConflict( id, this.markersByIDThenDiagramType[ id ] ) );
	// 	}
	// 	return conflicts;
	// }

	// private hasConflict( markerID: MarkerID ): boolean {
	// 	return  Object.keys( this.markersByIDThenDiagramType[ markerID ] ).length > 1
	// }

}

