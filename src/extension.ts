import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

	const activateCommand = vscode.commands.registerCommand('branch-auto-theme.activate', () => {
		vscode.window.showInformationMessage('Branch Auto Theme is now active!');
	});
	
	const deactivateCommand = vscode.commands.registerCommand('branch-auto-theme.deactivate', () => {
		vscode.window.showInformationMessage('Branch Auto Theme is now inactive :(');
	});

	context.subscriptions.push(activateCommand,deactivateCommand);
}


export function deactivate() {}
