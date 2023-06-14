[🧜‍♀️ Syntax](https://mermaid.js.org/syntax/entityRelationshipDiagram.html)

```mermaid
erDiagram
	START_OO ||--|| END_OO : ONLY_ONE
	START_ZOO |o--o| END_ZOO : ZERO_OR_ONE
```

```mermaid
erDiagram
	START_ZOM }o--o{ END_ZOM : ZERO_OR_MORE
	START_OOM }|--|{ END_OOM : ONE_OR_MORE
```
