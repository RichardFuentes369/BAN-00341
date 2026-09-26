const fs = require('fs');
const path = require('path');

const origen = path.join(__dirname, 'extension');
// Apunta a la carpeta dist que genera Angular (cambia 'angular' por el nombre exacto de tu proyecto si es diferente)
const destino = path.join(__dirname, 'angular', 'dist', 'angular'); 

function copiarDirectorio(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copiarDirectorio(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  console.log('✅ Extensión de Chrome copiada con éxito en la distribución de Angular.');
}

if (fs.existsSync(origen)) {
  copiarDirectorio(origen, destino);
} else {
  console.error('❌ La carpeta "extension" no existe en la raíz.');
}