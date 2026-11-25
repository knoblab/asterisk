import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const sourcePath = path.join(repoRoot, 'src/design-system/tokens.css');

const targets = [
  path.resolve(repoRoot, '../chating-main/src/design-system/tokens.css'),
  path.resolve(repoRoot, '../chating-main/public/ds/tokens.css'),
  path.resolve(repoRoot, '../cnsh-eta/src/design-system/tokens.css'),
  path.resolve(repoRoot, '../cnsh-eta/public/ds/tokens.css'),
];

const sourceContent = fs.readFileSync(sourcePath, 'utf-8');

for (const target of targets) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, sourceContent, 'utf-8');
  console.log(`Synced -> ${path.relative(path.resolve(repoRoot, '..'), target)}`);
}

console.log(`Done: synced ${targets.length} targets from src/design-system/tokens.css (${sourceContent.length} bytes).`);
