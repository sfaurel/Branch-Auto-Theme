
**Branch Auto Theme** is a Visual Studio Code extension designed to automatically adjust your editor's theme based on the active Git branch. By giving each branch group a unique theme, Branch Auto Theme helps you visually identify your working environment and avoid accidental edits in the wrong branch. This seamless integration enhances productivity, reducing context-switching errors, making it ideal for developers who frequently work across multiple branches.

## Features


- Displays the current branch type directly in the status bar for developers who prefer a subtle, non-intrusive branch indication. Providing visibility into the active branch context with a status bar item for each branch type:

  ![Protected](https://img.shields.io/badge/⚠️_Protected-red) ![Develop](https://img.shields.io/badge/Develop-gray) ![Feature](https://img.shields.io/badge/Feature-gray) ![Unmanaged](https://img.shields.io/badge/⚠️_Unmanaged-yellow)

- **Customizable branch mappings**: Users can configure their own branch types directly in the settings `branchAutoTheme.branchMappings` to match their specific workflow.

<!-- Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\) -->

<!-- > Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow. -->

<!-- ## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them. -->

## Extension Settings

In the settings, users can customize the branches that match each branch category, allowing them to configure specific branches to match their workflow.

`branchAutoTheme.branchMappings`: Configure which Git branches correspond to each branch type. Values are comma-separated branch names or patterns that define which branches belong to each category.


Example configuration:

```json
{
  "branchAutoTheme.branchMappings": {
    "protected": "main, master",
    "develop": "develop",
    "feature": "feature/*"
  }
}
```

<!-- 
## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension. -->

## Release Notes

### 0.0.1

Initial version of **Branch Auto Theme**, providing current branch context in status bar item
- Detects the active branch type (Protected, Develop, Feature, Other).
- Displays the corresponding type as status bar indicator.
- Customizable Branch Mappings.

## Next Steps

- [ ] Add theme mode for branch types.
- [ ] Implement mode selector: "Theme", "Status Bar Item", "Both", or "Off".
- [ ] Enhance error handling for unsupported branch patterns.

Thank you to everyone who contributes ideas, reports bugs, or suggests improvements—your help makes this project better