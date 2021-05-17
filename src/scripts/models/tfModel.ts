import * as tf from '@tensorflow/tfjs';
import GameMoves from "@/scripts/models/gameMoves";
import State from "@/scripts/classes/state";
import {Main} from "@/scripts/main";
import {logValues} from "@/scripts/helper";

export default class TfModel {
  private model: any;

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
        inputShape: [9],
        units: 64,
        activation: "relu"
      }));
      model.add(tf.layers.dense({
        units: 64,
        activation: "relu"
      }));
      model.add(tf.layers.dense({
        units: 9,
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
      concatX = concatX.concat(g.x);
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

  private async train(X: tf.Tensor, Y: tf.Tensor) {
    const callbacks = {
      // onTrainBegin: log => console.log(log),
      // onTrainEnd: log => console.log(log),
      // onEpochBegin: (epoch, log) => console.log(epoch, log),
      // onEpochEnd: (epoch: number, log: string) => console.log(epoch, log)
      // onBatchBegin: (batch, log) => console.log(batch, log),
      // onBatchEnd: (batch, log) => console.log(batch, log)
    };

    // train with data
    await this.model.fit(X, Y, {
      epochs: 100,
      shuffle: true,
      batchSize: 32,
      callbacks: callbacks
    });

    // debug
    console.log("Model Re-Trained");
  }

  async predict(currentState: State): Promise<number> {
    const currentStateTensor = tf.tensor([currentState.for(Main.humanPlayer)]);
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
}
