const config = {
  // 1. Check editorconfig and file system
  '*': ['yarn lint:editorconfig', 'yarn lint:fs'],

  // 2. Prettier formatting for all files
  '/**/*.{js,jsx,ts,tsx,scss,json,md}': ['yarn prettier --write'],
  'shared/**/*.{js,jsx,ts,tsx,scss,json,md}': ['yarn prettier --write'],

  // 3. Lint JavaScript/TypeScript for Frontend, Backend and Shared
  'frontend/**/*.{js,jsx,ts,tsx}': ['yarn workspace frontend lint'],
  'backend/**/*.{js,ts}': ['yarn workspace backend lint'],
  'shared/**/*.{js,jsx,ts,tsx}': ['yarn workspace quoridor-game-shared lint'],
};

export default config;
