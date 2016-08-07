/**
    Copyright 2016-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Rap Geek for a Rap fact"
 *  Alexa: "Here's your Rap fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing rap facts.
 */
var FACTS = [
    
    "Lil Wayne is not the son of Birdman",
    "Rappers Delight as the orginal rap song.",
    "Tupac and Biggie are dead.",
    "J Cole went platinum without any singles.",
    "Kendrick Lammar grew up in Compton.",
    "T.I was in the movie Ant-Man",
    "Two Chainz has a single with Fergie called Netflix.",
    "Usher is divorced.",
    "50 Cent got shot nine times and survived.",
    "Fetty Wap lost his eye due to a childhood injury",
    "Kid Cudi loves Adam Sandler Movies, espically Billy Madison",
    "Kendrick Lamar once worked as a security guard",
    "Eminem was the star of the Movie Eight Mile for which he won awards for",
    "Will Smith did a rap for Two Men in Black Movies , and Wild Wild West",
    "The Mercedes Ladies were the first all-female rap group.",
    "P. Diddy used to be a back-up dancer for Big Daddy Kane and Heavy D.",
    " Nas co-wrote Will Smith’s “Gettin’ Jiggy Wit It,” and it was the only Grammy Award-winning project of his career.",
    "DMX used to be a  bug collector.",
    " Nas Dropped out of school in the 6th grade.",
    "The Nickelodean Show All-that's Theme was performed by TLC.",
    "Drake is Canadian",
    "Two Chains played basketball in college and was also an honor roll student",
    "Wakka Flakka ran for president in 2016 as the Democrat nominee",
    "Fat Joe was in Scary Movie 3.",
    "The rap duo Outkast started out as a rap rivals before joining forces.",
    "Rick Ross loves the franchise Wing Stop.",
    "Kid Ink has a tatto under his chin that says in Jesus Name we Pray, writte in Hebrew.",
    " Jason Sudekis has no sense of smell , and his rap career is also on hold.",
    "Snoop Dogg was good friendw with Tupac.",
    "Kanye grew up in Chicago , and dropped out of college there."
   
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * RapGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a rap fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random rap fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the RapGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

