import { Client, logger, Variables } from "camunda-external-task-client-js";
//const { Client, logger } = require("camunda-external-task-client-js");
//const { Variables } = require("camunda-external-task-client-js");
import rp from 'request-promise';
import axios from 'axios';
import twilio  from'twilio';


// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8081/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'Sendletter'
client.subscribe("SendLetter", async function({ task, taskService }) {
  // Put your business logic
/*  const bookTitle = task.variables.get("book")
  console.log("** Reminder to Read: "+ bookTitle + "**");

  const austriaResponse = "Sorry Laff can't help. BTW, Prussia wants a quick word with you..."
  const processVariables = new Variables();
  processVariables.set("austriaResponse", austriaResponse);

  
  if(bookTitle.includes("Austria")){
    // complete the task
    await taskService.complete(task, processVariables);
  }else{
    // throw a BPMN error
    await taskService.handleBpmnError(task, "REFUSE_HELP", "Sorry! We're super busy, you are on your own.", processVariables);
  }*/

  /*
  rp.post('https://api.twilio.com/2010-04-01/Accounts/AC5564f12577102248dbc84df8a854eb33/Messages.json', {
    headers: {
        "Content-type": "application/x-www-form-urlencoded",
        "Authorization": "Basic QUM1NTY0ZjEyNTc3MTAyMjQ4ZGJjODRkZjhhODU0ZWIzMzpjZTM3MzRmMzFlMDJhOGJhMDcwZDVhY2ExNTZiMGE5Mg=="
      },
      form: {
        Body: 'Prueba de Beegons',
        From: '+13023055431',
        To: '+51904076139',
      }
    }).then(() => {
      console.log("Enviadooooooooooooo")
    });*/


/*
axios.get('https://rickandmortyapi.com/api')
  .then(function (response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });*/
  //axios.post('https://api.twilio.com/2010-04-01/Accounts/AC5564f12577102248dbc84df8a854eb33/Messages.json', {
/*  axios.post('https://api.twilio.com/2010-04-01/Accounts/AC977c3988d0e508dc135100a67a56f47d/Messages.json', {
    Body: 'Prueba de Beegons',
    From: '+15856202933',
    To: '+51904876139',
  }, {
    headers: {
      //"Content-type": "application/x-www-form-urlencoded",
      "Content-type": "application/json",
      "Authorization": "Basic e656958111451c2672378fa25e7fd4d5"
      //"Authorization": "Basic QUM1NTY0ZjEyNTc3MTAyMjQ4ZGJjODRkZjhhODU0ZWIzMzpjZTM3MzRmMzFlMDJhOGJhMDcwZDVhY2ExNTZiMGE5Mg=="
    }
  }).then(({data}) => console.log(data.data));

*/
console.log('holax');
  const accountSid = 'AC977c3988d0e508dc135100a67a56f47d'; // Your Account SID from www.twilio.com/console
  const authToken = 'e656958111451c2672378fa25e7fd4d5'; // Your Auth Token from www.twilio.com/console
  
  const client = twilio(accountSid, authToken);
  
  client.messages
    .create({
      body: 'Hello from twilio-node',
      to: '+51904876139', // Text this number
      from: '+15856202933', // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
  

    console.log('hola');

});
