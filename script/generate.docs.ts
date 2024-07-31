import { execSync, exec } from 'node:child_process';
function generateDocs() {
    execSync('typedoc ../src/AxiosCanceler.ts --out ./play', { stdio: 'inherit' });
}
