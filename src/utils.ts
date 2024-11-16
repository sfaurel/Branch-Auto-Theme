import * as vscode from 'vscode';

type BranchType = 'Protected' | 'Develop' | 'Feature' | 'Other';

export type BranchMappingsConfig = {
    [key: string]: string;  
}

export const THEME_MODE = "Theme";
export const BAR_MODE = "Status Bar";
export const BOTH_MODE = "Theme and Status Bar";
export const OFF_MODE = "Off";

const branchStatusBarItemStyle = {
   'Protected': {
    'text': '$(git-branch) ⚠️ You are in a protected branch',
    'backgroundColor': new vscode.ThemeColor('statusBarItem.errorBackground'),
    'foregroundColor': new vscode.ThemeColor('statusBarItem.errorForeground')
   },
   'Develop': {
    'text': '$(git-branch) You are in a develop branch',
    'backgroundColor': new vscode.ThemeColor('statusBar.background'),
    'foregroundColor': new vscode.ThemeColor('statusBar.foreground')
   },
   'Feature': {
    'text': '$(git-branch) You are in a feature branch',
    'backgroundColor': new vscode.ThemeColor('statusBar.background'),
    'foregroundColor': new vscode.ThemeColor('statusBar.foreground')
   },
   'Other': {
    'text': '$(git-branch) ⚠️ You are in an unmanaged branch',
    'backgroundColor': new vscode.ThemeColor('statusBarItem.warningBackground'),
    'foregroundColor': new vscode.ThemeColor('statusBarItem.warningForeground')
   }
};

/**
 * Updates the status bar item's style to match the corresponding branch type.
 * @param branchStatusBarItem - The branch status bar item to update.
 * @param branchType - The type of the current branch.
 */
export function updateStatusBarItem(branchStatusBarItem: vscode.StatusBarItem, branchType: BranchType) {
	branchStatusBarItem.text = branchStatusBarItemStyle[branchType].text;
	branchStatusBarItem.backgroundColor = branchStatusBarItemStyle[branchType].backgroundColor;
	branchStatusBarItem.color = branchStatusBarItemStyle[branchType].foregroundColor;
}



/**
 * Determines the active branch type as one of: 'Protected', 'Develop', 'Feature', or 'Other'.
 * @param repository - The working repository.
 * @returns The type of the active branch.
 */
export function getActiveBranchType(repository: any): BranchType {

    const currentBranch = repository.state.HEAD?.name || 'No branch';
    const branchMappings = vscode.workspace.getConfiguration('branchAutoTheme').get<BranchMappingsConfig>('branchMappings');
    if (!branchMappings){
        return 'Other';
    }

    if (branchMappings.protected.split(',').some((pattern: string ) => pattern.trim() && new RegExp(pattern.trim()).test(currentBranch))) {
        return 'Protected';
    } 

    if (branchMappings.develop.split(',').some((pattern: string ) => pattern.trim() && new RegExp(pattern.trim()).test(currentBranch))) {
        return 'Develop';
    } 

    if (branchMappings.feature.split(',').some((pattern: string ) => pattern.trim() && new RegExp(pattern.trim()).test(currentBranch))) {
        return 'Feature';
    } 
    
    return 'Other';

}

/**
 * Retrieves a list of all available themes from installed extensions.
 * @returns A list of available theme names.
 */
export function getAvailableThemes(): string[] {
    const themes = vscode.extensions.all.flatMap((ext) => {
        const contributes = ext.packageJSON.contributes;
        if (contributes && contributes.themes) {
            return contributes.themes.map((theme: any) => theme.label);
        }
        return [];
    });
    return themes;
}

/**
 * Applies the selected theme based on the branch type.
 * @param branchType The type of current branch.
 */
export async function applySelectedTheme(branchType: BranchType) {
    const selectedTheme = vscode.workspace.getConfiguration('branchAutoTheme').get<string>('branchThemeConfig.'+branchType.toLowerCase());
    const currentTheme = vscode.workspace.getConfiguration('workbench').get<string>('colorTheme', '');

    const themes = await getAvailableThemes();

    if(selectedTheme === currentTheme){
        return;
    }

    if (selectedTheme && selectedTheme?.includes("Select theme for")) {
        vscode.window.showWarningMessage(`Theme for "${branchType}" branches is not configured. Please configure it`);
        return;
    }

    if (selectedTheme && themes.includes(selectedTheme)) {
        await vscode.workspace.getConfiguration().update('workbench.colorTheme', selectedTheme, vscode.ConfigurationTarget.Workspace);
        vscode.window.showInformationMessage(`Color theme changed to ${selectedTheme}`);
        return;
    }
    vscode.window.showErrorMessage(`Theme "${selectedTheme}" not found. Please ensure it is installed.`);
    
}


/**
 * Configure the theme settings for all branch types.
 */
export async function configureThemes() {
    const themes = await getAvailableThemes();
    const branchTypes = ['Protected', 'Develop', 'Feature', 'Other'];
    const newConfig: Record<string, string> = {};
    for (const branchType of branchTypes) {
        const selectedTheme = await vscode.window.showQuickPick(themes, {
            placeHolder: `Select a theme for ${branchType} branch`
        });

        if (selectedTheme) {
            newConfig[branchType.toLowerCase()] = selectedTheme;
        }
    }
    await vscode.workspace.getConfiguration().update('branchAutoTheme.branchThemeConfig', newConfig, vscode.ConfigurationTarget.Global);
    
    const configMessage = Object.entries(newConfig)
                .map(([branch, theme]) => `${branch}: ${theme}`)
                .join('; ');
    vscode.window.showInformationMessage(`New theme configuration set to:\n${configMessage}`);
}

/**
 * Updates the status bar item and applies the selected theme based on the current branch type and user settings.
 * @param {vscode.StatusBarItem} branchStatusBarItem The status bar item to be updated.
 * @param {BranchType} branchType The current branch type.
 */
export function update(branchStatusBarItem: vscode.StatusBarItem, branchType: BranchType){

    const mode = vscode.workspace.getConfiguration('branchAutoTheme').get<string>('mode');
    if(mode === THEME_MODE || mode === BOTH_MODE){
        applySelectedTheme(branchType);
    }

    if(mode === BAR_MODE || mode === BOTH_MODE){
        updateStatusBarItem(branchStatusBarItem, branchType);
        branchStatusBarItem.show();
    }

    if(mode === THEME_MODE || mode === OFF_MODE){
        branchStatusBarItem.hide();
    }

    if(mode === BAR_MODE || mode === OFF_MODE){
        let theme = vscode.workspace.getConfiguration().get('workbench.colorTheme');
        switchToUserTheme();
    }
}

/**
 * Switches to the user's default theme by resetting the current theme configuration.
 */
export async function switchToUserTheme(){
    const configuration = vscode.workspace.getConfiguration('workbench');
    const inspected = configuration.inspect<string>('colorTheme');

    if (inspected?.workspaceValue) {
        await vscode.workspace.getConfiguration().update('workbench.colorTheme', undefined, vscode.ConfigurationTarget.Workspace);
        vscode.window.showInformationMessage(`Color theme was reset`);
    }
}