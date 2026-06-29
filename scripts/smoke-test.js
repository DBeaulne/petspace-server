require("dotenv").config();

const baseUrl = `http://localhost:${process.env.PORT || 8080}`;

const uniqueEmail = `smoke-${Date.now()}@example.com`;
let ownerToken = "";
let adminToken = "";
let applicationId = "";

const request = async (path, options = {}) => {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const text = await response.text();
  let body = null;

  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }

  if (!response.ok) {
    throw new Error(`${options.method || "GET"} ${path} returned ${response.status}: ${text}`);
  }

  return body;
};

const step = async (name, fn) => {
  process.stdout.write(`${name}... `);
  await fn();
  console.log("OK");
};

const run = async () => {
  await step("Register owner", async () => {
    const body = await request("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        firstName: "Smoke",
        lastName: "Owner",
        email: uniqueEmail,
        city: "Whitby",
        province: "ON",
        postalCode: "L1N 1A1",
        password: "Password123!",
        confirmPassword: "Password123!"
      })
    });
    ownerToken = body.accessToken;
  });

  await step("Create owner pet", async () => {
    await request("/pets", {
      method: "POST",
      headers: { Authorization: `Bearer ${ownerToken}` },
      body: JSON.stringify({
        petName: "Smoke Dog",
        petType: "Dog",
        size: "Large",
        temperament: "Friendly",
        age: 4,
        petFood: "Dry food",
        foodServing: "Two cups",
        petActivities: "Walks"
      })
    });
  });

  await step("Login seeded admin", async () => {
    const body = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: "admin@petspace.local",
        password: "PetSpaceAdmin123!"
      })
    });
    adminToken = body.accessToken;
  });

  await step("Submit sitter application", async () => {
    await request("/sitters/applications", {
      method: "POST",
      body: JSON.stringify({
        firstName: "Smoke",
        lastName: "Sitter",
        email: `sitter-${uniqueEmail}`,
        city: "Whitby",
        province: "ON",
        postalCode: "L1N 2B2",
        hourlyRate: 28,
        serviceRadiusKm: 35,
        bio: "Smoke test sitter profile.",
        acceptedPetTypes: ["Dog"],
        acceptedPetSizes: ["Large"]
      })
    });
  });

  await step("Load admin applications", async () => {
    const applications = await request("/admin/sitter-applications", {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const application = applications.find((item) => item.email === `sitter-${uniqueEmail}`);

    if (!application) {
      throw new Error("Created sitter application was not returned to admin.");
    }

    applicationId = application.id;
  });

  await step("Approve sitter application", async () => {
    await request(`/admin/sitter-applications/${applicationId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ status: "approved" })
    });
  });

  await step("Search sitters", async () => {
    const body = await request("/search/sitters", {
      method: "POST",
      body: JSON.stringify({
        petType: "Dog",
        petSize: "Large",
        city: "Whitby"
      })
    });

    if (!Array.isArray(body.sitters)) {
      throw new Error("Search response did not include sitters array.");
    }
  });

  await step("Assistant search fallback", async () => {
    const body = await request("/assistant/search", {
      method: "POST",
      body: JSON.stringify({
        message: "I need care for my large dog in Whitby."
      })
    });

    if (!Array.isArray(body.sitters)) {
      throw new Error("Assistant response did not include sitters array.");
    }
  });

  console.log("\nSmoke test passed.");
};

run().catch((error) => {
  console.error("\nSmoke test failed.");
  console.error(error.message);
  process.exit(1);
});
