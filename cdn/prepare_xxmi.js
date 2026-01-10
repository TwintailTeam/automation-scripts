const {writeFileSync, readFileSync, existsSync, createWriteStream, mkdirSync, unlinkSync, readdirSync, rmdirSync} = require("node:fs");
const {exec} = require("child_process");
const {Readable} = require("node:stream");
const path = require("node:path");

let TTL_BASE = "https://dl-public.twintaillauncher.app/launcher_app/extras/xxmi-latest";

let PATHS = {
    xxmi: `${__dirname}/generated/xxmi.json`,
    versions_file: `${__dirname}/generated/xxmi/VERSION.txt`,
}

let USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.3";
let URLS = {
    xxmi: "https://api.github.com/repos/SpectrumQT/XXMI-Libs-Package/releases/latest",
    gimi: "https://api.github.com/repos/SilentNightSound/GIMI-Package/releases/latest",
    srmi: "https://api.github.com/repos/SpectrumQT/SRMI-Package/releases/latest",
    zzmi: "https://api.github.com/repos/leotorrez/ZZMI-Package/releases/latest",
    himi: "https://api.github.com/repos/leotorrez/HIMI-Package/releases/latest",
    wwmi: "https://api.github.com/repos/SpectrumQT/WWMI-Package/releases/latest",
    ssmi: ""
};

