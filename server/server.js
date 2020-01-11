var express = require("express");
var volleyball = require("volleyball");
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");
var helmet = require("helmet");
const mongoose = require("mongoose");

var app = express();

const NODE_ENV = process.env.NODE_ENV || "DEV";

console.log("ENV is", NODE_ENV);

// Put your production mongo url here
const DATABASE_URL =
	"mongodb://sagar:sagar5544@ds119755.mlab.com:19755/diet-plan-manager";

//moongose init
mongoose
	.connect(DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(k => {
		console.log("connected to mongo at ", k.connections[0].host);
	})
	.catch(err => console.log("error connecting to mongo ", err));

mongoose.Promise = global.Promise;

const Metric = require("./models/Metric");

app.use(helmet());

console.log("\x1b[36m%s\x1b[0m", "Server Running... 5000");

var server = app.listen(process.env.PORT || 5000);

app.use(volleyball);
app.set("trust proxy", 1);
app.use(
	bodyParser.json({
		limit: "50mb"
	})
);
app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimit: 50000
	})
);

//REMOVE ORIGIN IN PROD
app.use(
	cors({
		credentials: true
	})
);

app.set("trust proxy", 1);

app.use(express.static(path.join(__dirname, "public")));

//API
app.get("/self/metric", async (req, res) => {
	try {
		let { userId } = req.query;
		console.log("userId", userId);

		let metric = await Metric.findOne({
			userId
		});

		res.send({ s: true, metric });
	} catch (err) {
		console.log(err);
		res.send({ s: false });
	}
});

app.post("/self/metric", async (req, res) => {
	try {
		let { age, weight, height, userId, dietType } = req.body;
		console.log("userId", userId);

		const metric = {
			age,
			weight,
			height,
			dietType,
			userId
		};

		let m = await Metric.updateOne({ userId }, metric, {
			upsert: true,
			setDefaultsOnInsert: true
		});

		console.log("got metric", metric);

		res.send({ s: true, metric: m });
	} catch (err) {
		console.log(err);
		res.send({ s: false });
	}
});

//This route is for the website
//------------------------------------------------------

if (process.env.NODE_ENV === "production") {
	app.use(express.static("/build"));
	app.get("*", (req, res) => {
		res.sendFile(__dirname + "/build/index.html");
	});
} else
	app.get("/*", function(req, res) {
		res.sendFile(__dirname + "/public/index.html");
	});
