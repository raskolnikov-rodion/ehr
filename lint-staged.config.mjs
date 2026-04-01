export default {
  '**/*.{ts,html,scss,css,json,md}': 'prettier --write',
  '*.{ts,tsx,js,jsx,mjs,html}': 'eslint --max-warnings=0',
  '*.scss': 'stylelint',
};
