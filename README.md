
**Branch Auto Theme** is a Visual Studio Code extension designed to automatically adjust your editor's theme based on the active Git branch. By giving each branch group a unique theme, Branch Auto Theme helps you visually identify your working environment and avoid accidental edits in the wrong branch. This seamless integration enhances productivity, reducing context-switching errors, making it ideal for developers who frequently work across multiple branches.

## Features

- **Editor Theme Switching**: Automatically switch editor themes based on the active branch type using `branchAutoTheme.branchThemeConfig`. This setting allows users to assign specific themes for different branch types (e.g., a "Red" theme for `Protected`, "Blue" for `Develop`). As users switch branches, the editor theme updates dynamically to reflect the active branch context.

- **Customizable branch mappings**: Users can configure their own branch types directly in the settings `branchAutoTheme.branchMappings` to match their specific workflow.

- **Branch Type Status Bar Indicator**: Displays the current branch type directly in the status bar for developers who prefer a subtle, non-intrusive branch indication. Providing visibility into the active branch context with a status bar item for each branch type:

  ![Protected](https://img.shields.io/badge/⚠️_Protected-red) ![Develop](https://img.shields.io/badge/Develop-gray) ![Feature](https://img.shields.io/badge/Feature-gray) ![Unmanaged](https://img.shields.io/badge/⚠️_Unmanaged-yellow)

- **Mode Selection**: Choose how branch type indicators are displayed with the `branchAutoTheme.mode` setting: `Theme`, `Status Bar`, `Theme and Status Bar`, or `Off`

- **Theme Selection Command**: Easily assign themes for each branch type with the `branchAutoTheme.selectTheme` command. Lets users quickly choose and set a theme for each branch type through a dropdown.


<!-- Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\) -->

<!-- > Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow. -->

<!-- ## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them. -->

## Extension Settings

In the settings, users can customize the branches that match each branch category, allowing them to configure specific branches to match their workflow.

- `branchAutoTheme.mode`: Set `Theme`, `Status Bar`, `Theme and Status Bar`, or `Off` modes.

- `branchAutoTheme.branchMappings`: Configure which Git branches correspond to each branch type. Values are comma-separated branch names or patterns that define which branches belong to each category.

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

- `branchAutoTheme.branchThemeConfig`: Configure a specific theme for each branch type.

  Example configuration:
  ```json
  {
    "branchAutoTheme.branchThemeConfig": {
        "protected": "Red",
        "develop": "Tomorrow Night Blue",
        "feature": "Solarized Dark",
        "other": "Quiet Light"
    }
  }
  ```

<!-- 
## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension. -->

## Release Notes

Moved to [CHANGELOG.md](./CHANGELOG.md)

## Next Steps

- [x] Add theme mode for branch types.
- [x] Implement mode selector: `Theme`, `Status Bar Item`, `Both`, or `Off`.
- [ ] Work test cases
Thank you to everyone who contributes ideas, reports bugs, or suggests improvements—your help makes this project better