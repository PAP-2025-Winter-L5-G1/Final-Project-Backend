const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");
require("dotenv").config();

const createUser = (username, email, passwordHash, callback) => {
  const sql = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
  db.run(sql, [username, email, passwordHash], function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, username, email });
  });
};

const findUserByEmail = (email, callback) => {
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
      callback(err, user);
  });
};

module.exports = { createUser, findUserByEmail };
