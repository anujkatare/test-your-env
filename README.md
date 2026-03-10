# 🌱 test-your-env

**test-your-env** is a lightweight JavaScript utility that validates environment variables **before your application starts**, helping you avoid runtime crashes caused by missing or invalid configuration.

---

## 🚀 Why test-your-env?

In real-world applications, environment variables are critical.
Common problems include:

* Missing environment variables
* Wrong data types (for example `PORT=abc`)
* Invalid environment values (for example `NODE_ENV=prod`)
* Errors discovered only after deployment

**test-your-env** catches these issues early and stops the app safely before it starts.

---

## ✨ Features

* Validate required environment variables
* Type validation (`string`, `number`, `boolean`)
* Support for allowed values (enums)
* Clear and human-readable error messages
* Lightweight and easy to use
* Works well in **DevOps and production environments**

---

## 📦 Installation

Install the package using npm:

```bash
npm install test-your-env
```

> **Note:**
> `test-your-env` does **not load environment variables**.
> Use `dotenv` or your deployment platform to load them.

Example:

```javascript
import "dotenv/config"
```

---

## 🧪 Basic Usage

```javascript
import "dotenv/config"
import { envSafe } from "test-your-env"

envSafe({
  PORT: "number",
  JWT_SECRET: "string",
  NODE_ENV: ["development", "production"]
})
```

If all variables are valid, the output will be:

```
✔ Environment variables validated
```

Your application will then start normally.

---

## ❌ Error Examples

### 1. Missing Environment Variable

`.env`

```
PORT=3000
```

Output:

```
❌ test-your-env ERROR:

• Missing environment variable: JWT_SECRET
• Missing environment variable: NODE_ENV

Fix env variables and restart the app.
```

---

### 2. Invalid Type

`.env`

```
PORT=abc
```

Output:

```
❌ test-your-env ERROR:

• PORT must be a number (got 'abc')
```

---

### 3. Invalid Allowed Value

`.env`

```
NODE_ENV=prod
```

Output:

```
❌ test-your-env ERROR:

• NODE_ENV must be one of: development, production (got 'prod')
```

---

## ⚙️ How It Helps in Production

* Prevents applications from starting with broken configuration
* Detects CI/CD and deployment mistakes early
* Improves debugging for teams
* Reduces runtime crashes

Perfect for:

* Node.js applications
* Next.js backends
* Docker containers
* CI/CD pipelines

---

## 📌 Important Notes

* `test-your-env` **does not modify environment variables**
* It only **validates existing variables**
* Designed to run **once during application startup**

---

## 📄 License

MIT License © Anuj Katare

---

⭐ If this package helped you, consider **starring the repository**.
Contributions and feedback are always welcome.
