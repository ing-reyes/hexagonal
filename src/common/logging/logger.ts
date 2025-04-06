import chalk from "chalk"

// Log levels with corresponding colors
export enum LogLevel {
  DEBUG = "debug",
  LOG = "log",
  WARN = "warn",
  ERROR = "error",
  VERBOSE = "verbose",
}

// Define the chalk function type to avoid the namespace error
type ChalkColorFunction = (text: string) => string

export class Logger {
  private readonly context?: string

  constructor(context?: string) {
    this.context = context
  }

  private getTimestamp(): string {
    const localeStringOptions = {
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      day: "2-digit",
      month: "2-digit",
    }
    return new Date(Date.now()).toLocaleString(undefined, localeStringOptions as Intl.DateTimeFormatOptions)
  }

  private formatMessage(level: LogLevel, message: any): string {
    const color = this.getColorByLogLevel(level)
    const technology = color(`[${process.env.TECHNOLOGY}]`);
    const levelString = this.formatLogLevel(level)
    const timestamp = chalk.gray(this.getTimestamp())
    const pidMessage = color(`${process.pid} -`)
    const contextMessage = this.context ? chalk.yellow(`[${this.context}]`) : ""
    const formattedMessage = color(this.formatMessageContent(message))

    return `${technology} ${pidMessage} ${timestamp} ${levelString} ${contextMessage} ${formattedMessage}`
  }

  private formatLogLevel(level: LogLevel): string {
    const color = this.getColorByLogLevel(level)
    return color(`[${level.toUpperCase()}]`)
  }

  private getColorByLogLevel(level: LogLevel): ChalkColorFunction {
    const colorMap: Record<LogLevel, ChalkColorFunction> = {
      [LogLevel.DEBUG]: chalk.magentaBright,
      [LogLevel.VERBOSE]: chalk.cyanBright,
      [LogLevel.LOG]: chalk.green,
      [LogLevel.WARN]: chalk.yellow,
      [LogLevel.ERROR]: chalk.red,
    };
  
    return colorMap[level] || chalk.white;
  }

  private formatMessageContent(message: any): string {
    if (typeof message === "object") {
      try {
        return JSON.stringify(message)
      } catch (e) {
        return String(message)
      }
    }
    return String(message)
  }

  private formatError(error: Error): string {
    return `${chalk.red(error.message)}\n${chalk.gray(error.stack)}`
  }

  log(message: any, context?: string): void {
    this.printMessage(LogLevel.LOG, message, context)
  }

  error(message: any, trace?: string, context?: string): void {
    const formattedMessage = this.formatMessage(LogLevel.ERROR, message)
    console.error(formattedMessage)

    if (trace) {
      console.error(chalk.gray(trace))
    }
  }

  warn(message: any, context?: string): void {
    this.printMessage(LogLevel.WARN, message, context)
  }

  debug(message: any, context?: string): void {
    this.printMessage(LogLevel.DEBUG, message, context)
  }

  verbose(message: any, context?: string): void {
    this.printMessage(LogLevel.VERBOSE, message, context)
  }

  private printMessage(level: LogLevel, message: any, contextOverride?: string): void {
    const currentContext = contextOverride ?? this.context
    const logger = new Logger(currentContext)
    const formattedMessage = logger.formatMessage(level, message)
    console.log(formattedMessage)
  }
}

// Create a global logger instance
export const logger = new Logger()