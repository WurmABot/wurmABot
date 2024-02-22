const { Client, Collection } = require("discord.js");
// Import Discord.Js.
const client = new Client({ intents: 32767 });
const { AbortController } = require('abort-controller');
// Make New Discord Client.
module.exports = client;
// Export Client To Give Other Files Access.

// Funktion zum Starten der asynchronen Operation mit Abbruchmöglichkeit
async function startAsyncOperationWithAbort() {
    // Erstellen des Abbruch-Controllers
    const controller = new AbortController();
    const signal = controller.signal;

    // Starten der asynchronen Operation
    const operationPromise = doAsyncOperation(signal);

    // Beispiel: Die Operation wird nach 5 Sekunden abgebrochen
    setTimeout(() => {
        console.log("Operation aborted after timeout.");
        controller.abort(); // Abbruch der Operation
    }, 5000);

    try {
        // Warten auf das Ergebnis der asynchronen Operation
        const result = await operationPromise;
        console.log("Operation completed successfully:", result);
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log("Operation aborted.");
        } else {
            console.error("Error occurred during operation:", error);
        }
    }
}

// Beispiel für eine asynchrone Operation
async function doAsyncOperation(signal) {
    return new Promise((resolve, reject) => {
        // Simulieren einer langen asynchronen Operation
        const timeoutId = setTimeout(() => {
            resolve("Result of async operation");
        }, 10000);

        // Eventuell durch das Signal abbrechen
        signal.addEventListener('abort', () => {
            clearTimeout(timeoutId);
            reject(new Error('Operation aborted'));
        });
    });
}

// ———————————————[Global Variables]———————————————
client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.bottons= new Collection();
client.selectMenus= new Collection();
client.config = require("./bot-config/main.json");
require("./handler")(client);
// Initializing the project.

// ———————————————[Logging Into Client]———————————————
const token = process.env["DISCORD_TOKEN"] || client.config.DISCORD_TOKEN;
if(token === ""){
   console.log("—————————————————————————————————");
   console.log("[AntiCrash] :Invalid Token");
   console.log("—————————————————————————————————");
   console.log("There Are 2 Ways To Fix This");
   console.log("Put Your Bot Token in:");
   console.log("1.) index.js On the client.login line remove client.login(token) and write client.login('Your token')");
   console.log("2.) ENV/Secrets If using replit, make new secret named 'DISCORD_TOKEN' and put your token in it else, if your using VsCode, Then Follow Some ENV tutorials (I don't suggest using it in VSC)" );
} else {
   client.login(token);
}
// Login The Bot.
// ———————————————[Error Handling]———————————————
process.on("unhandledRejection", (reason, p) => {
   console.log("—————————————————————————————————");
   console.log("[AntiCrash] : Unhandled Rejection/Catch");
   console.log("—————————————————————————————————");
   console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
   console.log("—————————————————————————————————");
   console.log("[AntiCrash] : Uncaught Exception/Catch");
   console.log("—————————————————————————————————");
   console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
   console.log("—————————————————————————————————");
   console.log("[AntiCrash] : Multiple Resolves");
    console.log("—————————————————————————————————");
   console.log(type, promise, reason);
});
