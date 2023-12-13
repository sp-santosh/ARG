const signals = ["SIGTERM", "SIGINT"];
const errorTypes = ["unhandledRejection", "uncaughtException"];

errorTypes.map((type) => {
  process.on(type, async (err) => {
    try {
      console.log("process.on " + type);
      console.error(err);
      process.exit(0);
    } catch (_err) {
      process.exit(1);
    }
  });
});

signals.map((signal) => {
  process.on(signal, async () => {
    try {
      console.log("process.on " + signal);
      process.exit(0);
    } catch (_err) {
      process.exit(1);
    }
  });
});
