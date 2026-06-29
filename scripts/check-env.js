require("dotenv").config();

const required = [
  "PORT",
  "DB_HOST",
  "DB_NAME",
  "DB_USER",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET"
];

const optional = [
  "DB_PASSWORD",
  "CLIENT_ORIGIN",
  "MAPBOX_TOKEN",
  "OPENAI_API_KEY",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL"
];

const missing = required.filter((key) => !process.env[key]);

console.log("PetSpace server environment check");
console.log("---------------------------------");

required.forEach((key) => {
  console.log(`${process.env[key] ? "OK" : "MISSING"} ${key}`);
});

optional.forEach((key) => {
  console.log(`${process.env[key] ? "OK" : "optional"} ${key}`);
});

if (missing.length > 0) {
  console.error(`\nMissing required environment values: ${missing.join(", ")}`);
  process.exit(1);
}

console.log("\nEnvironment has the required values for local server testing.");
