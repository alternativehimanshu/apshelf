

export const logger = {
    log: (message: any, ...args: any[]) => {
        console.log("\x1b[36mLOG 🔍 :\x1b[0m", message, ...args)
    },
    error: (message: any, ...args: any[]) => {
        console.error("\x1b[31mERROR ❌ :\x1b[0m", message, ...args)
    },
    warn: (message: any, ...args: any[]) => {
        console.warn("\x1b[33mWARN ⚠️ :\x1b[0m", message, ...args)
    },
    info: (message: any, ...args: any[]) => {
        console.info("\x1b[32mINFO ℹ️ :\x1b[0m", message, ...args)
    },
    debug: (message: any, ...args: any[]) => {
        console.debug('\x1b[35mDEBUG 🔍 :\x1b[0m', message, ...args)
    },
}