async function prepareJSON(package_id = "xxmi") {
    switch (package_id) {
        case "xxmi": {
            let request = await fetch(URLS.xxmi, {
                method: "GET",
                headers: {"Content-Type": "application/json", "User-Agent": USER_AGENT}
            });
            if (!request.ok) { console.error(`Failed with error (XXMI) ${request.status} ${request.statusText}`); return; }
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
                        raw_url: `${TTL_BASE}/${package_id}`,
                        default_download_mode: "DOWNLOAD_MODE_RAW",
                        file_list: ["3dmloader.exe", "d3d11.dll", "d3dcompiler_47.dll", "VERSION.txt"]
                    }]
            };
            writeFileSync(`${PATHS.xxmi}`, JSON.stringify(data, null, 2));
            appendVersion(`${PATHS.versions_file}`, "XXMI", `${ver}`);
            break;
        }
        case "gimi": {
            let request = await fetch(URLS.gimi, {
                method: "GET",
                headers: {"Content-Type": "application/json", "User-Agent": USER_AGENT}
            });
            if (!request.ok) { console.error(`Failed with error (GIMI) ${request.status} ${request.statusText}`); return; }
            let rsp = await request.json();
            let asset = rsp.assets.filter(asset => asset.name.toLowerCase().includes(package_id));
            let ver = rsp.tag_name.replace("v", "");
            let data = {
                git_url: asset[0].browser_download_url,
                version: ver,
                zip_sha256: `${asset[0].digest.replace("sha256:", "")}`,
                size: asset[0].size,
                package_name: asset[0].name,
                raw_url: `${TTL_BASE}/${package_id}`,
                default_download_mode: "DOWNLOAD_MODE_RAW",
                file_list: []
            };
            if (existsSync(`${PATHS.xxmi}`)) {
                let file = JSON.parse(readFileSync(`${PATHS.xxmi}`, 'utf8'));
                file.packages.push(data);
                writeFileSync(`${PATHS.xxmi}`, JSON.stringify(file, null, 2));
            }
            appendVersion(`${PATHS.versions_file}`, "GIMI", `${ver}`);
            break;
        }
        case "srmi": {
            let request = await fetch(URLS.srmi, {
                method: "GET",
                headers: {"Content-Type": "application/json", "User-Agent": USER_AGENT}
            });
            if (!request.ok) { console.error(`Failed with error (SRMI) ${request.status} ${request.statusText}`); return; }
            let rsp = await request.json();
            let asset = rsp.assets.filter(asset => asset.name.toLowerCase().includes(package_id));
            let ver = rsp.tag_name.replace("v", "");
            let data = {
                git_url: asset[0].browser_download_url,
                version: ver,
                zip_sha256: `${asset[0].digest.replace("sha256:", "")}`,
                size: asset[0].size,
                package_name: asset[0].name,
                raw_url: `${TTL_BASE}/${package_id}`,
                default_download_mode: "DOWNLOAD_MODE_RAW",
                file_list: []
            };
            if (existsSync(`${PATHS.xxmi}`)) {
                let file = JSON.parse(readFileSync(`${PATHS.xxmi}`, 'utf8'));
                file.packages.push(data);
                writeFileSync(`${PATHS.xxmi}`, JSON.stringify(file, null, 2));
            }
            appendVersion(`${PATHS.versions_file}`, "SRMI", `${ver}`);
            break;
        }
        case "zzmi": {
            let request = await fetch(URLS.zzmi, {
                method: "GET",
                headers: {"Content-Type": "application/json", "User-Agent": USER_AGENT}
            });
            if (!request.ok) { console.error(`Failed with error (ZZMI) ${request.status} ${request.statusText}`); return; }
            let rsp = await request.json();
            let asset = rsp.assets.filter(asset => asset.name.toLowerCase().includes(package_id));
            let ver = rsp.tag_name.replace("v", "");
            let data = {
                git_url: asset[0].browser_download_url,
                version: ver,
                zip_sha256: `${asset[0].digest.replace("sha256:", "")}`,
                size: asset[0].size,
                package_name: asset[0].name,
                raw_url: `${TTL_BASE}/${package_id}`,
                default_download_mode: "DOWNLOAD_MODE_RAW",
                file_list: []
            };
            if (existsSync(`${PATHS.xxmi}`)) {
                let file = JSON.parse(readFileSync(`${PATHS.xxmi}`, 'utf8'));
                file.packages.push(data);
                writeFileSync(`${PATHS.xxmi}`, JSON.stringify(file, null, 2));
            }
            appendVersion(`${PATHS.versions_file}`, "ZZMI", `${ver}`);
            break;
        }
        case "himi": {
            let request = await fetch(URLS.himi, {
                method: "GET",
                headers: {"Content-Type": "application/json", "User-Agent": USER_AGENT}
            });
            if (!request.ok) { console.error(`Failed with error (HIMI) ${request.status} ${request.statusText}`); return; }
            let rsp = await request.json();
            let asset = rsp.assets.filter(asset => asset.name.toLowerCase().includes(package_id));
            let ver = rsp.tag_name.replace("v", "");
            let data = {
                git_url: asset[0].browser_download_url,
                version: ver,
                zip_sha256: `${asset[0].digest.replace("sha256:", "")}`,
                size: asset[0].size,
                package_name: asset[0].name,
                raw_url: `${TTL_BASE}/${package_id}`,
                default_download_mode: "DOWNLOAD_MODE_RAW",
                file_list: []
            };
            if (existsSync(`${PATHS.xxmi}`)) {
                let file = JSON.parse(readFileSync(`${PATHS.xxmi}`, 'utf8'));
                file.packages.push(data);
                writeFileSync(`${PATHS.xxmi}`, JSON.stringify(file, null, 2));
            }
            appendVersion(`${PATHS.versions_file}`, "HIMI", `${ver}`);
            break;
        }
        case "wwmi": {
            let request = await fetch(URLS.wwmi, {
                method: "GET",
                headers: {"Content-Type": "application/json", "User-Agent": USER_AGENT}
            });
            if (!request.ok) { console.error(`Failed with error (WWMI) ${request.status} ${request.statusText}`); return; }
            let rsp = await request.json();
            let asset = rsp.assets.filter(asset => asset.name.toLowerCase().includes(package_id));
            let ver = rsp.tag_name.replace("v", "");
            let data = {
                git_url: asset[0].browser_download_url,
                version: ver,
                zip_sha256: `${asset[0].digest.replace("sha256:", "")}`,
                size: asset[0].size,
                package_name: asset[0].name,
                raw_url: `${TTL_BASE}/${package_id}`,
                default_download_mode: "DOWNLOAD_MODE_RAW",
                file_list: []
            };
            if (existsSync(`${PATHS.xxmi}`)) {
                let file = JSON.parse(readFileSync(`${PATHS.xxmi}`, 'utf8'));
                file.packages.push(data);
                writeFileSync(`${PATHS.xxmi}`, JSON.stringify(file, null, 2));
            }
            appendVersion(`${PATHS.versions_file}`, "WWMI", `${ver}`);
            break;
        }
        case "ssmi": {
            let request = await fetch(URLS.ssmi, {
                method: "GET",
                headers: {"Content-Type": "application/json", "User-Agent": USER_AGENT}
            });
            if (!request.ok) { console.error(`Failed with error (SSMI) ${request.status} ${request.statusText}`); return; }
            let rsp = await request.json();
            let asset = rsp.assets.filter(asset => asset.name.toLowerCase().includes(package_id));
            let ver = rsp.tag_name.replace("v", "");
            let data = {
                git_url: asset[0].browser_download_url,
                version: ver,
                zip_sha256: `${asset[0].digest.replace("sha256:", "")}`,
                size: asset[0].size,
                package_name: asset[0].name,
                raw_url: `${TTL_BASE}/${package_id}`,
                default_download_mode: "DOWNLOAD_MODE_RAW",
                file_list: []
            };
            if (existsSync(`${PATHS.xxmi}`)) {
                let file = JSON.parse(readFileSync(`${PATHS.xxmi}`, 'utf8'));
                file.packages.push(data);
                writeFileSync(`${PATHS.xxmi}`, JSON.stringify(file, null, 2));
            }
            appendVersion(`${PATHS.versions_file}`, "SSMI", `${ver}`);
            break;
        }
    }
}

