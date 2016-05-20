let player;

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: '',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function onPlayerReady(event) {
	playNextVideo(event);
}

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.ENDED) {
		playNextVideo(event);
	}
}

function getNextVideo() {
	socket.emit('nextVideo');
}

function playNextVideo(event){
	var intervalId = setInterval(function(){
			getNextVideo().then(function (url){
				event.target.mute();
				event.target.loadVideoById(url, 0, 'High');
				event.target.playVideo();
				clearInterval(intervalId);
			})
		}, 1000);
}


function sendVideo(url){
	socket.emit('addVideo', url);
}

socket.on('nextVideo', function(url){
	var intervalId = setInterval(function(){
			if (url === ''){
				getNextVideo();
			} else {
				event.target.mute();
				event.target.loadVideoById(url, 0, 'High');
				event.target.playVideo();
				clearInterval(intervalId);
			}
		}, 1000);
})

$('document').ready(function(){
	$('#queue-form').delegate('#url-send', 'click', function(e) {
		sendVideo($('#url-input').val());
	})
});