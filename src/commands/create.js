const common = require('./common.js');

async function simpleFile() {

    const type = 'simple file';

    const content = "<?php\n";

    await process(type, content);

}

/**
 * @param {string} type
 * @param {string} content
 */
async function process(type, content) {
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
