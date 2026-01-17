const {writeFileSync, readFileSync, existsSync, createWriteStream, mkdirSync, unlinkSync, readdirSync, rmdirSync} = require("node:fs");
const {exec} = require("child_process");
const {Readable} = require("node:stream");
const path = require("node:path");

let TTL_BASE = {
    fps_unlock: "https://dl-public.twintaillauncher.app/launcher_app/packages/keqingunlock-latest",
    jadeite: "https://dl-public.twintaillauncher.app/launcher_app/packages/jadeite-latest"
};

let PATHS = {
    jadeite: `${__dirname}/generated/jadeite.json`,
    keqing_unlock: `${__dirname}/generated/keqingunlock.json`,
    versions_file_keqingunlock: `${__dirname}/generated/keqing_unlock/VERSION.txt`,
    versions_file_jadeite: `${__dirname}/generated/jadeite/VERSION.txt`,
}

let USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.3";
let URLS = {
    keqing_unlock: "https://api.github.com/repos/TwintailTeam/KeqingUnlock/releases/latest",
    jadeite: "https://codeberg.org/api/v1/repos/mrlgamer/jadeite/releases?draft=false&pre-release=false",
};

async function prepareJSON(package_id = "keqing_unlock") {
    switch (package_id) {
        case "keqing_unlock": {
            let request = await fetch(URLS.keqing_unlock, {method: "GET", headers: {"Content-Type": "application/json", "User-Agent": USER_AGENT}});
            if (!request.ok) { console.error(`Failed with error ${request.status} ${request.statusText}`); return; }
            let rsp = await request.json();
            let asset = rsp.assets.filter(asset => asset.name.toLowerCase().includes(package_id));
            let ver = rsp.tag_name.replace("v", "");
            let data = {
                packages: [{
                    git_url: asset[0].browser_download_url,
                    version: ver,
                    zip_sha256: `${asset[0].digest.replace("sha256:", "")}`,
                    size: asset[0].size,
                    package_name: asset[0].name,
                    raw_url: `${TTL_BASE.fps_unlock}/${package_id}`,
                    default_download_mode: "DOWNLOAD_MODE_FILE",
                    file_list: ["keqing_unlock.exe", "VERSION.txt"]
                }]
            };
            writeFileSync(`${PATHS.keqing_unlock}`, JSON.stringify(data, null, 2));
            appendVersion(`${PATHS.versions_file_keqingunlock}`, "KEQING_UNLOCK", `${ver}`);
            break;
        }
        case "jadeite": {
            let request = await fetch(URLS.jadeite, {method: "GET", headers: {"Content-Type": "application/json", "User-Agent": USER_AGENT}});
            if (!request.ok) { return; }
            let rsp = await request.json();
            let asset = rsp[0].assets.filter(asset => asset.name.toLowerCase().includes("v5.0.1-hotfix"));
            let ver = rsp[0].tag_name.replace("v", "");
            let data = {
                packages: [{
                    git_url: asset[0].browser_download_url,
                    version: ver,
                    zip_sha256: ``,
                    size: asset[0].size,
                    package_name: asset[0].name,
                    raw_url: `${TTL_BASE.jadeite}/${package_id}`,
                    default_download_mode: "DOWNLOAD_MODE_FILE",
                    file_list: ["jadeite.exe", "VERSION.txt", "game_payload.dll", "launcher_payload.dll", "LICENSE.txt"],
                }]
            };
            writeFileSync(`${PATHS.jadeite}`, JSON.stringify(data, null, 2));
            appendVersion(`${PATHS.versions_file_jadeite}`, "JADEITE", `${ver}`);
            break;
        }
    }
}

async function download_zips(package_id = "xxmi") {
    switch (package_id) {
        case "keqing_unlock": {
            if (existsSync(`${PATHS.keqing_unlock}`)) {
                let file = JSON.parse(readFileSync(`${PATHS.keqing_unlock}`, 'utf8'));
                let dl = await fetch(file.packages[0].git_url, {method: "GET", headers: {"User-Agent": USER_AGENT}});
                emptyDir(`${__dirname}/generated/${package_id}`);
                const bodyStream = Readable.fromWeb(dl.body);
                const fileStream = createWriteStream(`${__dirname}/generated/${package_id}/${file.packages[0].package_name}`);
                bodyStream.pipe(fileStream);
                fileStream.on('finish', () => {});
            }
        }
        break;
        case "jadeite": {
            if (existsSync(`${PATHS.jadeite}`)) {
                let file = JSON.parse(readFileSync(`${PATHS.jadeite}`, 'utf8'));
                let dl = await fetch(file.packages[0].git_url, {
                    method: "GET",
                    headers: {"User-Agent": USER_AGENT}
                });
                const bodyStream = Readable.fromWeb(dl.body);
                const fileStream = createWriteStream(`${__dirname}/generated/${package_id}.zip`);
                bodyStream.pipe(fileStream);
                fileStream.on('finish', () => {
                    let extractDir = `${__dirname}/generated/${package_id}`;
                    let archive = `${__dirname}/generated/${package_id}.zip`;
                    emptyDir(extractDir);
                    unzip(archive, extractDir);
                    setTimeout(() => {
                        if (existsSync(archive)) {unlinkSync(archive);}
                    }, 3000);
                });
            }
        }
        break;
    }
}

function unzip(zipPath, outputDir) {
    return new Promise((resolve, reject) => {
        exec(`/usr/bin/unzip -o "${zipPath}" -d "${outputDir}"`, (err, _stdout, _stderr) => {
            if (err) {
                console.error('Extraction error:', err);
                reject(err);
            } else {resolve();}
        });
    });
}

function appendVersion(filePath, key, value) {
    try {
        let content = '';
        if (existsSync(filePath)) {
            content = readFileSync(filePath, 'utf8');
        } else {
            let p = path.dirname(filePath);
            mkdirSync(p, { recursive: true });
        }

        const lineToWrite = `${key}=${value}`;
        const lines = content.split('\n').filter(line => line.trim() !== '');
        let found = false;

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith(`${key}=`)) {
                lines[i] = lineToWrite;
                found = true;
                break;
            }
        }
        if (!found) lines.push(lineToWrite);
        writeFileSync(filePath, lines.join('\n'), 'utf8');
    } catch {}
}

function emptyDir(dirPath) {
    if (!existsSync(dirPath)) return;
    const files = readdirSync(dirPath, { withFileTypes: true });
    for (const file of files) {
        const fullPath = path.join(dirPath, file.name);
        if (file.name === 'VERSION.txt') continue;
        if (file.isDirectory()) {emptyDir(fullPath);rmdirSync(fullPath);} else {unlinkSync(fullPath);}
    }
}

prepareJSON("keqing_unlock").then(() => download_zips("keqing_unlock"))
    .then(() => prepareJSON("jadeite")).then(() => download_zips("jadeite"));