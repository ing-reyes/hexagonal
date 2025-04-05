import fs from "fs/promises"
import path from "path"

// Log levels with corresponding colors
export enum LogLevel {
  DEBUG = "debug",
  LOG = "log",
  WARN = "warn",
  ERROR = "error",
  VERBOSE = "verbose",
}

// Interface for structured log entry
export interface LogEntry {
  timestamp: string
  level: LogLevel
  message: any
  sourceFile?: string
  context?: string
}

export class SaveLogger {
  private readonly context?: string
  // Change to protected static so it can be accessed by class methods
  protected static logsDirectory = "./logs"

  constructor(context?: string) {
    this.context = context
  }

  /**
   * Configure the directory where logs will be stored
   */
  public static setLogsDirectory(directory: string): void {
    SaveLogger.logsDirectory = directory
  }

  /**
   * Get the current logs directory
   */
  public static getLogsDirectory(): string {
    return SaveLogger.logsDirectory
  }

  private getTimestamp(): string {
    return new Date().toISOString()
  }

  /**
   * Save a log entry to file in structured JSON format
   */
  private async saveToFile(logEntry: LogEntry): Promise<void> {
    try {
      // Use the getter method to access the logs directory
      const logsDir = SaveLogger.getLogsDirectory()

      // Ensure logs directory exists
      await fs.mkdir(logsDir, { recursive: true })

      // Create filename based on date (YYYY-MM-DD.log)
      const today = new Date().toISOString().split("T")[0]
      const logFile = path.join(logsDir, `${today}.log`)

      // Append log entry to file
      const logString = JSON.stringify(logEntry) + "\n"
      await fs.appendFile(logFile, logString, "utf8")
    } catch (error) {
      console.error("Failed to write log to file:", error)
    }
  }

  /**
   * Log a message with LOG level
   */
  log(message: any, sourceFile?: string): void {
    this.writeLog(LogLevel.LOG, message, sourceFile)
  }

  /**
   * Log a message with LOG level
   */
  LOG(message: any, sourceFile?: string): void {
    this.writeLog(LogLevel.LOG, message, sourceFile)
  }

  /**
   * Log a message with ERROR level
   */
  error(message: any, sourceFile?: string): void {
    this.writeLog(LogLevel.ERROR, message, sourceFile)
  }

  /**
   * Log a message with WARN level
   */
  warn(message: any, sourceFile?: string): void {
    this.writeLog(LogLevel.WARN, message, sourceFile)
  }

  /**
   * Log a message with DEBUG level
   */
  debug(message: any, sourceFile?: string): void {
    this.writeLog(LogLevel.DEBUG, message, sourceFile)
  }

  /**
   * Log a message with VERBOSE level
   */
  verbose(message: any, sourceFile?: string): void {
    this.writeLog(LogLevel.VERBOSE, message, sourceFile)
  }

  /**
   * Write a log entry to console and file
   */
  private writeLog(level: LogLevel, message: any, sourceFile?: string): void {
    // Create structured log entry
    const logEntry: LogEntry = {
      timestamp: this.getTimestamp(),
      level,
      message: typeof message === "object" ? { ...message } : message,
      sourceFile,
      context: this.context,
    }

    // Save to file
    this.saveToFile(logEntry)
  }
}

// Create a global logger instance
export const saveLogger = new SaveLogger()