async function download_zips(package_id = "xxmi") {
    switch (package_id) {
        case "xxmi": {
            if (existsSync(`${PATHS.xxmi}`)) {
                let file = JSON.parse(readFileSync(`${PATHS.xxmi}`, 'utf8'));
                let pkg = file.packages.find(p => p.package_name.toLowerCase().includes('xxmi'));
                if (!pkg) {
                    console.error(`XXMI package not found in xxmi.json`);
                    return;
                }
                let dl = await fetch(pkg.git_url, {
                    method: "GET",
                    headers: {"User-Agent": USER_AGENT}
                });
                const bodyStream = Readable.fromWeb(dl.body);
                const fileStream = createWriteStream(`${__dirname}/generated/${pkg.package_name}`);
                bodyStream.pipe(fileStream);
                fileStream.on('finish', async () => {
                    let extractDir = `${__dirname}/generated/${package_id}`;
                    let archive = `${__dirname}/generated/${pkg.package_name}`;
                    emptyDir(`${extractDir}`);
                    unzip(archive, extractDir);
                    setTimeout(() => {
                        if (existsSync(archive)) {unlinkSync(archive);}
                    }, 5000);
                    let dl2 = await fetch("https://github.com/TwintailTeam/3dmloader-Package/releases/download/2.0/3dmloader.exe", {method: "GET", headers: {"User-Agent": USER_AGENT}});
                    const bodyStream2 = Readable.fromWeb(dl2.body);
                    const fileStream2 = createWriteStream(`${__dirname}/generated/${package_id}/3dmloader.exe`);
                    bodyStream2.pipe(fileStream2);
                });
            }
            break;
        }
        case "gimi": {
            if (existsSync(`${PATHS.xxmi}`)) {
                let file = JSON.parse(readFileSync(`${PATHS.xxmi}`, 'utf8'));
                let pkg = file.packages.find(p => p.package_name.toLowerCase().includes('gimi'));
                if (!pkg) {
                    console.error(`GIMI package not found in xxmi.json`);
                    return;
                }
                let dl = await fetch(pkg.git_url, {
                    method: "GET",
                    headers: {"User-Agent": USER_AGENT}
                });
                const bodyStream = Readable.fromWeb(dl.body);
                const fileStream = createWriteStream(`${__dirname}/generated/${pkg.package_name}`);
                bodyStream.pipe(fileStream);
                fileStream.on('finish', () => {
                    let extractDir = `${__dirname}/generated/${package_id}`;
                    let archive = `${__dirname}/generated/${pkg.package_name}`;
                    emptyDir(`${extractDir}`);
                    unzip(archive, extractDir);
                    list_archive_files(archive).then(files => {
                        pkg.file_list = files;
                        writeFileSync(`${PATHS.xxmi}`, JSON.stringify(file, null, 2));
                        setTimeout(() => {
                            if (existsSync(archive)) {unlinkSync(archive);}
                        }, 10000);
                    });
                });
            }
            break;
        }
        case "srmi": {
            if (existsSync(`${PATHS.xxmi}`)) {
                let file = JSON.parse(readFileSync(`${PATHS.xxmi}`, 'utf8'));
                let pkg = file.packages.find(p => p.package_name.toLowerCase().includes('srmi'));
                if (!pkg) {
                    console.error(`SRMI package not found in xxmi.json`);
                    return;
                }
                let dl = await fetch(pkg.git_url, {
                    method: "GET",
                    headers: {"User-Agent": USER_AGENT}
                });
                const bodyStream = Readable.fromWeb(dl.body);
                const fileStream = createWriteStream(`${__dirname}/generated/${pkg.package_name}`);
                bodyStream.pipe(fileStream);
                fileStream.on('finish', () => {
                    let extractDir = `${__dirname}/generated/${package_id}`;
                    let archive = `${__dirname}/generated/${pkg.package_name}`;
                    emptyDir(`${extractDir}`);
                    unzip(archive, extractDir);
                    list_archive_files(archive).then(files => {
                        pkg.file_list = files;
                        writeFileSync(`${PATHS.xxmi}`, JSON.stringify(file, null, 2));
                        setTimeout(() => {
                            if (existsSync(archive)) {unlinkSync(archive);}
                        }, 10000);
                    });
                });
            }
            break;
        }
        case "zzmi": {
            if (existsSync(`${PATHS.xxmi}`)) {
                let file = JSON.parse(readFileSync(`${PATHS.xxmi}`, 'utf8'));
                let pkg = file.packages.find(p => p.package_name.toLowerCase().includes('zzmi'));
                if (!pkg) {
                    console.error(`ZZMI package not found in xxmi.json`);
                    return;
                }
                let dl = await fetch(pkg.git_url, {
                    method: "GET",
                    headers: {"User-Agent": USER_AGENT}
                });
                const bodyStream = Readable.fromWeb(dl.body);
                const fileStream = createWriteStream(`${__dirname}/generated/${pkg.package_name}`);
                bodyStream.pipe(fileStream);
                fileStream.on('finish', () => {
                    let extractDir = `${__dirname}/generated/${package_id}`;
                    let archive = `${__dirname}/generated/${pkg.package_name}`;
                    emptyDir(`${extractDir}`);
                    unzip(archive, extractDir);
                    list_archive_files(archive).then(files => {
                        pkg.file_list = files;
                        writeFileSync(`${PATHS.xxmi}`, JSON.stringify(file, null, 2));
                        setTimeout(() => {
                            if (existsSync(archive)) {unlinkSync(archive);}
                        }, 10000);
                    });
                });
            }
            break;
        }
        case "himi": {
            if (existsSync(`${PATHS.xxmi}`)) {
                let file = JSON.parse(readFileSync(`${PATHS.xxmi}`, 'utf8'));
                let pkg = file.packages.find(p => p.package_name.toLowerCase().includes('himi'));
                if (!pkg) {
                    console.error(`HIMI package not found in xxmi.json`);
                    return;
                }
                let dl = await fetch(pkg.git_url, {
                    method: "GET",
                    headers: {"User-Agent": USER_AGENT}
                });
                const bodyStream = Readable.fromWeb(dl.body);
                const fileStream = createWriteStream(`${__dirname}/generated/${pkg.package_name}`);
                bodyStream.pipe(fileStream);
                fileStream.on('finish', () => {
                    let extractDir = `${__dirname}/generated/${package_id}`;
                    let archive = `${__dirname}/generated/${pkg.package_name}`;
                    emptyDir(`${extractDir}`);
                    unzip(archive, extractDir);
                    list_archive_files(archive).then(files => {
                        pkg.file_list = files;
                        writeFileSync(`${PATHS.xxmi}`, JSON.stringify(file, null, 2));
                        setTimeout(() => {
                            if (existsSync(archive)) {unlinkSync(archive);}
                        }, 10000);
                    });
                });
            }
            break;
        }
        case "wwmi": {
            if (existsSync(`${PATHS.xxmi}`)) {
                let file = JSON.parse(readFileSync(`${PATHS.xxmi}`, 'utf8'));
                let pkg = file.packages.find(p => p.package_name.toLowerCase().includes('wwmi'));
                if (!pkg) {
                    console.error(`WWMI package not found in xxmi.json`);
                    return;
                }
                let dl = await fetch(pkg.git_url, {
                    method: "GET",
                    headers: {"User-Agent": USER_AGENT}
                });
                const bodyStream = Readable.fromWeb(dl.body);
                const fileStream = createWriteStream(`${__dirname}/generated/${pkg.package_name}`);
                bodyStream.pipe(fileStream);
                fileStream.on('finish', () => {
                    let extractDir = `${__dirname}/generated/${package_id}`;
                    let archive = `${__dirname}/generated/${pkg.package_name}`;
                    emptyDir(`${extractDir}`);
                    unzip(archive, extractDir);
                    list_archive_files(archive).then(files => {
                        pkg.file_list = files;
                        writeFileSync(`${PATHS.xxmi}`, JSON.stringify(file, null, 2));
                        setTimeout(() => {
                            if (existsSync(archive)) {unlinkSync(archive);}
                        }, 10000);
                    });
                });
            }
            break;
        }
        case "ssmi": {
            if (existsSync(`${PATHS.xxmi}`)) {
                let file = JSON.parse(readFileSync(`${PATHS.xxmi}`, 'utf8'));
                let pkg = file.packages.find(p => p.package_name.toLowerCase().includes('ssmi'));
                if (!pkg) {
                    console.error(`SSMI package not found in xxmi.json`);
                    return;
                }
                let dl = await fetch(pkg.git_url, {
                    method: "GET",
                    headers: {"User-Agent": USER_AGENT}
                });
                const bodyStream = Readable.fromWeb(dl.body);
                const fileStream = createWriteStream(`${__dirname}/generated/${pkg.package_name}`);
                bodyStream.pipe(fileStream);
                fileStream.on('finish', () => {
                    let extractDir = `${__dirname}/generated/${package_id}`;
                    let archive = `${__dirname}/generated/${pkg.package_name}`;
                    emptyDir(`${extractDir}`);
                    unzip(archive, extractDir);
                    list_archive_files(archive).then(files => {
                        pkg.file_list = files;
                        writeFileSync(`${PATHS.xxmi}`, JSON.stringify(file, null, 2));
                        setTimeout(() => {
                            if (existsSync(archive)) {unlinkSync(archive);}
                        }, 10000);
                    });
                });
            }
            break;
        }
    }
}

