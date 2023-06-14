/*
	This files stores data about Mermaid graphs:
	- The covered chart type,
	- The defined markers and symbols that may suffer from duplicated IDs.

	This is the file that most probably would need to be update if Mermaid changes how it compiles SVGs.

	⚠ Markers should not be just copy-pasted from the Mermaid-produced SVG:
	- They must generally be completed with proper `fill` and `stroke` attributes.
	- For markers with the same ID, make sure that HTML strings describing identical DOM elements are identical.

	If a new Mermaid diagram type should be covered, its ID should be added to `DiagramType`,
	in addition to completing `MERMAID_DATA`.
*/

export type DiagramType =
	'flowchart' |
	'sequenceDiagram' |
	'classDiagram' |
	'stateDiagram' |
	'erDiagram' |
	'journey' |
	'gantt' |
	'pie' |
	'requirementDiagram' |
	'gitGraph' |
	'C4Context';

export type SVGContent = string;
export type MarkerID = string;

type MarkerMap = { [ key: MarkerID ]: SVGContent; };
type DiagramData = { description: string, definitions: MarkerMap; };

export const MERMAID_DATA: { [ key in DiagramType ]: DiagramData } = {
	flowchart: {
		description:
			'Flowcharts',
		definitions: {
			'flowchart-pointEnd':
				'<marker id="flowchart-pointEnd" class="marker flowchart" stroke="var(--text-normal)" fill="var(--text-normal)" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></path></marker>',
			'flowchart-pointStart':
				'<marker id="flowchart-pointStart" class="marker flowchart" stroke="var(--text-normal)" fill="var(--text-normal)" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></path></marker>',
			'flowchart-circleEnd':
				'<marker id="flowchart-circleEnd" class="marker flowchart" stroke="var(--text-normal)" fill="var(--text-normal)" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></circle></marker>',
			'flowchart-circleStart':
				'<marker id="flowchart-circleStart" class="marker flowchart" stroke="var(--text-normal)" fill="var(--text-normal)" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></circle></marker>',
			'flowchart-crossEnd':
				'<marker id="flowchart-crossEnd" class="marker cross flowchart" stroke="var(--text-normal)" fill="var(--text-normal)" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"></path></marker>',
			'flowchart-crossStart':
				'<marker id="flowchart-crossStart" class="marker cross flowchart" stroke="var(--text-normal)" fill="var(--text-normal)" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"></path></marker>',
		},
	},
	sequenceDiagram: {
		description:
			'Sequence diagrams',
		definitions: {
			'arrowhead':
				'<marker id="arrowhead" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z"></path></marker>',
			'crosshead':
				'<marker id="crosshead" markerWidth="15" markerHeight="8" orient="auto" refX="4" refY="5"><path fill="none" stroke="#000000" stroke-width="1pt" d="M 1,2 L 6,7 M 6,2 L 1,7" style="stroke-dasharray: 0, 0;"></path></marker>',
			'filled-head':
				'<marker id="filled-head" refX="18" refY="7" markerWidth="20" markerHeight="28" orient="auto"><path d="M 18,7 L9,13 L14,7 L9,1 Z"></path></marker>',
			'sequencenumber':
				'<marker id="sequencenumber" refX="15" refY="15" markerWidth="60" markerHeight="40" orient="auto"><circle cx="15" cy="15" r="6"></circle></marker>',
		},
	},
	classDiagram: {
		description:
			'Class diagrams',
		definitions: {
			'classDiagram-aggregationStart':
				'<marker id="classDiagram-aggregationStart" class="marker aggregation classDiagram" refX="0" refY="7" markerWidth="190" markerHeight="240" orient="auto"><path d="M 18,7 L9,13 L1,7 L9,1 Z"></path></marker>',
			'classDiagram-aggregationEnd':
				'<marker id="classDiagram-aggregationEnd" class="marker aggregation classDiagram" refX="19" refY="7" markerWidth="20" markerHeight="28" orient="auto"><path d="M 18,7 L9,13 L1,7 L9,1 Z"></path></marker>',
			'classDiagram-extensionStart':
				'<marker id="classDiagram-extensionStart" class="marker extension classDiagram" refX="0" refY="7" markerWidth="190" markerHeight="240" orient="auto"><path d="M 1,7 L18,13 V 1 Z"></path></marker>',
			'classDiagram-extensionEnd':
				'<marker id="classDiagram-extensionEnd" class="marker extension classDiagram" refX="19" refY="7" markerWidth="20" markerHeight="28" orient="auto"><path d="M 1,1 V 13 L18,7 Z"></path></marker>',
			'classDiagram-compositionStart':
				'<marker id="classDiagram-compositionStart" class="marker composition classDiagram" refX="0" refY="7" markerWidth="190" markerHeight="240" orient="auto"><path d="M 18,7 L9,13 L1,7 L9,1 Z"></path></marker>',
			'classDiagram-compositionEnd':
				'<marker id="classDiagram-compositionEnd" class="marker composition classDiagram" refX="19" refY="7" markerWidth="20" markerHeight="28" orient="auto"><path d="M 18,7 L9,13 L1,7 L9,1 Z"></path></marker>',
			'classDiagram-dependencyStart':
				'<marker id="classDiagram-dependencyStart" class="marker dependency classDiagram" refX="0" refY="7" markerWidth="190" markerHeight="240" orient="auto"><path d="M 5,7 L9,13 L1,7 L9,1 Z"></path></marker>',
			'classDiagram-dependencyEnd':
				'<marker id="classDiagram-dependencyEnd" class="marker dependency classDiagram" refX="19" refY="7" markerWidth="20" markerHeight="28" orient="auto"><path d="M 18,7 L9,13 L14,7 L9,1 Z"></path></marker>',
			'classDiagram-lollipopStart':
				'<marker id="classDiagram-lollipopStart" class="marker lollipop classDiagram" refX="0" refY="7" markerWidth="190" markerHeight="240" orient="auto"><circle stroke="black" fill="white" cx="6" cy="7" r="6"></circle></marker>',
			'classDiagram-lollipopEnd':
				'<marker id="classDiagram-lollipopEnd" class="marker lollipop classDiagram" refX="12" refY="7" markerWidth="190" markerHeight="240" orient="auto"><circle stroke="black" fill="white" cx="6" cy="7" r="6"></circle></marker>',
		},
	},
	stateDiagram: {
		description:
			'State diagrams',
		definitions: {
			'statediagram-barbEnd':
				'<marker id="statediagram-barbEnd" refX="19" refY="7" markerWidth="20" markerHeight="14" markerUnits="strokeWidth" orient="auto"><path d="M 19,7 L9,13 L14,7 L9,1 Z"></path></marker>',
		},
	},
	erDiagram: {
		description:
			'Entity Relationship diagrams',
		definitions: {
			'ONLY_ONE_START':
				'<marker id="ONLY_ONE_START" refX="0" refY="9" markerWidth="18" markerHeight="18" orient="auto"><path stroke="gray" fill="none" d="M9,0 L9,18 M15,0 L15,18"></path></marker>',
			'ONLY_ONE_END':
				'<marker id="ONLY_ONE_END" refX="18" refY="9" markerWidth="18" markerHeight="18" orient="auto"><path stroke="gray" fill="none" d="M3,0 L3,18 M9,0 L9,18"></path></marker>',
			'ZERO_OR_ONE_START':
				'<marker id="ZERO_OR_ONE_START" refX="0" refY="9" markerWidth="30" markerHeight="18" orient="auto"><circle stroke="gray" fill="white" cx="21" cy="9" r="6"></circle><path stroke="gray" fill="none" d="M9,0 L9,18"></path></marker>',
			'ZERO_OR_ONE_END':
				'<marker id="ZERO_OR_ONE_END" refX="30" refY="9" markerWidth="30" markerHeight="18" orient="auto"><circle stroke="gray" fill="white" cx="9" cy="9" r="6"></circle><path stroke="gray" fill="none" d="M21,0 L21,18"></path></marker>',
			'ONE_OR_MORE_START':
				'<marker id="ONE_OR_MORE_START" refX="18" refY="18" markerWidth="45" markerHeight="36" orient="auto"><path stroke="gray" fill="none" d="M0,18 Q 18,0 36,18 Q 18,36 0,18 M42,9 L42,27"></path></marker>',
			'ONE_OR_MORE_END':
				'<marker id="ONE_OR_MORE_END" refX="27" refY="18" markerWidth="45" markerHeight="36" orient="auto"><path stroke="gray" fill="none" d="M3,9 L3,27 M9,18 Q27,0 45,18 Q27,36 9,18"></path></marker>',
			'ZERO_OR_MORE_START':
				'<marker id="ZERO_OR_MORE_START" refX="18" refY="18" markerWidth="57" markerHeight="36" orient="auto"><circle stroke="gray" fill="white" cx="48" cy="18" r="6"></circle><path stroke="gray" fill="none" d="M0,18 Q18,0 36,18 Q18,36 0,18"></path></marker>',
			'ZERO_OR_MORE_END':
				'<marker id="ZERO_OR_MORE_END" refX="39" refY="18" markerWidth="57" markerHeight="36" orient="auto"><circle stroke="gray" fill="white" cx="9" cy="18" r="6"></circle><path stroke="gray" fill="none" d="M21,18 Q39,0 57,18 Q39,36 21,18"></path></marker>',
		},
	},
	journey: {
		description:
			'User journeys',
		definitions: {
			'arrowhead':
				'<marker id="arrowhead" refX="5" refY="2" markerWidth="6" markerHeight="4" orient="auto"><path d="M 0,0 V 4 L6,2 Z"></path></marker>',
		},
	},
	gantt: {
		description:
			'Gantt charts',
		definitions: {},
	},
	pie: {
		description:
			'Pie charts',
		definitions: {},
	},
	requirementDiagram: {
		description:
			'Requirement diagrams',
		definitions: {
			'contains_line_ending':
				'<marker id="contains_line_ending" refX="0" refY="10" markerWidth="20" markerHeight="20" orient="auto"><g><circle cx="10" cy="10" r="10" fill="none"></circle><line x1="0" x2="20" y1="10" y2="10" stroke-width="1"></line><line y1="0" y2="20" x1="10" x2="10" stroke-width="1"></line></g></marker>',
			'arrow_line_ending':
				'<marker id="arrow_line_ending" refX="20" refY="10" markerWidth="20" markerHeight="20" orient="auto"><path d="M0,0L20,10 M20,10 L0,20" stroke-width="1"></path></marker>',
		},
	},
	gitGraph: {
		description:
			'Gitgraph diagrams',
		definitions: {},
	},
	C4Context: {
		description:
			'C4 Context diagrams',
		definitions: {
			'arrowhead':
				'<marker id="arrowhead" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z"></path></marker>',
			'arrowend':
				'<marker id="arrowend" refX="1" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 10 0 L 0 5 L 10 10 z"></path></marker>',
		},
	},
} as const;
