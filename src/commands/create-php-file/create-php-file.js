const vscode = require('vscode');
const fs = require('fs');

function getWorkspaceFolderUri(documentUri) {
	if (documentUri) {
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(documentUri);
		return workspaceFolder ?
			workspaceFolder.uri :
			vscode.Uri.joinPath(documentUri, "..");
	}
	const workspaceFolders = vscode.workspace.workspaceFolders;

	return (workspaceFolders && (workspaceFolders.length > 0)) ?
		workspaceFolders[0].uri:
		null;
}

async function setFileName() {
	let fileName = await vscode.window.showInputBox(
		{
			"prompt": 'Enter file name',
			"value": 'FileName.php'
		}
	);

	if (!fileName) {
		return;
	}

	return fileName;
}

async function createPhpFile() {
	let fileName = await setFileName();
	console.log(fileName);

	const workspaceFolderUri = getWorkspaceFolderUri();

	if (!workspaceFolderUri) {
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
			console.log('Selected file: ' + fileUri[0].fsPath);
			fs.writeFile(fileUri[0].fsPath + '/' + fileName, '<?php', err => {
				if (err) {
					console.error(err);
				}
				// file written successfully
			});
		}
	});



	//const fileUri = vscode.Uri.joinPath(workspaceFolderUri, fileName);

	//const untitledFileUri = fileUri.with({ "scheme": "untitled" });

	//vscode.window.showTextDocument(fileUri);



	// if (workspaceFolderUri) {
	// 	Promise.all(configFileNames.map((configFileName) => {
	// 		const fileUri = vscode.Uri.joinPath(workspaceFolderUri, configFileName);
	// 		return vscode.workspace.fs.stat(fileUri).then(
	// 			() => fileUri,
	// 			() => null
	// 		);
	// 	})).then((fileUris) => {
	// 		const validFilePaths = fileUris.filter((filePath) => filePath !== null);
	// 		if (validFilePaths.length > 0) {
	// 			// File exists, open it
	// 			vscode.window.showTextDocument(validFilePaths[0]);
	// 		} else {
	// 			// File does not exist, create one
	// 			const fileUri = vscode.Uri.joinPath(workspaceFolderUri, markdownlintJson);
	// 			const untitledFileUri = fileUri.with({ "scheme": schemeUntitled });
	// 			vscode.window.showTextDocument(untitledFileUri).then(
	// 				(editor) => {
	// 					editor.edit((editBuilder) => {
	// 						editBuilder.insert(
	// 							new vscode.Position(0, 0),
	// 							JSON.stringify(defaultConfig, null, 2)
	// 						);
	// 					});
	// 				}
	// 			);
	// 		}
	// 	});
	// }
}

module.exports = {
	createPhpFile
}
