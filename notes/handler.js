var AWS = require("aws-sdk");
/*global AWS*/
var documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

module.exports.createNote = async (event, context, cb) => {
  let data = JSON.parse(event.body);
  try {
    var params = {
      TableName: "notes",
      Item: {
        notesId: data.id,
        title: data.title,
        body: data.body,
      },
      ConditionExpression: "attribute_not_exists(notesId)",
    };
    await documentClient.put(params).promise();
    cb(null, {
      statusCode: 201,
      body: JSON.stringify(data),
    });
  } catch (err) {
    cb(null, {
      statusCode: 500,
      body: JSON.stringify(err.message),
    });
  }
  return;
};

module.exports.updateNote = async (event) => {
  let notesId = event.pathParameter.id;
  return {
    statusCode: 200,
    body: JSON.stringify("The note with id " + notesId + "has been updated!"),
  };
};

module.exports.deleteNote = async (event) => {
  let notesId = event.pathParameter.id;
  return {
    statusCode: 200,
    body: JSON.stringify("The note with id " + notesId + "has been deleted!"),
  };
};

module.exports.getAllNotes = async (event) => {
  let notesId = event.pathParameter.id;
  return {
    statusCode: 200,
    body: JSON.stringify("All notes are returned"),
  };
};
