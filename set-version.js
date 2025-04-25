// set-version.js
const fs = require('fs');
const path = require('path');
const { version } = require('./package.json');

// Chemin du fichier à générer
const dirPath = path.join(__dirname, 'src/environments');
const filePath = path.join(dirPath, 'version.ts');

// Crée le dossier s’il n’existe pas
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// Contenu à écrire
const content = `export const appVersion = '${version}';\n`;

// Écriture du fichier
fs.writeFileSync(filePath, content, { encoding: 'utf8' });
console.log(`✔ Version ${version} injectée dans version.ts`);
