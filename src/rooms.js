let socket = io();

$('document').ready(function(){
	$('#login-container').delegate('#username-send', 'click', function(e) {
		login($('#username-input').val());
	});
	
	$('#room-container').delegate('#room-join-send', 'click', function(e) {
		join($('#room-input').val());
	});
	
	$('#room-container').delegate('#room-create-send', 'click', function(e) {
		create();
	});
});

function login(name){
	socket.emit('login', name);
}

function join(name){
	socket.emit('join', name);
}

function create(){
	socket.emit('join', '');
}