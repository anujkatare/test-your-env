# 🌱 test-your-env

test-your-env is a lightweight JavaScript utility that validates environment variables BEFORE your application starts, helping you avoid runtime crashes caused by missing or invalid configuration.

---

WHY test-your-env?

In real-world applications, environment variables are critical.
Common problems include:

- Missing environment variables
- Wrong data types (for example PORT=abc)
- Invalid environment values (for example NODE_ENV=prod)
- Errors discovered after deployment

test-your-env catches these issues early and stops the app safely.

---

FEATURES

- Checks for missing environment variables
- Validates variable types (string, number, boolean)
- Supports allowed values (enums)
- Clear, human-readable error messages
- Zero dependencies
- DevOps and production friendly

---

INSTALLATION

Run:
npm install test-your-env

Note:
test-your-env does NOT load environment variables.
Use dotenv or your deployment platform to load them.

---

BASIC USAGE

Example code:

import "dotenv/config"
import { envSafe } from "test-your-env"

envSafe({
  PORT: "number",
  JWT_SECRET: "string",
  NODE_ENV: ["development", "production"]
})

If all variables are valid, output will be:
✔ Environment variables validated

Your app continues normally.

---

ERROR EXAMPLES

1) Missing variable

.env file:
PORT=3000

Output:
test-your-env ERROR:
- Missing env variable: JWT_SECRET
- Missing env variable: NODE_ENV
Fix env variables and restart the app.

---

2) Invalid type

.env file:
PORT=abc

Output:
test-your-env ERROR:
- PORT should be a number (got "abc")

---

3) Invalid allowed value

.env file:
NODE_ENV=prod

Output:
test-your-env ERROR:
- NODE_ENV must be one of: development, production (got "prod")

---

HOW IT HELPS IN PRODUCTION

- Prevents apps from starting with broken configuration
- Catches CI/CD and deployment mistakes early
- Makes debugging easier for teams
- Reduces runtime crashes

Perfect for:
- Node.js apps
- Next.js backends
- Docker containers
- CI/CD pipelines

---

IMPORTANT NOTES

- test-your-env does NOT modify environment variables
- It only validates existing variables
- Designed to run once at app startup

---

LICENSE

MIT License © anujkatare

---

TIP

If this package helped you, consider starring the repository.
Feedback and contributions are welcome.
