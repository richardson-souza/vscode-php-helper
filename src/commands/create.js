const common = require('./common');

async function simpleFile(type) {

    const content = "<?php\n";

    const selectedFolder = await common.fileOpenDialog();

    if (selectedFolder === undefined) {
        return;
    }

    const fileName = await common.inputFileName(type);

    if (fileName === undefined) {
        return;
    }

    const fullPath = common.writeFile(selectedFolder.fsPath + '/' + fileName, content);

    common.openDocument(fullPath);

}

module.exports = {
    simpleFile
}