function unzip(zipPath, outputDir) {
    exec(`/usr/bin/unzip -o ${zipPath} -d ${outputDir}`, (err, stdout, stderr) => {
        if (err) {console.error('Extraction error:', err);}
        if (stderr) {console.error('Extraction error:', stderr);}
    });
}

function list_archive_files(zipPath) {
    return new Promise((resolve, reject) => {
        exec(`/usr/bin/unzip -l ${zipPath} | awk '/^[ ]*[0-9]+/ {print $4}'`, (err, stdout, stderr) => {
            if (err) {
                reject(`List archive files error: ${err}`);
                return;
            }
            if (stderr) {
                reject(`List archive files error: ${stderr}`);
                return;
            }
            const files = stdout.split('\n').map(x => x.trim()).filter(Boolean);
            resolve(files);
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
        if (file.name === 'VERSION.txt' || file.name === "3dmloader.exe") continue;
        if (file.isDirectory()) {emptyDir(fullPath);rmdirSync(fullPath);} else {unlinkSync(fullPath);}
    }
}

prepareJSON("xxmi").then(() => download_zips("xxmi"))
    .then(() => prepareJSON("gimi"))
    .then(() => download_zips("gimi"))
    .then(() => prepareJSON("srmi"))
    .then(() => download_zips("srmi"))
    .then(() => prepareJSON("zzmi"))
    .then(() => download_zips("zzmi"))
    .then(() => prepareJSON("himi"))
    .then(() => download_zips("himi"))
    .then(() => prepareJSON("wwmi"))
    .then(() => download_zips("wwmi"));