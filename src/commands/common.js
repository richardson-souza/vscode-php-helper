const vscode = require('vscode');
const fs = require('fs');

async function fileOpenDialog() {
    const selectedFolder = await vscode.window.showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false
    })

    if (!selectedFolder || !selectedFolder[0]) {
        showErrorMessage('No folder seleted');
    }

    return selectedFolder[0];

}

async function inputFileName(type) {
    const fileName = await vscode.window.showInputBox({
        title: "New PHP " + type.toUpperCase(),
        placeHolder: "FileName.php",
        prompt: "Name of " + type
    });

    if (!fileName) {
        showErrorMessage('File name not set');
        return;
    }

    return fileName.endsWith('.php') ? fileName : fileName + '.php';
}

function openDocument(fullpath) {
    if (!fullpath) {
        showErrorMessage('File not found!');
    }
    vscode.workspace.openTextDocument(vscode.Uri.file(fullpath)).then(file => {
        vscode.window.showTextDocument(file)
    })
}

function showErrorMessage(message) {
    vscode.window.showErrorMessage(message)
}

function setStatusBarMessage(message) {
    vscode.window.setStatusBarMessage(message, 3000);
}

function writeFile(fullpath, content, overwrite = false) {
    if (fs.existsSync(fullpath) && !overwrite) {
        showErrorMessage('File exists!');
    }

    fs.writeFileSync(fullpath, content);

    setStatusBarMessage('File created');

    return fullpath;
}

module.exports = {
    fileOpenDialog,
    writeFile,
    showErrorMessage,
    inputFileName,
    openDocument,
    setStatusBarMessage
}