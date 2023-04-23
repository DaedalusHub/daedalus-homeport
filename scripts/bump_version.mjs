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

    const { changeType } = await inquirer.prompt([
        {
            type: 'list',
            name: 'changeType',
            message: 'Choose change type:',
            choices: [
                'Added',
                'Changed',
                'Deprecated',
                'Removed',
                'Fixed',
                'Security',
            ],
        },
    ]);

    const { changeInformation } = await inquirer.prompt([
        {
            type: 'input',
            name: 'changeInformation',
            message: `Enter additional information for the "${changeType}" change:`,
        },
    ]);

    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    packageJson.version = newVersion;
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');

    const changelogFilename = 'CHANGELOG.md';
    const changelog = fs.readFileSync(changelogFilename, 'utf8');
    const unreleasedSection = '## [Unreleased]';
    const newChangelogEntry = `## [${newVersion}](https://github.com/DaedalusHub/daedalus-homeport/compare/v${currentVersion}...v${newVersion}) (${new Date().toISOString().split('T')[0]})\n\n### ${changeType}\n\n- ${changeInformation}\n\n`;

    const updatedChangelog = changelog.replace(unreleasedSection, `${unreleasedSection}\n\n${newChangelogEntry}`);
    fs.writeFileSync(changelogFilename, updatedChangelog);

    execSync(`git add CHANGELOG.md package.json`);
    execSync(`git commit -m "chore: bump version to ${newVersion}"`);
    execSync(`git tag -a v${newVersion} -m "Release ${newVersion}"`);

    console.log(`Changelog updated. Edit CHANGELOG.md to include relevant changes.`);
};

bump();
