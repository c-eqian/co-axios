import { execSync, exec } from 'node:child_process';
function generateDocs() {
    execSync('typedoc ../src/index.ts --out ./play', { stdio: 'inherit' });
}
