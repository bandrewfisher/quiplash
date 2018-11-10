var express = require('express');
var router = express.Router();

var prompts = [{
        id: "1",
        prompt: "What two words would passengers never want to hear a pilot say?"
    },
    {
        id: "2",
        prompt: "You would never go on a roller coaster called ________."
    },
    {
        id: "3",
        prompt: "Name a candle scent designed specifically for Kim Kardashian."
    },
    {
        id: "4",
        prompt: "Everyone knows that monkeys hate ________."
    },
    {
        id: "5",
        prompt: "The worst thing for an evil witch to turn you into"
    },
    {
        id: "6",
        prompt: "The Skittles flavor that just missed the cut"
    },
    {
        id: "7",
        prompt: "A name for a really bad Broadway musical"
    },
    {
        id: "8",
        prompt: "Something squirrels probably do when no one is looking"
    },
    {
        id: "9",
        prompt: "A terrible name for a cruise ship"
    },
    {
        id: "10",
        prompt: "The name of a font nobody would ever use"
    },
    {
        id: "11",
        prompt: "A not-very-scary name for a pirate"
    },
    {
        id: "12",
        prompt: "The best thing about going to prison"
    },
    {
        id: "13",
        prompt: "The best title for a new national anthem for the USA"
    },
    {
        id: "14",
        prompt: "Come up with the name of book that would sell a million copies, immediately"
    },
    {
        id: "15",
        prompt: "The hardest thing about being Batman"
    },
    {
        id: "16",
        prompt: "The name of the reindeer Santa didn't pick to pull his sleigh"
    },
]

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/quiplashDB', { useNewUrlParser: true });

var quiplashSchema = mongoose.Schema({
    Prompt: String
});

var responseSchema = mongoose.Schema({
    PromptId: String,
    Username: String,
    Response: String,
    Likes: Number
});

var Prompt = mongoose.model('Prompt', quiplashSchema);
var Response = mongoose.model('Response', responseSchema);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected to database");
});


// Prompt.find({}).remove().exec();

// for(let i=0; i<prompts.length; i++) {
//     var row = new Prompt({Prompt: prompts[i].prompt});
//     console.log(row);
//     row.save(function(err, post) {
//         if (err) {
//             console.log("ERROR");

//         }
//         else {
//             console.log("inserted");
//         }
//     });

// }
/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('index.html', { root: "public" });
});

router.get('/prompts', function(req, res, next) {
    Prompt.find({}, function(err, promptList) {
        if (err) return console.error(err);
        else {
            res.json(promptList);
        }
    });
});

router.get('/responses', function(req, res, next) {
    let id = req.query["id"];
    Response.find({ PromptId: id }, function(err, responses) {
        if (err) {
            return console.error("Error getting responses");
        }
        else {
            res.json(responses);
        }
    });
});

router.post('/response', function(req, res, next) {
    console.log("whoo hoo");
    let row = new Response(req.body);
    row.save(function(err, post) {
        if (err) console.log("Error in inserterting response");
        else {
            console.log("Inserted new response: " + JSON.stringify(req.body));
        }
    });
    res.sendStatus(200);
});

router.post('/like', function(req, res, next) {
    console.log("liked soething");
    let request = req.body;
    console.log(JSON.stringify(request));
    Response.save({_id: request.commentId, Likes: request.numLikes})

    res.sendStatus(200);
});

module.exports = router;
