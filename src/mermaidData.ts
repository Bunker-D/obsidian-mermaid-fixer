/*
	This files stores data about Mermaid graphs:
	- The covered diagram type,
	- The defined markers and symbols that may suffer from duplicated IDs,
	- Syle fixes, when needed.

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
export type CSSContent = string;
export type MarkerID = string;

type MarkerMap = { [ key: MarkerID ]: SVGContent; };
type DiagramData = { description: string, definitions: MarkerMap, style?: CSSContent; };

export const MERMAID_DATA: { [ key in DiagramType ]: DiagramData } = {
	flowchart: {
		description:
			'Flowcharts',
		definitions: {
			'flowchart-pointEnd':
				'<marker id="flowchart-pointEnd" stroke="var(--text-normal)" stroke-width="1" fill="var(--text-normal)" class="marker flowchart" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" /></marker>',
			'flowchart-pointStart':
				'<marker id="flowchart-pointStart" stroke="var(--text-normal)" stroke-width="1" fill="var(--text-normal)" class="marker flowchart" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" /></marker>',
			'flowchart-circleEnd':
				'<marker id="flowchart-circleEnd" stroke="var(--text-normal)" stroke-width="1" fill="var(--text-normal)" class="marker flowchart" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" /></marker>',
			'flowchart-circleStart':
				'<marker id="flowchart-circleStart" stroke="var(--text-normal)" stroke-width="1" fill="var(--text-normal)" class="marker flowchart" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" /></marker>',
			'flowchart-crossEnd':
				'<marker id="flowchart-crossEnd" stroke="var(--text-normal)" stroke-width="2" fill="var(--text-normal)" class="marker cross flowchart" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" /></marker>',
			'flowchart-crossStart':
				'<marker id="flowchart-crossStart" stroke="var(--text-normal)" stroke-width="2" fill="var(--text-normal)" class="marker cross flowchart" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" /></marker>',
		},
	},
	sequenceDiagram: {
		description:
			'Sequence diagrams',
		definitions: {
			'arrowhead':
				'<marker id="arrowhead" stroke="var(--text-normal)" stroke-width="1" fill="var(--text-normal)" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" /></marker>',
			'crosshead':
				'<marker id="crosshead" stroke="var(--text-normal)" markerWidth="15" markerHeight="8" orient="auto" refX="4" refY="5"><path stroke-width="1pt" d="M 1,2 L 6,7 M 6,2 L 1,7" style="stroke-dasharray: 0, 0;" /></marker>',
			'filled-head':
				'<marker id="filled-head" stroke="none" fill="var(--text-normal)" refX="18" refY="7" markerWidth="20" markerHeight="28" orient="auto"><path d="M 18,7 L9,13 L14,7 L9,1 Z" /></marker>',
			'sequencenumber':
				'<marker id="sequencenumber" fill="var(--text-normal)" refX="15" refY="15" markerWidth="60" markerHeight="40" orient="auto"><circle cx="15" cy="15" r="6" /></marker>',
		},
		style:
			'.mermaid [aria-roledescription="sequence"] .sequenceNumber{fill:var(--background-primary)!important;}',
	},
	classDiagram: {
		description:
			'Class diagrams',
		definitions: {
			'classDiagram-aggregationStart':
				'<marker id="classDiagram-aggregationStart" stroke="var(--text-normal)" stroke-width="1" fill="var(--background-primary)" class="marker aggregation classDiagram" refX="0" refY="7" markerWidth="190" markerHeight="240" orient="auto"><path d="M 18,7 L9,13 L1,7 L9,1 Z" /></marker>',
			'classDiagram-aggregationEnd':
				'<marker id="classDiagram-aggregationEnd" stroke="var(--text-normal)" stroke-width="1" fill="var(--background-primary)" class="marker aggregation classDiagram" refX="19" refY="7" markerWidth="20" markerHeight="28" orient="auto"><path d="M 18,7 L9,13 L1,7 L9,1 Z" /></marker>',
			'classDiagram-extensionStart':
				'<marker id="classDiagram-extensionStart" stroke="var(--text-normal)" stroke-width="1" fill="var(--background-primary)" class="marker extension classDiagram" refX="0" refY="7" markerWidth="190" markerHeight="240" orient="auto"><path d="M 1,7 L18,13 V 1 Z" /></marker>',
			'classDiagram-extensionEnd':
				'<marker id="classDiagram-extensionEnd" stroke="var(--text-normal)" stroke-width="1" fill="var(--background-primary)" class="marker extension classDiagram" refX="19" refY="7" markerWidth="20" markerHeight="28" orient="auto"><path d="M 1,1 V 13 L18,7 Z" /></marker>',
			'classDiagram-compositionStart':
				'<marker id="classDiagram-compositionStart" stroke="var(--text-normal)" stroke-width="1" fill="var(--text-normal)" class="marker composition classDiagram" refX="0" refY="7" markerWidth="190" markerHeight="240" orient="auto"><path d="M 18,7 L9,13 L1,7 L9,1 Z" /></marker>',
			'classDiagram-compositionEnd':
				'<marker id="classDiagram-compositionEnd" stroke="var(--text-normal)" stroke-width="1" fill="var(--text-normal)" class="marker composition classDiagram" refX="19" refY="7" markerWidth="20" markerHeight="28" orient="auto"><path d="M 18,7 L9,13 L1,7 L9,1 Z" /></marker>',
			'classDiagram-dependencyStart':
				'<marker id="classDiagram-dependencyStart" stroke="var(--text-normal)" stroke-width="1" fill="var(--text-normal)" class="marker dependency classDiagram" refX="0" refY="7" markerWidth="190" markerHeight="240" orient="auto"><path d="M 5,7 L9,13 L1,7 L9,1 Z" /></marker>',
			'classDiagram-dependencyEnd':
				'<marker id="classDiagram-dependencyEnd" stroke="var(--text-normal)" stroke-width="1" fill="var(--text-normal)" class="marker dependency classDiagram" refX="19" refY="7" markerWidth="20" markerHeight="28" orient="auto"><path d="M 18,7 L9,13 L14,7 L9,1 Z" /></marker>',
			'classDiagram-lollipopStart':
				'<marker id="classDiagram-lollipopStart" stroke="var(--text-normal)" stroke-width="1" fill="var(--background-primary)" class="marker lollipop classDiagram" refX="0" refY="7" markerWidth="190" markerHeight="240" orient="auto"><circle cx="6" cy="7" r="6" /></marker>',
			'classDiagram-lollipopEnd':
				'<marker id="classDiagram-lollipopEnd" stroke="var(--text-normal)" stroke-width="1" fill="var(--background-primary)" class="marker lollipop classDiagram" refX="12" refY="7" markerWidth="190" markerHeight="240" orient="auto"><circle cx="6" cy="7" r="6" /></marker>',
		},
		style:
			'.mermaid [aria-roledescription="classDiagram"] .relation{stroke:var(--text-normal)!important;}',
		//TODO authorize lollipop (or all markers) overflow
		//TODO correct lollipop colors in dark theme
	},
	stateDiagram: {
		description:
			'State diagrams',
		definitions: {
			'statediagram-barbEnd':
				'<marker id="statediagram-barbEnd" stroke="var(--text-normal)" fill="var(--text-normal)" refX="19" refY="7" markerWidth="20" markerHeight="14" markerUnits="strokeWidth" orient="auto"><path stroke-width="1" d="M 19,7 L9,13 L14,7 L9,1 Z"></path></marker>',
		},
	},
	erDiagram: {
		description:
			'Entity Relationship diagrams',
		definitions: {
			'ONLY_ONE_START':
				'<marker id="ONLY_ONE_START" stroke="var(--text-muted)" stroke-width="1" fill="none" refX="0" refY="9" markerWidth="18" markerHeight="18" orient="auto"><path d="M9,0 L9,18 M15,0 L15,18"></path></marker>',
			'ONLY_ONE_END':
				'<marker id="ONLY_ONE_END" stroke="var(--text-muted)" stroke-width="1" fill="none" refX="18" refY="9" markerWidth="18" markerHeight="18" orient="auto"><path d="M3,0 L3,18 M9,0 L9,18"></path></marker>',
			'ZERO_OR_ONE_START':
				'<marker id="ZERO_OR_ONE_START" stroke="var(--text-muted)" stroke-width="1" fill="none" refX="0" refY="9" markerWidth="30" markerHeight="18" orient="auto"><circle fill="var(--background-primary)" cx="21" cy="9" r="6"></circle><path d="M9,0 L9,18"></path></marker>',
			'ZERO_OR_ONE_END':
				'<marker id="ZERO_OR_ONE_END" stroke="var(--text-muted)" stroke-width="1" fill="none" refX="30" refY="9" markerWidth="30" markerHeight="18" orient="auto"><circle fill="var(--background-primary)" cx="9" cy="9" r="6"></circle><path d="M21,0 L21,18"></path></marker>',
			'ONE_OR_MORE_START':
				'<marker id="ONE_OR_MORE_START" stroke="var(--text-muted)" stroke-width="1" fill="none" refX="18" refY="18" markerWidth="45" markerHeight="36" orient="auto"><path d="M0,18 Q 18,0 36,18 Q 18,36 0,18 M42,9 L42,27"></path></marker>',
			'ONE_OR_MORE_END':
				'<marker id="ONE_OR_MORE_END" stroke="var(--text-muted)" stroke-width="1" fill="none" refX="27" refY="18" markerWidth="45" markerHeight="36" orient="auto"><path d="M3,9 L3,27 M9,18 Q27,0 45,18 Q27,36 9,18"></path></marker>',
			'ZERO_OR_MORE_START':
				'<marker id="ZERO_OR_MORE_START" stroke="var(--text-muted)" stroke-width="1" fill="none" refX="18" refY="18" markerWidth="57" markerHeight="36" orient="auto"><circle fill="var(--background-primary)" cx="48" cy="18" r="6"></circle><path d="M0,18 Q18,0 36,18 Q18,36 0,18"></path></marker>',
			'ZERO_OR_MORE_END':
				'<marker id="ZERO_OR_MORE_END" stroke="var(--text-muted)" stroke-width="1" fill="none" refX="39" refY="18" markerWidth="57" markerHeight="36" orient="auto"><circle fill="var(--background-primary)" cx="9" cy="18" r="6"></circle><path d="M21,18 Q39,0 57,18 Q39,36 21,18"></path></marker>',
		},
		style:
			'.mermaid [aria-roledescription="er"] path.er{stroke:var(--text-muted)!important;}',
	},
	journey: {
		description:
			'User journeys',
		definitions: { //TODO could be identical to others with style correction?
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
				'<marker id="contains_line_ending" stroke="var(--text-muted)" stroke-width="1" fill="var(--background-primary)" style="overflow:visible" refX="0" refY="10" markerWidth="20" markerHeight="20" orient="auto"><circle cx="10" cy="10" r="10"></circle><line x1="0" x2="20" y1="10" y2="10"></line><line y1="0" y2="20" x1="10" x2="10"></line></marker>',
			'arrow_line_ending':
				'<marker id="arrow_line_ending" stroke="var(--text-muted)" stroke-width="1" fill="var(--background-primary)" style="overflow:visible" refX="20" refY="10" markerWidth="20" markerHeight="20" orient="auto"><path d="M0,0L20,10 M20,10 L0,20"></path></marker>',
		},
		style:
			'.mermaid [aria-roledescription="requirement"] path.er{stroke:var(--text-normal)!important;}.mermaid [aria-roledescription="requirement"] .reqBox{fill:var(--background-primary-alt)!important;stroke:var(--text-muted)!important}.mermaid [aria-roledescription="requirement"] .reqLabelBox{fill:var(--background-secondary)!important;stroke:none!important}.mermaid [aria-roledescription="requirement"] .req-title-line{stroke:var(--text-muted)!important}.mermaid [aria-roledescription="requirement"] .relationshipLabel{fill:var(--text-normal)!important}',
	},
	gitGraph: {
		description:
			'Gitgraph diagrams',
		definitions: {},
	},
	C4Context: {
		description:
			'C4 Context diagrams',
		definitions: { //TODO
			'arrowhead':
				'<marker id="arrowhead" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z"></path></marker>',
			'arrowend':
				'<marker id="arrowend" refX="1" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 10 0 L 0 5 L 10 10 z"></path></marker>',
		},
	},
} as const;
