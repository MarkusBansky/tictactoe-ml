# TicTacToe-ML Development Instructions

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Project Overview

TicTacToe-ML is a Vue 3 + TypeScript web application that implements a tic-tac-toe game with AI powered by TensorFlow.js. The AI uses a neural network that learns from player victories to improve its gameplay. The application is deployed automatically to GitHub Pages.

## Working Effectively

### Initial Setup and Bootstrap
- Install dependencies: `yarn install` -- takes ~45 seconds on first install, ~0.5 seconds when already installed. NEVER CANCEL. Set timeout to 60+ minutes.
- Check for linting issues: `yarn lint` -- takes ~2 seconds, usually shows minor warnings only
- Build for production: `yarn build` -- takes ~19 seconds. NEVER CANCEL. Set timeout to 60+ minutes.
- Start development server: `yarn serve` -- takes ~20 seconds to start. NEVER CANCEL. Set timeout to 30+ minutes.

### Development Server
- Always run `yarn install` first before starting development
- Development server runs at `http://localhost:8080/`
- Hot reload is enabled - changes trigger automatic rebuilds
- Server outputs build progress and warnings/errors to console

### Production Build
- Creates `dist/` directory with optimized static files
- Configured for GitHub Pages deployment with base path `/tictactoe-ml/`
- Build includes code splitting (vendors bundle ~1.6MB, app bundle ~11KB)
- Webpack performance warnings are expected due to TensorFlow.js size

## Validation and Testing

### Manual Validation Scenarios
Always test these scenarios after making changes:
1. **Basic Gameplay**: Click a cell to make move, verify AI responds with O in another cell
2. **Neural Network**: Verify console shows prediction values when AI makes moves
3. **Model Persistence**: Click "Save Model" button, verify "Saving model.." and "Saved" console messages
4. **Game Completion**: Play a full game to completion, verify winner detection and score updates
5. **Start Over**: Click "Start over" button to reset game board

### Build and Quality Checks
- Always run `yarn lint` before committing changes
- Console warnings about unused variables are acceptable
- Console statements in production build trigger warnings but are acceptable
- No test framework is currently configured - rely on manual validation

## Key Codebase Structure

### Directory Layout
```
src/
├── App.vue                 # Main Vue application component
├── main.ts                 # Application entry point
├── components/             # Vue components
│   └── MainComponent.vue   # Primary game component
├── scripts/                # TypeScript business logic
│   ├── main.ts            # Game orchestration and event handling
│   ├── helper.ts          # Utility functions and UI helpers
│   ├── classes/           # Game domain objects
│   │   ├── button.ts      # Game cell representation
│   │   ├── grid.ts        # Game board logic
│   │   ├── player.ts      # Player representation
│   │   └── state.ts       # Game state management
│   └── models/            # AI and data models
│       ├── gameMoves.ts   # Training data structure
│       └── tfModel.ts     # TensorFlow.js neural network
└── styles/                # Sass stylesheets
```

### Important Files to Review When Making Changes
- `src/scripts/main.ts` - Core game logic, event handlers, AI training triggers
- `src/scripts/models/tfModel.ts` - Neural network implementation (100 epochs, 32 batch size)
- `src/scripts/classes/grid.ts` - Game board state and move validation
- `src/components/MainComponent.vue` - UI rendering and game board display
- `vue.config.js` - Build configuration and GitHub Pages setup

### Key Technical Details
- **AI Learning**: Model retrains when human player wins (see `trainOnGameMoves()`)
- **Model Storage**: Uses IndexedDB for browser persistence (`indexeddb://tic-tac-toe-model`)
- **Path Aliases**: `@/` maps to `src/` directory in imports
- **Neural Network**: 100 epochs, batch size 32, learning rate 0.005
- **Build Target**: Modern browsers (ES modules, > 1% usage, last 2 versions)

## Common Issues and Solutions

### Dependency Warnings
- `@tensorflow/tfjs-data` peer dependency warning is expected and harmless
- Package-lock.json conflicts with yarn.lock - prefer yarn for consistency

### Build Warnings
- Asset size warnings for vendor bundle (1.6MB) are expected due to TensorFlow.js
- Console statement warnings in production are acceptable for debugging
- TypeScript unused variable warnings are minor and acceptable

### Development Tips
- Use Vue DevTools browser extension for component debugging
- Neural network predictions logged to console show AI decision-making
- Model training progress displayed in UI debug area during games
- Save/Download model functions work with browser's IndexedDB and Downloads

## GitHub Actions and Deployment

### Automated CI/CD
- **Deploy workflow** (`.github/workflows/deploy.yml`): Builds and deploys to GitHub Pages on master branch pushes
- **CodeQL analysis** (`.github/workflows/codeql-analysis.yml`): Security scanning
- Build uses Node.js 18 with yarn frozen lockfile installation
- Deployment artifacts uploaded from `dist/` directory

### Live Application
- Deployed at: `https://markusbansky.github.io/tictactoe-ml/`
- Updates automatically on master branch commits
- Uses GitHub Pages with custom domain configuration

## Common Commands Reference

### Development Workflow
```bash
# Initial setup
yarn install                    # ~45 seconds first time, ~0.5 seconds when cached
yarn lint                      # ~2 seconds  
yarn serve                     # ~20 seconds to start

# Production build
yarn build                     # ~19 seconds

# Manual deployment verification  
cd dist && python3 -m http.server 8000  # Test built files locally (note: needs base path for proper asset loading)
```

### Project Information Commands
```bash
# Check versions
node --version                 # Should be 20+ 
yarn --version                # Should be 1.22+

# Repository size
du -sh .                      # ~571MB with node_modules

# Find key files
find src -name "*.ts" -o -name "*.vue"  # All TypeScript and Vue files
```

## Node.js and Dependencies

### Required Versions
- **Node.js**: 20+ (specified in `.nvmrc` as 24.4.0)
- **Yarn**: 1.22+ (preferred package manager)
- **Vue CLI**: Handled by local dependency (`@vue/cli-service`)

### Key Dependencies
- `vue@^3.5.17` - Frontend framework
- `@tensorflow/tfjs@^4.22.0` - Machine learning library
- `typescript@~5.5.4` - Type checking
- `jquery@^3.7.1` - DOM manipulation
- `sass@^1.89.2` - CSS preprocessing

### Development Dependencies
- `@vue/cli-service@~5.0.8` - Build tooling
- `eslint@^8.57.1` - Code linting  
- `@typescript-eslint/*` - TypeScript linting rules
- `prettier@^3.6.2` - Code formatting