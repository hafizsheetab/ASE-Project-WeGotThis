const cluster = require('cluster');
const os = require('os');
const numCPUs = os.availableParallelism();
module.exports = (app, PORT) => {
    if (cluster.isMaster) {
        console.log(`Master process ${process.pid} is running`);
      
        for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
        }
      
        cluster.on('exit', (worker, code, signal) => {
          console.log(`Worker process ${worker.process.pid} died. Restarting...`);
          cluster.fork();
        });
      } else {
      
        app.listen(PORT, () => {
          console.log(`Worker process ${process.pid} is listening on port ${PORT}`);
        });
      }
}