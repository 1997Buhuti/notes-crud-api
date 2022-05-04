"use strict";
import DynamoDB from "aws-sdk/clients/dynamodb";

var documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.put(params, function (err, data) {
  if (err) console.log(err);
  else console.log(data);
});

export async function createNote(event, context, cb) {
  let data = JSON.parse(event.body);
  try {
    var params = {
      TableName: "notes",
      Item: {
        notesId: data.id,
        title: data.body,
        body: data.body,
      },
      ConditionExpression: "attribute_not_exists(notesId)",
    };
    await documentClient.put(params).promise;
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
}

export async function updateNote(event) {
  let notesId = event.pathParameter.id;
  return {
    statusCode: 200,
    body: JSON.stringify("The note with id " + notesId + "has been updated!"),
  };
}

export async function deleteNote(event) {
  let notesId = event.pathParameter.id;
  return {
    statusCode: 200,
    body: JSON.stringify("The note with id " + notesId + "has been deleted!"),
  };
}

export async function getAllNotes(event) {
  let notesId = event.pathParameter.id;
  return {
    statusCode: 200,
    body: JSON.stringify("All notes are returned"),
  };
}
