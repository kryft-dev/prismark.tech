# @prismark/config

Baseline configs every package extends. One file per tool.

| File          | Used by                                             |
| ------------- | --------------------------------------------------- |
| `oxlint.json` | every package's `.oxlintrc.json`, through `extends` |

Add the package as a dev dependency with `workspace:*`, then extend by path:

```json
{ "extends": ["./node_modules/@prismark/config/oxlint.json"] }
```

Packages add their own plugins on top. Setting `plugins` in a child replaces the list, so a child repeats the baseline plugins and appends its own.
