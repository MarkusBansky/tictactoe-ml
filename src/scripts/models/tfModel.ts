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

    // Show initial training info with game data context
    debug(`
      <div class="training-info">
        <h5>🎮 Preparing Training Data</h5>
        <div class="training-params">
          <p><strong>Training Context:</strong></p>
          <ul>
            <li>Games to learn from: ${gameMoves.length}</li>
            <li>Your winning moves will teach the AI what NOT to do</li>
            <li>AI learns by analyzing board positions and outcomes</li>
          </ul>
        </div>
        <div class="educational-note">
          <small>📚 Each game provides multiple training examples showing board states and optimal moves.</small>
        </div>
      </div>
    `);

    let concatX: number[][] = [];
    let concatY: number[][] = [];

    gameMoves.forEach(g => {
      concatX = concatX.concat(g.x.map(x => sfa(x, 1).concat(sfa(x, -1))));
      concatY = concatY.concat(g.y);
    });

    // Show training data summary
    setTimeout(() => {
      debug(`
        <div class="training-info">
          <h5>📊 Training Data Ready</h5>
          <div class="training-params">
            <p><strong>Data Summary:</strong></p>
            <ul>
              <li>Training examples: ${concatX.length}</li>
              <li>Input features: ${concatX[0]?.length || 0} (board positions)</li>
              <li>Output predictions: ${concatY[0]?.length || 0} (move probabilities)</li>
            </ul>
          </div>
          <div class="educational-note">
            <small>🔄 Starting neural network training...</small>
          </div>
        </div>
      `);
    }, 500);

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
      onTrainBegin: () => debug(`
        <div class="training-info">
          <h5>🧠 AI Training Started</h5>
          <div class="training-params">
            <p><strong>Training Parameters:</strong></p>
            <ul>
              <li>Epochs: ${this.epochs}</li>
              <li>Batch Size: ${this.batchSize}</li>
              <li>Learning Rate: 0.005</li>
              <li>Model Architecture: Dense (64) → Dense (64) → Dense (9)</li>
            </ul>
          </div>
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" style="width: 0%"></div>
            </div>
            <div class="progress-text">0%</div>
          </div>
          <div class="training-metrics">
            <div class="metric">Loss: <span id="current-loss">-</span></div>
            <div class="metric">Accuracy: <span id="current-accuracy">-</span></div>
          </div>
          <div class="epoch-info">Epoch: <span id="current-epoch">0</span> / ${this.epochs}</div>
          <div class="educational-note">
            <small>💡 The AI is learning from your winning moves. Loss should decrease and accuracy should increase as training progresses.</small>
          </div>
        </div>
      `),
      onTrainEnd: (logs: any) => {
        // Use the last known values since final logs might be empty
        const finalLoss = 'Training completed';
        const finalAccuracy = 'Model updated';
        debug(`
          <div class="training-info">
            <h5>✅ AI Training Complete!</h5>
            <div class="final-metrics">
              <div class="metric">Status: <strong>${finalLoss}</strong></div>
              <div class="metric">Result: <strong>${finalAccuracy}</strong></div>
            </div>
            <div class="training-summary">
              <p>🎯 <strong>Training Summary:</strong> The AI has learned from your winning strategy!</p>
              <small>The model weights have been updated to better understand optimal moves</small>
            </div>
          </div>
        `);
        console.log('Training logs:', logs); // Debug log to see available properties
      },
      onEpochEnd: (epoch: number, logs: any) => {
        const progress = ((epoch + 1) / this.epochs * 100).toFixed(1);
        const loss = logs?.loss?.toFixed(4) || 'N/A';
        const accuracy = (logs?.acc?.toFixed(4) || 'N/A');
        
        // Update progress bar and metrics
        const progressFill = document.querySelector('.progress-fill') as HTMLElement;
        const progressText = document.querySelector('.progress-text') as HTMLElement;
        const currentLoss = document.getElementById('current-loss');
        const currentAccuracy = document.getElementById('current-accuracy');
        const currentEpoch = document.getElementById('current-epoch');
        
        if (progressFill) progressFill.style.width = `${progress}%`;
        if (progressText) progressText.textContent = `${progress}%`;
        if (currentLoss) currentLoss.textContent = loss;
        if (currentAccuracy) currentAccuracy.textContent = accuracy;
        if (currentEpoch) currentEpoch.textContent = (epoch + 1).toString();
        
        // Debug log for first few epochs to understand log structure
        if (epoch < 3) {
          console.log(`Epoch ${epoch + 1} logs:`, logs);
        }
      }
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
