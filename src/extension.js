const vscode = require('vscode');

const create = require('./commands/create.js');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    console.log('Congratulations, your extension "php-helpfull-snippets" is now active!');

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "php-helpfull-snippets.createSimpleFile", async function () { create.simpleFile('file'); }
        ),
    );

}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate
}
