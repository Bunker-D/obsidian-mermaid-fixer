import { MERMAID_DATA, DiagramType, MarkerID, SVGContent } from './mermaidData';

export type { DiagramType, SVGContent, MarkerID } from './mermaidData';
export type MarkersByID = { [ key: MarkerID ]: SVGContent; };
export type MarkersByDiagramType = { [ key in DiagramType ]?: SVGContent; };

export abstract class Mermaid {

	static getMarkersForDiagramType( diagramType: DiagramType ): MarkersByID {
		return MERMAID_DATA[ diagramType ].definitions;
	}

	static getMapForDiagramTypes<T>( defaultValue: T ): { [ key in DiagramType ]: T } {
		const map: Partial<{ [ key in DiagramType ]: T }> = {};
		let diagramType: DiagramType;
		for ( diagramType in MERMAID_DATA ) {
			map[ diagramType ] = defaultValue;
		}
		return map as { [ key in DiagramType ]: T };
	}

	static getDiagramTypeDescription( diagramType: DiagramType ): string {
		return MERMAID_DATA[ diagramType ].description;
	}
}
