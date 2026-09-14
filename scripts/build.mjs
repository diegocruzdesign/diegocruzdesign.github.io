import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
const inputBase = process.env.BASE_PATH || '/';
if (!/^\/(?:[A-Za-z0-9._-]+\/)*[A-Za-z0-9._-]*$/.test(inputBase) || inputBase.split('/').includes('..')) {
  throw new Error('BASE_PATH debe ser una ruta como / o /portafolio/.');
}
const base = inputBase === '/' ? '/' : `${inputBase.replace(/\/$/, '')}/`;

// Solo se publica la aplicación y sus recursos seleccionados.
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(path.join(root, 'index.html'), path.join(output, 'index.html'));
await cp(path.join(root, 'src'), path.join(output, 'src'), { recursive: true });
await cp(path.join(root, 'public/assets'), path.join(output, 'assets'), {
  recursive: true,
  filter: source => !source.endsWith('.md'),
});

async function rewrite(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await rewrite(filename);
    else if (/\.(html|css|js)$/.test(entry.name)) {
      const source = await readFile(filename, 'utf8');
      await writeFile(filename, source.replace(/(["'`(])\/(assets|src)\//g, `$1${base}$2/`));
    }
  }
}
await rewrite(output);
await writeFile(path.join(output, '.nojekyll'), '');
console.log(`Sitio generado en dist con ruta base ${base}`);
