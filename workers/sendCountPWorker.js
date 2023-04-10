import { Client, logger, Variables } from "camunda-external-task-client-js";
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
client.subscribe("SendCount", async function({ task, taskService }) {
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
  const accountSid = 'AC977c3988d0e508dc135100a67a56f47d'; // Your Account SID from www.twilio.com/console
  const authToken = 'e656958111451c2672378fa25e7fd4d5'; // Your Auth Token from www.twilio.com/console
  
  const client = twilio(accountSid, authToken);



  const sala = task.variables.get("sala")
  const aforo = task.variables.get("aforo")
  const contador = task.variables.get("contador")  

  let aforoOK = false

  const processVariables = new Variables();
  processVariables.set("aforoOK", aforoOK);



  //const descripcionDesperfecto = '';
  //const mensajeError = `El sistema presenta un desperfecto: ${descripcionDesperfecto}`;
  const mensajeError = `¡ERROR!... El sistema presenta un desperfecto: sala: ${sala}  contador: ${contador}`;
  const mensajeSuperoAforo = `¡ATENCION!...  El sistema muestra que se esta superando el aforo permitido: sala: ${sala},  contador: ${contador}, aforo permitido: ${aforo}`;
  //const mensajeAlto = `¡PELIGRO!... El sistema tiene un severo problema debido a este factor: ${factor} ~ ${cantidadFactor}`;


  if(contador < 0){
    let aforoOK = true
    client.messages
    .create({
      body: mensajeError,
      to: '+51904876139', // Text this number
      from: '+15856202933', // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
    await taskService.handleBpmnError(task, processVariables);
  }

  else if(contador < aforo){
    let aforoOK = true
    await taskService.complete(task, processVariables);
  }
  
  else{
  
    client.messages
    .create({
      body: mensajeSuperoAforo,
      to: '+51904876139', // Text this number
      from: '+15856202933', // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
    await taskService.complete(task, processVariables);
  }


/*  
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
*/
});
