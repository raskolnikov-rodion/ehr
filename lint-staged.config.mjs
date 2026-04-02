export default {
  '**/*.{ts,html,scss,css,json,md}': 'prettier --write',
  '*.{ts,tsx,js,jsx,mjs,html}': 'npm run affected:lint',
  '*.scss': 'npm run affected:stylelint',
};
