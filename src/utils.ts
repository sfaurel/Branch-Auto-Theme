import * as vscode from 'vscode';

type BranchType = 'Protected' | 'Develop' | 'Feature' | 'Other';

type BranchMappingsConfig = {
    [key: string]: string;  
}

const branchStatusBarItemStyle = {
   'Protected': {
    'text': '⚠️ You are in a protected branch',
    'backgroundColor': new vscode.ThemeColor('statusBarItem.errorBackground'),
    'foregroundColor': new vscode.ThemeColor('statusBarItem.errorForeground')
   },
   'Develop': {
    'text': 'You are in a develop branch',
    'backgroundColor': new vscode.ThemeColor('statusBar.background'),
    'foregroundColor': new vscode.ThemeColor('statusBar.foreground')
   },
   'Feature': {
    'text': 'You are in a feature branch',
    'backgroundColor': new vscode.ThemeColor('statusBar.background'),
    'foregroundColor': new vscode.ThemeColor('statusBar.foreground')
   },
   'Other': {
    'text': '⚠️ You are in an unmanaged branch',
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
    console.log(branchMappings);

    if (!branchMappings){
        return 'Other';
    }

    if (branchMappings.protected.split(',').some((pattern: string ) => pattern && new RegExp(pattern).test(currentBranch))) {
        return 'Protected';
    } 

    if (branchMappings.develop.split(',').some((pattern: string ) => pattern && new RegExp(pattern).test(currentBranch))) {
        return 'Develop';
    } 

    if (branchMappings.feature.split(',').some((pattern: string ) => pattern && new RegExp(pattern).test(currentBranch))) {
        return 'Feature';
    } 
    
    return 'Other';

}
