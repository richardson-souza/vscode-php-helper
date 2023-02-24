const vscode = require('vscode');
const fs = require('fs');

async function createSimpleFile() {
    const fileName = await vscode.window.showInputBox(
        {
            "prompt": 'Enter file name',
            "value": 'FileName.php'
        }
    );

    if (!fileName) {
        vscode.window.setStatusBarMessage(`Invalid file.`, 3000);
        return;
    }

    const options = {
        canSelectMany: false,
        openLabel: 'Select',
        canSelectFiles: false,
        canSelectFolders: true
    };

    const simpleContent = '<?php\n';

    const fileUri = await vscode.window.showOpenDialog(options).then(fileUri => {
        if (fileUri && fileUri[0]) {
            const savedFile = fileUri[0].fsPath + '/' + fileName;
            fs.writeFile(savedFile, simpleContent, err => {
                if (err) {
                    vscode.window.setStatusBarMessage(`${fileName}` + 'not saved', 3000);
                }
            });
            return savedFile;
        }
    });

    if (fileUri) {
        vscode.workspace.openTextDocument(fileUri).then(document => {
            vscode.window.showTextDocument(document);
        });
    }

}

module.exports = {
    createSimpleFile
}
