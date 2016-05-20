var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	http = require('http').Server(app);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static('src'));
app.use(express.static('bower_components'));

http.listen(3000, function () {
	console.log('listening on *:3000');
});

//Queue variable
var videoQueue = [];
var currentIndex = 0;

app.get('/nextVideo', function (req, res){
	if (videoQueue.length <= currentIndex){
		res.status(404).send('Reached the end of the Queue')
	}
	
	res.send({
		index: currentIndex, 
		videoUrl: videoQueue[currentIndex]
	});
	
	currentIndex++;
});

app.get('/allVideos', function (req, res){
	res.send(videoQueue);
});

app.post('/addVideo', function (req, res){
	videoQueue.push(req.body.videoUrl);
	res.end();
});