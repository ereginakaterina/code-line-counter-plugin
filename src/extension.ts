// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Counter of code lines is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('code-line-counter.countLines', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
            vscode.window.showErrorMessage('No active text editor found!');
            return;
		}
		const selection = editor.selection;
        let text: string; 
        let lineCount: number; 

        if (selection.isEmpty) {
            text = editor.document.getText(); 
            lineCount = editor.document.lineCount; 
        } else {
            text = editor.document.getText(selection); 
            const selectedLineCount = selection.end.line - selection.start.line + 1;
            lineCount = selectedLineCount;
        }

        const emptyLines = text.split('\n').filter(line => line.trim() === '').length;
        const nonEmptyLines = lineCount - emptyLines;
		vscode.window.showInformationMessage(
            `Lines: ${lineCount} total, ${nonEmptyLines} non-empty, ${emptyLines} empty`
        );
    });
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
