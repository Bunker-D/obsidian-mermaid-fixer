[🧜‍♀️ Syntax](https://mermaid.js.org/syntax/sequenceDiagram.html)

```mermaid
sequenceDiagram
	autonumber
	Alice->Alice: sequencenumber
	Alice->>John: arrowhead
	Alice-xJohn: crosshead
	Alice-)John: filled-head
```

```mermaid
sequenceDiagram
	participant a as Alice
	participant j as John
	note right of a: Hello world!
	properties a: {"class": "", "type": "@clock"}
	properties j: {"class": "", "type": "@computer"}
	links a: {"Repo": "https://www.contoso.com/repo", "Swagger": "https://www.contoso.com/swagger"}
	links j: {"Repo": "https://www.contoso.com/repo"}
	a->>j: Hello John, how are you?
	j-->>a: Great!
```

**Note:** As of 2023-13-06, symbols are also defined for ids `computer`, `databased` and `clock`. But, based on the [documentation]([Sequence diagrams | Mermaid](https://mermaid.js.org/syntax/sequenceDiagram.html)) and [source code](https://github.com/mermaid-js/mermaid/blob/develop/packages/mermaid/src/diagrams/sequence/sequenceRenderer.ts), it seems that those ids are actually never used.
