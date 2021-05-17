import * as tf from '@tensorflow/tfjs';
import GameMoves from "@/scripts/models/gameMoves";
import State from "@/scripts/classes/state";
import {Main} from "@/scripts/main";
import {debug, logValues} from "@/scripts/helper";

function sfa(array: number[], item: number): number[] {
  return array.map(a => a === item ? 1 : 0);
}

export default class TfModel {
  private model: any;

  boardSize = 9;
  batchSize = 32;
  epochs = 100;

  constructor(learningRate = 0.005) {
    tf.loadLayersModel('indexeddb://tic-tac-toe-model')
      .then((m) => {
        console.log('Model loaded from memory');
        this.model = m;
        // compile
        this.model.compile({
          optimizer: tf.train.adam(learningRate),
          loss: "categoricalCrossentropy",
          metrics: ["accuracy"]
        });
      })
      .catch(() => {
        const model = tf.sequential();

        // add layers
        model.add(tf.layers.dense({
          inputShape: [this.boardSize * 2],
          units: 64,
          activation: "relu"
        }));
        model.add(tf.layers.dense({
          units: 64,
          activation: "relu"
        }));
        model.add(tf.layers.dense({
          units: this.boardSize,
          activation: "softmax"
        }));

        // compile
        model.compile({
          optimizer: tf.train.adam(learningRate),
          loss: "categoricalCrossentropy",
          metrics: ["accuracy"]
        });

        // set model
        this.model = model;
      });
  }

  async save() {
    await this.model.save('indexeddb://tic-tac-toe-model');
  }

  async download() {
    await this.model.save('downloads://tic-tac-toe-model');
  }

  async trainOnGameMoves(gameMoves: GameMoves[]) {
    console.log(`Model is being trained on [${gameMoves.length}] games...`)

    let concatX: number[][] = [];
    let concatY: number[][] = [];

    gameMoves.forEach(g => {
      concatX = concatX.concat(g.x.map(x => sfa(x, 1).concat(sfa(x, -1))));
      concatY = concatY.concat(g.y);
    });

    // Train the model
    const stackedX = tf.stack(concatX);
    const stackedY = tf.stack(concatY);
    await this.train(stackedX, stackedY);

    // clean up!
    stackedX.dispose();
    stackedY.dispose();
  }

  async predict(currentState: State): Promise<number> {
    const flatState = currentState.flat(Main.humanPlayer);
    const currentStateTensor = tf.tensor([sfa(flatState, 1).concat(sfa(flatState, -1))]);
    const result = await this.model.predict(currentStateTensor);

    // get results data
    const data = await result.flatten().data() as number[];
    logValues(data);

    // find the best valid index of the button to choose
    let index;
    do {
      index = data.indexOf(Math.max(...data));
      data[index] = 0;
    } while (currentState.values[index] !== 0);

    // return the result
    result.dispose();
    return index;
  }

  private async train(X: tf.Tensor, Y: tf.Tensor) {
    const callbacks = {
      // onTrainBegin: log => console.log(log),
      onTrainEnd: (log: string) => debug(``),
      // onEpochBegin: (epoch, log) => console.log(epoch, log),
      onEpochEnd: (epoch: number, log: string) =>
        debug(`Training AI ... ${(epoch / this.epochs * 100).toFixed(2)}%`)
      // onBatchBegin: (batch, log) => console.log(batch, log),
      // onBatchEnd: (batch, log) => console.log(batch, log)
    };

    // train with data
    await this.model.fit(X, Y, {
      epochs: this.epochs,
      shuffle: true,
      batchSize: this.batchSize,
      callbacks: callbacks
    });

    // debug
    console.log("Model Re-Trained");
  }
}
