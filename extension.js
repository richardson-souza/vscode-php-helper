// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { readFile } = require('fs/promises')

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "php-helpfull-snippets" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('php-helpfull-snippets.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Php helpfull snippets!');
	});

	let fixNamespace = vscode.commands.registerCommand('php-helpfull-snippets.fixNamespace', async function () {
		// The code you place here will be executed every time your command is executed

		// workdir do projeto que está aberto
		let workdir = vscode.workspace.workspaceFolders[0].uri.path;
		  
		// carregando composer.json para objeto
		const composerCfg = JSON.parse(await readFile(`${workdir}/composer.json`, 'utf8'))
		let namespaces = composerCfg.autoload['psr-4']

		// caminho do arquivo que está aberto e em foco no editor
		var currentlyOpenTabfilePath = vscode.window.activeTextEditor?.document.uri.fsPath;

		let relativePath = currentlyOpenTabfilePath.replace(`${workdir}/`, '')
		let namespaceList = Object.entries(namespaces)
		
		let namespaceMatch = namespaceList.filter(([key, value]) => relativePath.startsWith(value))[0]

		if(namespaceMatch) {
			let namespace = relativePath
				.replace(namespaceMatch[1], namespaceMatch[0])
					.replace(/(\/\w*).(\w*)$/,'')
						.replaceAll('/','\\');
			
			vscode.window.showInformationMessage(namespace);
		}
		
		// Display a message box to the user
		// vscode.window.showInformationMessage('fix namespace from Php helpfull snippets!');
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(fixNamespace);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
