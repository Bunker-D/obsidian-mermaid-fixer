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

	public getSVGDefinitions(): SVGContent {
		let definitions: SVGContent = '';
		for ( const markerID in this.markersByIDThenDiagramType ) {
			const markerDefinitions = Object.values( this.markersByIDThenDiagramType[ markerID ] );
			const firstMarkerDefinition = markerDefinitions[ 0 ];
			definitions += firstMarkerDefinition;
		}
		return definitions;
	}

}

