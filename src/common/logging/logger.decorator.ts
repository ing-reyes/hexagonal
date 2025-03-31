import { Logger } from "./logger"

/**
 * Decorator to log method execution with timing information
 */
export function LogMethod(context?: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    const methodContext = context ?? target.constructor.name
    const logger = new Logger(methodContext)

    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now()
      logger.debug(`${propertyKey} - Started`)

      try {
        const result = await originalMethod.apply(this, args)
        const executionTime = Date.now() - startTime
        logger.debug(`${propertyKey} - Completed in ${executionTime}ms`)
        return result
      } catch (error) {
        const executionTime = Date.now() - startTime
        logger.error(
          `${propertyKey} - Failed after ${executionTime}ms`,
          error instanceof Error ? error.stack : String(error),
        )
        throw error
      }
    }

    return descriptor
  }
}