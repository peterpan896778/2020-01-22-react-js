const AWS = require("aws-sdk");
var doc = require("dynamodb-doc");

var dynamo = new doc.DynamoDB();

AWS.config.update({
  region: "us-east-1"
});
const docClient = new AWS.DynamoDB.DocumentClient();

const addData = async (table, items) => {
  var params = {
    TableName: table,
    Item: items
  };
  try {
    var result = await docClient.put(params).promise();
    console.log("PutItem succeeded:", JSON.stringify(result, null, 2));
    var data = await getData(table, { id: items["id"] });
    return { msg: "success", data: data };
  } catch (error) {
    return { msg: error };
  }
};

const getDataAll = async table => {
  var params = {
    TableName: table
  };
  try {
    var data = await docClient.scan(params).promise();
    console.log(data);
    console.log("Scan succeeded.");
    return { msg: "success", data: data };
  } catch (error) {
    return { msg: error };
  }
};

const getData = async (table, items) => {
  var params = {
    TableName: table,
    Key: items
  };
  try {
    var data = await docClient.get(params).promise();
    console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    return { msg: "success", data: data };
  } catch (error) {
    return { msg: error };
  }
};

const updateData = async (table, items) => {
  try {
    console.log(items);
    var params = {
      TableName: table,
      Key: items,
      ReturnValues: "UPDATED_NEW"
    };

    console.log("Updating the item...");
    var result = await docClient.update(params).promise();
    console.log(result);
    console.log("UpdateItem succeeded:", JSON.stringify(result, null, 2));
    return { msg: "success" };
  } catch (error) {
    return { msg: error };
  }
};

module.exports = {
  addData,
  getData,
  getDataAll,
  updateData
};
