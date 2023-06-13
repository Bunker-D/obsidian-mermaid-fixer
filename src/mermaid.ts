import { MERMAID_DATA, DiagramType, MarkerID, SVGContent } from './mermaid_data';

export type { DiagramType, SVGContent, MarkerID } from './mermaid_data';
export type MarkersByID = { [ key: MarkerID ]: SVGContent; };
export type MarkersByDiagramType = { [ key in DiagramType ]?: SVGContent; };

export abstract class Mermaid {
	static getMarkersForDiagramType( diagramType: DiagramType ): MarkersByID {
		return MERMAID_DATA[ diagramType ].definitions;
	}
}
