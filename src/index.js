import "dotenv/config"

export function envSafe(schema = {}) {

    const errors = []

    for (const key in schema) {

        const rule = schema[key]
        let value = process.env[key]

        
        if (value === undefined || value === "") {
            errors.push(`Missing environment variable: ${key}`)
            continue
        }

        
        if (Array.isArray(rule)) {

            if (!rule.includes(value)) {
                errors.push(
                    `${key} must be one of: ${rule.join(", ")} (got '${value}')`
                )
            }

            continue
        }

        
        if (typeof rule === "string") {

            if (rule === "number") {

                const num = Number(value)

                if (isNaN(num)) {
                    errors.push(`${key} must be a number (got '${value}')`)
                } else {
                    process.env[key] = num
                }

            }

            if (rule === "boolean") {

                if (!["true","false"].includes(value)) {
                    errors.push(`${key} should be boolean (true/false)`)
                } else {
                    process.env[key] = value === "true"
                }

            }

            if (rule === "string") {

                if (typeof value !== "string") {
                    errors.push(`${key} should be string`)
                }

            }

            continue
        }

        
        if (typeof rule === "object") {

            
            if (rule.type === "number") {

                const num = Number(value)

                if (isNaN(num)) {
                    errors.push(`${key} must be a number`)
                } else {
                    process.env[key] = num
                }

            }

            if (rule.type === "boolean") {

                if (!["true","false"].includes(value)) {
                    errors.push(`${key} must be boolean`)
                } else {
                    process.env[key] = value === "true"
                }

            }

            if (rule.type === "url") {

                try {
                    new URL(value)
                } catch {
                    errors.push(`${key} must be a valid URL`)
                }

            }

            if (rule.type === "email") {

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

                if (!emailRegex.test(value)) {
                    errors.push(`${key} must be a valid email`)
                }

            }

            if (rule.type === "port") {

                const port = Number(value)

                if (isNaN(port) || port < 1 || port > 65535) {
                    errors.push(`${key} must be a valid port (1-65535)`)
                }

            }

            if (rule.type === "json") {

                try {
                    JSON.parse(value)
                } catch {
                    errors.push(`${key} must contain valid JSON`)
                }

            }

            
            if (rule.enum) {

                if (!rule.enum.includes(value)) {
                    errors.push(
                        `${key} must be one of: ${rule.enum.join(", ")}`
                    )
                }

            }

            
            if (rule.minLength && value.length < rule.minLength) {
                errors.push(`${key} must be at least ${rule.minLength} characters`)
            }

            if (rule.maxLength && value.length > rule.maxLength) {
                errors.push(`${key} must be less than ${rule.maxLength} characters`)
            }

            
            if (rule.min !== undefined && Number(value) < rule.min) {
                errors.push(`${key} must be >= ${rule.min}`)
            }

            if (rule.max !== undefined && Number(value) > rule.max) {
                errors.push(`${key} must be <= ${rule.max}`)
            }

            
            if (rule.pattern) {

                if (!rule.pattern.test(value)) {
                    errors.push(`${key} format is invalid`)
                }

            }

        }

    }

    if (errors.length > 0) {

        console.error("\n❌ ENV-SAFE ERROR:\n")

        errors.forEach(err => console.error("•", err))

        console.error("\nFix env variables and restart the app.\n")

        process.exit(1)

    }

    console.log("✔ Environment variables validated")

    return process.env

}