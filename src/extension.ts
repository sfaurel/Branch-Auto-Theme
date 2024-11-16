import * as vscode from 'vscode';
import { 
	getActiveBranchType,
	configureThemes,
	switchToUserTheme,
	update,
	OFF_MODE
} from './utils';

let branchStatusBarItem: vscode.StatusBarItem;
export function activate(context: vscode.ExtensionContext) {

	// init repository
	const git = vscode.extensions.getExtension('vscode.git');
	const repository = git?.exports.getAPI(1).repositories[0];

	// init status bar
	branchStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	context.subscriptions.push(branchStatusBarItem);
	branchStatusBarItem.show();


	const isFirstActivation = !context.globalState.get('hasBeenActivated');
	console.log(context.globalState);

    if (isFirstActivation) {
        // Show a toast message to the user
        vscode.window.showInformationMessage(
            'Thank you for installing Branch Auto Theme! Please configure the extension settings.',
            'Configure Now'
        ).then(selection => {
            if (selection === 'Configure Now') {
                // Open the settings JSON file or a specific configuration page
                vscode.commands.executeCommand('branchAutoTheme.selectTheme');
            }
        });

        // Mark the extension as activated
        context.globalState.update('hasBeenActivated', true);
    }


	if(repository){

		const branchType = getActiveBranchType(repository);
		update(branchStatusBarItem, branchType);


		// add branch change listener
		repository.state.onDidChange(() => {
			const mode = vscode.workspace.getConfiguration('branchAutoTheme').get<string>('mode');
			if(mode !== OFF_MODE){
				const branchType = getActiveBranchType(repository);
				update(branchStatusBarItem, branchType);
			}
		});
		
		// add config change listener
		vscode.workspace.onDidChangeConfiguration((event) => {
			if (event.affectsConfiguration('branchAutoTheme')) {
				const branchType = getActiveBranchType(repository);
				update(branchStatusBarItem, branchType);
			}
		});
	}



	const activateCommand = vscode.commands.registerCommand('branch-auto-theme.activate', () => {
		vscode.window.showInformationMessage('Branch Auto Theme is now active!');
	});
	
	const deactivateCommand = vscode.commands.registerCommand('branch-auto-theme.deactivate', () => {
		deactivate();
	});

	const configThemesCommand = vscode.commands.registerCommand('branchAutoTheme.selectTheme', () => {
		configureThemes();
	});
	
	context.subscriptions.push(activateCommand,deactivateCommand,configThemesCommand);
}


export function deactivate() {

	if (branchStatusBarItem) {
		branchStatusBarItem.dispose();
	}

	switchToUserTheme();
	vscode.window.showInformationMessage('Branch Auto Theme is now inactive :(');
}
