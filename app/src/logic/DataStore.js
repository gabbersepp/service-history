import * as fs from "fs";
import * as path from "path";

export function load() {
    if (fs && fs.readFileSync) {
        var data = loadFromFileSystem();
        return data;
    }

    return loadFromLocalStorage();
}

export function save(data) {
    if (fs && fs.readFileSync) {
        saveToFileSystem(data);
    } else {
        saveToLocalStorage(data);
    }
}

export function deleteImage(filePath) {
    if (fs && fs.unlinkSync) {
        if(fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
        }

        return false;
    } else {
        // TODO
        //throw new Error("can not save image in browser mode");
    }
}

export function saveImage(localFilePath) {
    if (fs && fs.writeFileSync) {
        var randomFilePath = localFilePath.replace(/^(.*)\.([a-z0-9]+)$/gi, `$1.${new Date().getTime()}.$2`);
        var fileName = path.basename(randomFilePath);

        if(!fs.existsSync("../images")) {
            fs.mkdirSync("../images");
        }

        var target = `../images/${fileName}`;
        fs.copyFileSync(localFilePath, target);

        return fileName;
    } else {
        throw new Error("can not save image in browser mode");
    }
}

export function getImageDir() {
    if (fs && fs.existsSync && fs.mkdirSync) {
        if (!fs.existsSync("../images")) {
            fs.mkdirSync("./../images");            
        }
        return path.resolve("./../images/") + "/";
    } else {
        return "./../images/";
    }
}

function loadFromLocalStorage() {
    try {
        return JSON.parse(localStorage["scheckheft_data"]);
    } catch (e) {
        return null;
    }
}

function loadFromFileSystem() {
    try {
        if (fs.existsSync("../scheckheft.db")) {
            return JSON.parse(fs.readFileSync("../scheckheft.db").toString());
        }
        return null;
    } catch(e) {
        alert("Failed to load file");
    }

    return null;
}

function saveToLocalStorage(data) {
    localStorage["scheckheft_data"] = JSON.stringify(data);
}

function saveToFileSystem(data) {
    try { 
        fs.writeFileSync("../scheckheft.db", JSON.stringify(data), 'utf-8'); 
    }
    catch(e) { 
        alert('Failed to save the file !'); 
    }
}