
import { SVGContent } from "base_types";
import { DiagramType, MERMAID_DEFINITIONS_BY_CHART_TYPE } from "mermaid_data";

export class MermaidDefinitions {

	private markersByIDThenDiagramType: { [ key: string ]: { [ key in DiagramType ]?: SVGContent }; };

	constructor( diagramTypesList: DiagramType[] ) {
		this.initMarkersByIDThenDiagramType( diagramTypesList );
	}

	public getDefinitions(): SVGContent {
		const definitions: SVGContent =
			Object.values( this.markersByIDThenDiagramType )
				.map( ( defsByDiagramType ) => Object.values( defsByDiagramType )[ 0 ] )
				.join( '' );
		return `<defs>${ definitions }</defs>`;
	}

	public getConflicts(): MermaidDefinitionConflict[] {
		const conflicts :MermaidDefinitionConflict[]= [];
		for ( const id in this.markersByIDThenDiagramType ) {
			if ( Object.keys( this.markersByIDThenDiagramType[ id ] ).length > 1 ) {
				conflicts.push( new MermaidDefinitionConflict( id, this.markersByIDThenDiagramType[ id ] ) );
			}
		}
		return conflicts;
	}

	private initMarkersByIDThenDiagramType( diagramTypesList: DiagramType[] ) {
		this.markersByIDThenDiagramType = {};
		for ( const diagramType of diagramTypesList ) {
			const diagramMarkers = MERMAID_DEFINITIONS_BY_CHART_TYPE[ diagramType ];
			for ( const id in diagramMarkers ) {
				if ( !( id in this.markersByIDThenDiagramType ) ) {
					this.markersByIDThenDiagramType[ id ] = {};
				}
				this.markersByIDThenDiagramType[ id ][ diagramType ] = diagramMarkers[ id ];
			}
		}
	}

}

class MermaidDefinitionConflict { //TODO if nothing more, make it an interface

	private id: ID;
	private markersByChartType: { [ key in DiagramType ]?: SVGContent };

	constructor( id: ID, markersByChartType: { [ key in DiagramType ]?: SVGContent } ) {
		this.id = id;
		this.markersByChartType = markersByChartType;
	}

}
