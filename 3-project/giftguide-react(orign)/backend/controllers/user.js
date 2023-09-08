const express = require("express");
const User = require("../models/User");
const uuid = require("node-uuid");
const AWS = require("../db/dynamodb");

const getUserAll = async (req, res) => {
  var result = await AWS.getDataAll("User");
  return res.json(result);
};

const getUser = async (req, res) => {
  var user_data = req.params;
  var result = await AWS.getData("User", user_data);
  return res.json(result);
};

const addUser = async (req, res) => {
  var user_data = req.body;
  user_data["id"] = uuid.v4();
  AWS.addData("User", user_data).then(result => {
    return res.json(result);
  });
};

const updateUser = async (req, res) => {
  var user_data = req.body;
  var result = await AWS.updateData("User", user_data);
  console.log(result);
  return res.json(result);
};

const deleteUser = (req, res) => {
  return res.json({ msg: "delete User" });
};

module.exports = {
  getUserAll,
  getUser,
  addUser,
  updateUser,
  deleteUser
};
