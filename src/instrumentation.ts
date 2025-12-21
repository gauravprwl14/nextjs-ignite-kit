/**
 * Next.js Instrumentation Module
 *
 * @description This module provides global error handling and logging for the Next.js application.
 * It captures uncaught exceptions, unhandled promise rejections, and other critical errors
 * to prevent silent crashes and provide debugging information.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

/**
 * Register function called by Next.js at application startup
 *
 * @description Sets up global error handlers for the Node.js process.
 * This function is automatically called by Next.js when the application starts.
 * It registers handlers for:
 * - uncaughtException: Synchronous errors that bubble up to the event loop
 * - unhandledRejection: Promise rejections that are not caught
 * - warning: Node.js process warnings
 * - SIGTERM/SIGINT: Graceful shutdown signals
 *
 * @example
 * // This function is automatically invoked by Next.js
 * // No manual call is required
 *
 * @returns {void}
 */
export async function register(): Promise<void> {
  // Only register handlers in Node.js runtime (not Edge)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log("[Instrumentation] Registering global error handlers...");

    /**
     * Handler for uncaught synchronous exceptions
     *
     * @description Catches any synchronous error that is not caught by try-catch blocks
     * and bubbles up to the Node.js event loop. Logs the error and allows the process
     * to continue running if possible.
     *
     * @param {Error} error - The uncaught error object
     * @param {string} origin - The origin of the exception ('uncaughtException' or 'unhandledRejection')
     */
    process.on("uncaughtException", (error: Error, origin: string) => {
      console.error("=".repeat(60));
      console.error("[CRITICAL] Uncaught Exception Detected");
      console.error("=".repeat(60));
      console.error("Origin:", origin);
      console.error("Error Name:", error.name);
      console.error("Error Message:", error.message);
      console.error("Stack Trace:", error.stack);
      console.error("Timestamp:", new Date().toISOString());
      console.error("=".repeat(60));

      // In production, you might want to:
      // - Send to error monitoring service (Sentry, DataDog, etc.)
      // - Write to a log file
      // - Trigger alerts

      // Note: It's generally not recommended to continue after uncaughtException
      // but we log and allow the process to attempt recovery
    });

    /**
     * Handler for unhandled promise rejections
     *
     * @description Catches any promise rejection that is not handled by .catch()
     * or try-catch in async/await. Logs the rejection reason for debugging.
     *
     * @param {unknown} reason - The rejection reason (usually an Error object)
     * @param {Promise<unknown>} promise - The promise that was rejected
     */
    process.on(
      "unhandledRejection",
      (reason: unknown, promise: Promise<unknown>) => {
        console.error("=".repeat(60));
        console.error("[ERROR] Unhandled Promise Rejection Detected");
        console.error("=".repeat(60));
        console.error("Promise:", promise);
        console.error("Reason:", reason);

        if (reason instanceof Error) {
          console.error("Error Name:", reason.name);
          console.error("Error Message:", reason.message);
          console.error("Stack Trace:", reason.stack);
        }

        console.error("Timestamp:", new Date().toISOString());
        console.error("=".repeat(60));
      }
    );

    /**
     * Handler for Node.js process warnings
     *
     * @description Captures process warnings like deprecation notices,
     * experimental feature usage, or memory leaks.
     *
     * @param {Error} warning - The warning object
     */
    process.on("warning", (warning: Error) => {
      console.warn("=".repeat(60));
      console.warn("[WARNING] Node.js Process Warning");
      console.warn("=".repeat(60));
      console.warn("Name:", warning.name);
      console.warn("Message:", warning.message);
      console.warn("Stack:", warning.stack);
      console.warn("Timestamp:", new Date().toISOString());
      console.warn("=".repeat(60));
    });

    /**
     * Handler for SIGTERM signal (graceful shutdown)
     *
     * @description Handles termination signals for graceful shutdown.
     * This is important for containerized environments (Docker, Kubernetes).
     */
    process.on("SIGTERM", () => {
      console.log("=".repeat(60));
      console.log("[INFO] SIGTERM signal received - Graceful shutdown initiated");
      console.log("Timestamp:", new Date().toISOString());
      console.log("=".repeat(60));
      // Allow the process to exit naturally
    });

    /**
     * Handler for SIGINT signal (Ctrl+C)
     *
     * @description Handles interrupt signals (usually Ctrl+C in terminal).
     */
    process.on("SIGINT", () => {
      console.log("=".repeat(60));
      console.log("[INFO] SIGINT signal received - Interrupt shutdown");
      console.log("Timestamp:", new Date().toISOString());
      console.log("=".repeat(60));
      process.exit(0);
    });

    /**
     * Handler for process exit
     *
     * @description Logs when the process is about to exit with the exit code.
     *
     * @param {number} code - The exit code
     */
    process.on("exit", (code: number) => {
      console.log("=".repeat(60));
      console.log(`[INFO] Process exiting with code: ${code}`);
      console.log("Timestamp:", new Date().toISOString());
      console.log("=".repeat(60));
    });

    console.log("[Instrumentation] Global error handlers registered successfully");
  }
}

