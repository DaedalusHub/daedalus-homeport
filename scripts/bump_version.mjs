// Start of file: scripts/bump_version.mjs

import fs from 'fs';
import { execSync } from 'child_process';
import inquirer from 'inquirer';

const currentVersion = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;

console.log('Current version:', currentVersion);

const semverRegex = /^(\d+)\.(\d+)\.(\d+)$/;

if (!semverRegex.test(currentVersion)) {
    console.error('Invalid semantic version in package.json');
    process.exit(1);
}

const [major, minor, patch] = currentVersion.split('.').map(Number);

const bump = async () => {
    const { bumpType } = await inquirer.prompt([
        {
            type: 'list',
            name: 'bumpType',
            message: 'Choose version bump type:',
            choices: ['major', 'minor', 'patch'],
        },
    ]);

    let newVersion;

    switch (bumpType) {
        case 'major':
            newVersion = `${major + 1}.0.0`;
            break;
        case 'minor':
            newVersion = `${major}.${minor + 1}.0`;
            break;
        case 'patch':
            newVersion = `${major}.${minor}.${patch + 1}`;
            break;
        default:
            console.error('Invalid bump type');
            process.exit(1);
    }

    console.log('New version:', newVersion);

    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    packageJson.version = newVersion;
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');

    //execSync(`git commit -am "chore: bump version to ${newVersion}"`);
    execSync(`git tag v${newVersion}`);

    execSync(`hallmark cc add ${newVersion}`);

    console.log(`Changelog updated. Edit CHANGELOG.md to include relevant changes.`);
};

bump();

// End of file: scripts/bump_version.mjs
