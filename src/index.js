var player;

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
	return $.get('./nextVideo').then(function(data){
		return data.videoUrl;
	}, function(){
		return '';
	});
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

function postVideoUrl(url) {
	$.post('./addVideo', { 'videoUrl': url}).done( function(data){
		console.log('Successfully added ' + url + ' to the queue');
	}).fail(function(){
		console.log('Failed to add ' + url + ' to the queue');
	});
}

$('document').ready(function(){
	$('#queue-form').delegate('#url-send', 'click', function(e) {
		postVideoUrl($('#url-input').val());
	})
});