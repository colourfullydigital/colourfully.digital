#!/usr/bin/env node
import { glob } from 'glob';
import { resolve, relative } from 'path';
import { TranslationLoader } from '../src/loader';

async function main() {
  const loader = new TranslationLoader('en', true, process.cwd());
  let hasErrors = false;

  // Find all translation files
  const files = await glob('**/i18n/**/*.{json,yaml,yml}', {
    ignore: ['**/node_modules/**', '**/dist/**']
  });

  console.log('Checking translation files...\n');

  for (const file of files) {
    const absolutePath = resolve(process.cwd(), file);
    const relativePath = relative(process.cwd(), absolutePath);
    
    console.log(`Checking ${relativePath}...`);
    
    try {
      const result = await loader.validateTranslationFile(absolutePath);
      
      if (!result.isValid) {
        hasErrors = true;
        console.error('\nValidation errors:');
        result.errors.forEach(error => {
          console.error(`  - [${error.type}] ${error.key}: ${error.message}`);
        });
        console.log();
      } else {
        console.log('✓ Valid\n');
      }
    } catch (error) {
      hasErrors = true;
      console.error(`Error processing ${relativePath}:`);
      console.error('  ', error.message);
      console.log();
    }
  }

  if (hasErrors) {
    console.error('\nTranslation validation failed. Please fix the errors above.');
    process.exit(1);
  } else {
    console.log('\nAll translation files are valid! ✨');
  }
}

main().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
