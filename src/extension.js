const vscode = require('vscode');
const create = require('./commands/create.js');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "php-helper.createSimpleFile", async function () { create.simpleFile(); }
        ),
    );

}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate
}
