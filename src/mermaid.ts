import { MERMAID_DATA, DiagramType, MarkerID, SVGContent, CSSContent } from './mermaidData';

export type { DiagramType, SVGContent, CSSContent, MarkerID } from './mermaidData';
export type MarkersByID = { [ key: MarkerID ]: SVGContent; };
export type MarkersByDiagramType = { [ key in DiagramType ]?: SVGContent; };

export abstract class Mermaid {

	static getDiagramTypeDescription( diagramType: DiagramType ): string {
		return MERMAID_DATA[ diagramType ].description;
	}

	static getMarkersForDiagramType( diagramType: DiagramType ): MarkersByID {
		return MERMAID_DATA[ diagramType ].definitions;
	}

	static getDiagramTypeStyle( diagramType: DiagramType ): CSSContent {
		return MERMAID_DATA[ diagramType ].style ?? '';
	}

	static getMapForDiagramTypes<T>( defaultValue: T ): { [ key in DiagramType ]: T } {
		const map: Partial<{ [ key in DiagramType ]: T }> = {};
		let diagramType: DiagramType;
		for ( diagramType in MERMAID_DATA ) {
			map[ diagramType ] = defaultValue;
		}
		return map as { [ key in DiagramType ]: T };
	}

}
