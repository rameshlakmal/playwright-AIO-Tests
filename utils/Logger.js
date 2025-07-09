// utils/Logger.js
class Logger {
  static _log(level, message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level}] ${message}`);
  }

  static info(message) {
    this._log("INFO", message);
  }

  static error(message) {
    this._log("ERROR", message);
  }

  static debug(message) {
    // Optionally, make debug logs conditional, e.g., based on an env variable
    if (process.env.DEBUG_LOGS === "true") {
      this._log("DEBUG", message);
    }
  }
}

export default Logger;
