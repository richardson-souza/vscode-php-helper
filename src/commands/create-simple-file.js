const vscode = require('vscode');
const fs = require('fs');

const name = 'php-helpfull-snippets.createPHPFile';

async function createSimpleFile() {
    const fileName = await vscode.window.showInputBox(
        {
            "prompt": 'Enter file name',
            "value": 'FileName.php'
        }
    );

    //TODO: validate file name

    if (!fileName) {
        return;
    }

    const options = {
        canSelectMany: false,
        openLabel: 'Select',
        canSelectFiles: false,
        canSelectFolders: true
    };

    vscode.window.showOpenDialog(options).then(fileUri => {
        if (fileUri && fileUri[0]) {
            fs.writeFile(fileUri[0].fsPath + '/' + fileName, '<?php\n', err => {
                if (err) {
                    console.error(err);
                }
                vscode.window.showInformationMessage('File ' + fileName + ' has created.');
                // TODO: open to edit in vscode
            });
        }
    });
}

module.exports = {
    name,
    createSimpleFile
}
