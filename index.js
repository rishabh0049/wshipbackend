const express = require('express')
const app = express()
const AWS = require('aws-sdk')
const { v4: uuid } = require('uuid')
const cors = require('cors')
const region = 'us-east-1'

const chime = new AWS.Chime({ region })
chime.endpoint = new AWS.Endpoint(
    'https://service.chime.aws.amazon.com/'
)
let meetingResponse,attendeeResponse;
app.get('/meeting', cors(), async (req, res) => {
    try {
        
        meetingResponse = await chime
            .createMeeting({
                ClientRequestToken: uuid(),
                MediaRegion: region,
            })
            .promise()
      
       
        console.log(meetingResponse)
    res.send(meetingResponse)
    } catch (err) {
        res.send(err)
    }
})
app.get('/addattendee', cors(), async (req, res) => {
    try {
      console.log(meetingResponse.Meeting.MeetingId,)
        attendeeResponse = await chime
        .createAttendee({
            MeetingId:meetingResponse.Meeting.MeetingId,
            ExternalUserId: uuid(),
        })
        .promise()
        console.log(attendeeResponse)
    res.send(attendeeResponse)
    } catch (err) {
        res.send(err)
    }
})
app.listen(5002, () => console.log(`Video calling server listening at http://localhost:5000`))