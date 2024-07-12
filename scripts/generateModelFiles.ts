import fs from 'fs/promises';
import path from 'path';

const currentFileUrl = import.meta.url;
const currentDir = path.dirname(new URL(currentFileUrl).pathname);
const modelsDir = path.join(currentDir, '..', 'public', 'models');
const outputFile = path.join(currentDir, '..', 'src/utils', 'modelFiles.ts');

async function generateModelFiles() {
  try {
    const files = await fs.readdir(modelsDir);

    const glbFiles = files.filter(file => file.endsWith('.glb'));

    const exportString = `export const modelFiles = ${ JSON.stringify(glbFiles, null, 2) };`;

    await fs.writeFile(outputFile, exportString);

    console.log('modelFiles.ts has been generated successfully!');
  } catch (error) {
    console.error('Error generating modelFiles.ts:', error);
  }
}

generateModelFiles();
