var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
   res.sendFile(__dirname + '/index.html');
});
app.get('/google', function(req, res){
   res.sendFile(__dirname + '/google/google.html');
});
app.get('/googlelogo_color_272x92dp.png', function(req, res){
   res.sendFile(__dirname + '/google/googlelogo_color_272x92dp.png');
});
app.get('/js/jquery-1.11.1.js', function(req, res){
   res.sendFile(__dirname + '/lib/jquery-1.11.1.js');
});app.get('/js/socket.io-1.2.0.js', function(req, res){
   res.sendFile(__dirname + '/lib/socket.io-1.2.0.js');
});

io.on('connection', function(socket){
	var caddress = socket.handshake.address;

  socket.on('chat message', function(msg){
    io.emit('chat message',getFormattedTime()+' : '+msg);
  });
  console.log("New connection from " + caddress+'@'+getFormattedTime() );
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});

function getFormattedTime(){
	var MyDate = new Date();
	return ('0' + MyDate.getDate()).slice(-2) + '.' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '.' + MyDate.getFullYear()+' '+MyDate.getHours()+':'+MyDate.getMinutes()+':'+MyDate.getSeconds();
 
	
	}
