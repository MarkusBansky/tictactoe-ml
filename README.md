# TicTacToe-ML

Hello everyone. Mark here. This is a simple tic-tac-toe game I developed for myself as a coding challenge, 
written in a couple of hours, and then modified for reference.

I will add some documentation about it to make it runnable by everyone, and this will be the end of this code.
Sometimes I will also update it with new versions of packages to fix some common issues and vulnerability.

Please feel free to study the code, try it yourself and engage in the issues section if you have any problems or suggestions.

## Get started

To get started with this project, you would probably need the following installed on your system:

- Latest version of **Node.JS**
- Latest version of **yarn**
- Latest version of **git**

Also having a good rig for training neural networks is a benefit (you will get results faster).

Then you will need to clone the project:

```bash
$ git clone https://github.com/MarkusBansky/tictactoe-ml.git
$ cd tictactoe-ml
```

Then when you are inside the folder of the project you have to install the required packages, this might take a while:

```bash
$ yarn
```

After running the installation script you now should be able to start the web service locally using the built-in server:

```bash
$ yarn serve
```

And the game should be available on your machine via the URL provided in the command line after running the serve action.

### Building for Production

To build the project for production deployment:

```bash
$ yarn build
```

This will create a `dist` directory with the built application ready for deployment. The build is automatically configured for GitHub Pages deployment.

## Run from Binaries

There also is an option to run the game from the compiled binaries. I have compiled it for Mac and Windows, both tested.

The package is available for download in the Releases section. Go to the tag for latest release and grab your binary.

## How To Play

The gameplay should be obvious. I will explain some features here.

The game cam save and load the model in the browser memory. It loads it automatically when you load the page when the saved model exists.

When user wins the game, this game is saved into the state, and then the model is being trained on that game. So after each time the 
player wins the model is being retrained to learn from the errors.

## Live Demo

The game is automatically deployed to GitHub Pages and available at: [https://markusbansky.github.io/tictactoe-ml/](https://markusbansky.github.io/tictactoe-ml/)

The deployment is automated through GitHub Actions and triggers on every push to the master branch.

## License

Please check out the [LICENSE.md](https://github.com/MarkusBansky/tictactoe-ml/master/LICENSE.md) file in the repository.

## Contributing

Please check out the [CODE_OF_CONDUCT.md](https://github.com/MarkusBansky/tictactoe-ml/master/CODE_OF_CONDUCT.md) file in the repository.
