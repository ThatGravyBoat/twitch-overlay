let params = new URLSearchParams( location.search );
var commands = [];
var queueStarted = false;
var commandQueue = [];
var promoCount = 0;
document.onload = setCommands()

function setCommands() {
    commandsCommand.forEach(command => {
        commands.push(command.command)
    })
    if (periodicPopups.length > 1){
        periodicPromos()
    }
}

function periodicPromos() {
    var promoInterval = setInterval(() => {
        var randomPromo = periodicPopups[promoCount];
        if (promoCount === (periodicPopups.length - 1))
            promoCount = 0
        else
            promoCount++
        if (randomPromo.type === "text"){
            commandQueue.push(queueFunction(textPopup, this, [`${randomPromo.text}`,`${randomPromo.duration}`]));
            if (!queueStarted){
                queueStart()
            }
        }
        if (randomPromo.type === "img"){
            commandQueue.push(queueFunction(gifOrImgPopup, this, [`${randomPromo.url}`,`${randomPromo.duration}`]));
            if (!queueStarted){
                queueStart()
            }
        }
        if (randomPromo.type === "video"){
            commandQueue.push(queueFunction(videoPopup, this, [`${randomPromo.url}`,`${randomPromo.duration}`,`${randomPromo.volume}`]));
            if (!queueStarted){
                queueStart()
            }
        }
    
        if (randomPromo.msg.length > 0)
            ComfyJS.Say(randomPromo.msg);
    }, (45 * 60) * 1000);
}

var queueFunction = function(fn, context, params) {
    return function() {
        fn.apply(context, params);
    };
}
function queueStart() {
    if (!queueStarted) {
        if (commandQueue.length > 0) {
            queueStarted = true
            if (document.getElementById("bubble").classList.contains("hidden")){
                document.getElementById("bubble").classList.toggle("hidden")
            }
            if (commandQueue.length > 0) {
                (commandQueue.shift())();   
            }
        }
        else if (!document.getElementById("bubble").classList.contains("hidden"))
        {
            document.getElementById("bubble").classList.toggle("hidden")
        }
    }
}

ComfyJS.onCommand = ( user, command, message, flags, extra) => {
    if (commands.includes(command)) {
        command = commandsCommand[commands.indexOf(command)];
        if (command.type === "text"){
            commandQueue.push(queueFunction(textPopup, this, [`${command.text}`,`${command.duration}`]));
            if (!queueStarted){
                queueStart()
            }
        }
        if (command.type === "img"){
            commandQueue.push(queueFunction(gifOrImgPopup, this, [`${command.url}`,`${command.duration}`]));
            if (!queueStarted){
                queueStart()
            }
        }
        if (command.type === "video"){
            commandQueue.push(queueFunction(videoPopup, this, [`${command.url}`,`${command.duration}`,`${command.volume}`]));
            if (!queueStarted){
                queueStart()
            }
        }
    }
}
ComfyJS.onChat = ( user, message, flags, self, extra ) => {
    if (commands.includes(message.trim())) {
        command = commandsCommand[commands.indexOf(command)];
        if (command.type === "text-chat"){
            commandQueue.push(queueFunction(textPopup, this, [`${command.text}`,`${command.duration}`]));
            if (!queueStarted){
                queueStart()
            }
        }
        if (command.type === "img-chat"){
            commandQueue.push(queueFunction(gifOrImgPopup, this, [`${command.url}`,`${command.duration}`]));
            if (!queueStarted){
                queueStart()
            }
        }
        if (command.type === "video-chat"){
            commandQueue.push(queueFunction(videoPopup, this, [`${command.url}`,`${command.duration}`,`${command.volume}`]));
            if (!queueStarted){
                queueStart()
            }
        }
    }
}


ComfyJS.Init( "BotDagger", "oauth:" + params.get( "oauth" ), "JaxDagger" );
