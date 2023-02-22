const vscode = require('vscode');

const simpleFile = require('./commands/create-simple-file.js');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "php-helpfull-snippets" is now active!');

	let disposable = vscode.commands.registerCommand('php-helpfull-snippets.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from Php helpfull snippets!');
	});

	context.subscriptions.push(
		disposable,
		vscode.commands.registerCommand(
			"php-helpfull-snippets.createSimpleFile", async function () { simpleFile.createSimpleFile(); }
		),
	);

}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
