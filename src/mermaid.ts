import { MERMAID_DATA, DiagramType, MarkerID, SVGContent } from './mermaidData';

export type { DiagramType, SVGContent, MarkerID } from './mermaidData';
export type MarkersByID = { [ key: MarkerID ]: SVGContent; };
export type MarkersByDiagramType = { [ key in DiagramType ]?: SVGContent; };

export abstract class Mermaid {

	static getMarkersForDiagramType( diagramType: DiagramType ): MarkersByID {
		return MERMAID_DATA[ diagramType ].definitions;
	}

}
