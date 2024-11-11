import * as vscode from 'vscode';
import { updateStatusBarItem, getActiveBranchType } from './utils';

let branchStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

	const activateCommand = vscode.commands.registerCommand('branch-auto-theme.activate', async () => {
		// init repository
		const git = vscode.extensions.getExtension('vscode.git');
		const repository = git?.exports.getAPI(1).repositories[0];
		
		if(repository){
			// init status bar
			branchStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
			context.subscriptions.push(branchStatusBarItem);
			const branchType = getActiveBranchType(repository);
			updateStatusBarItem(branchStatusBarItem, branchType);
			branchStatusBarItem.show();

			// add branch change listener
			repository.state.onDidChange(() => {
				const branchType = getActiveBranchType(repository);
				updateStatusBarItem(branchStatusBarItem, branchType);
			});
			
			// add config change listener
			vscode.workspace.onDidChangeConfiguration((event) => {
				if (event.affectsConfiguration('branchAutoTheme')) {
					const branchType = getActiveBranchType(repository);
					updateStatusBarItem(branchStatusBarItem, branchType);
				}
			});
		}

		vscode.window.showInformationMessage('Branch Auto Theme is now active!');
	});
	
	const deactivateCommand = vscode.commands.registerCommand('branch-auto-theme.deactivate', () => {
		vscode.window.showInformationMessage('Branch Auto Theme is now inactive :(');
		deactivate()
	});
	
	context.subscriptions.push(activateCommand,deactivateCommand);
}


export function deactivate() {

	if (branchStatusBarItem) {
		branchStatusBarItem.dispose();
	}
}
