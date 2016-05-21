let player;

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: 'F37ePB-UGgU',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function onPlayerReady(event) {
	getNextVideo();
}

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.ENDED) {
		getNextVideo();
	}
}

function getNextVideo() {
	socket.emit('nextVideo', player.getVideoData().video_id);
}

function sendVideo(url){
	socket.emit('addVideo', url);
}

socket.on('nextVideo', function(url){
	player.mute();
	player.loadVideoById(url, 0, 'High');
	player.playVideo();
})

$('document').ready(function(){
	$('#queue-form').delegate('#url-send', 'click', function(e) {
		sendVideo($('#url-input').val());
	})
});