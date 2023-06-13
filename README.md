# Keep Mermaid Arrows

<!-- TODO Plugin presentation -->

## How it works

### Basic idea

<!-- TODO Explain -->

### Files

- `mermaid_data.ts`: Store the necessary data about Mermaid graphs, i.e., what graphs are covered, and the markers and symbols they use that may suffer from duplicated IDs. If the plugin must be updated due to changes done to Mermaid (i.e., changes in the marker IDs), this is most probably this file that must be updated.

### Dev mode

A developper mode can be activated by setting the constant `DEV_MODE` to `true` in `src/plugin.ts`. It makes the plugin button have the effect of toggling the effects of the plugin (by actually changing the IDs it contains), in order to better see its effects.

It can be used to ensure that the markers and symbols defined in `mermaid_data.ts` give the proper results.

Don't forget to set `DEV_MODE` back to `false` when you're done.

<!-- TODO Complete -->
