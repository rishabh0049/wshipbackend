const express = require("express");
const app = express();
const AWS = require("aws-sdk");
const { v4: uuid } = require("uuid");
const cors = require("cors");
const region = "us-east-1";

const chime = new AWS.Chime({ region });
chime.endpoint = new AWS.Endpoint("https://service.chime.aws.amazon.com/");

app.get("/meeting", cors(), async (req, res) => {
  try {
    const meetingResponse = await chime
      .createMeeting({
        ClientRequestToken: uuid(),
        MediaRegion: region,
      })
      .promise();

    console.log(meetingResponse);
    res.send(meetingResponse);
  } catch (err) {
    res.send(err);
  }
});
app.get("/", cors(), async (req, res) => {
  res.send("Home");
});
app.get("/addattendee", cors(), async (req, res) => {
  try {
    console.log(req.query.id)
    
    const attendeeResponse = await chime
      .createAttendee({
        MeetingId:req.query.id,
        ExternalUserId: uuid(),
      })
      .promise();
    console.log(attendeeResponse);
    res.send(attendeeResponse);
  } catch (err) {
    console.log(err)
    res.send(err);
  }
});

app.listen(5002, () =>
  console.log(`Video calling server listening at http://localhost:5002`)
);
