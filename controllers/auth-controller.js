const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");
const generateAccessToken = require("../utils/generateAccessToken");
const generateRefreshToken = require("../utils/generateRefreshToken");

const normalizeRoles = (roles) => {
  if (Array.isArray(roles)) {
    return roles.filter(Boolean);
  }
  if (typeof roles === "string") {
    return roles.split(",").map((role) => role.trim()).filter(Boolean);
  }
  return ["owner"];
};

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    city,
    province = "ON",
    postalCode,
    password,
    confirmPassword,
    lat = null,
    lng = null
  } = req.body;

  if (!firstName || !lastName || !email || !city || !postalCode || !password) {
    return res.status(400).json({ message: "Missing required registration fields" });
  }

  if (confirmPassword && password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  try {
    const existingAcct = await knex("accounts").where({ email }).first();

    if (existingAcct) {
      return res.status(400).json({ message: `Account with email ${email} already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await knex.transaction(async (trx) => {
      await trx("accounts").insert({
        email,
        passwordHash: hashedPassword,
        passwordSalt: "",
        roles: "owner"
      });

      const account = await trx("accounts").where({ email }).first();

      await trx("users").insert({
        first_name: firstName,
        last_name: lastName,
        email,
        address: req.body.address || "Private",
        city,
        province,
        postal_code: postalCode,
        lat,
        lng,
        account_id: account.id
      });
    });

    const account = await knex("accounts").where({ email }).first();
    const roles = normalizeRoles(account.roles);
    const payload = { accountId: account.id, email: account.email, roles };

    return res.status(201).json({
      message: "Account created",
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
      user: payload
    });
  } catch (error) {
    return res.status(500).json({ message: `Unable to register account: ${error.message}` });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const account = await knex("accounts").where({ email }).first();

    if (!account) {
      return res.status(404).json({ message: `Account with email ${email} does not exist` });
    }

    const passwordMatches = await bcrypt.compare(password, account.passwordHash);

    if (!passwordMatches) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    const roles = normalizeRoles(account.roles);
    const payload = { accountId: account.id, email: account.email, roles };

    return res.json({
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
      user: payload
    });
  } catch (error) {
    return res.status(500).json({ message: `Unable to log in: ${error.message}` });
  }
};

module.exports = { login, register, normalizeRoles };
