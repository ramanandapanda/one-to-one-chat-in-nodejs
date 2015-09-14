var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
   res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	var caddress = socket.handshake.address;
	
   
  socket.on('chat message', function(msg){
    io.emit('chat message',getFormattedTime()+' : '+msg);
  });
  console.log("New connection from " + caddress );
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3005, function(){
  console.log('listening on *:3005');
});

function getFormattedTime(){
	var MyDate = new Date();
	MyDate.setDate(MyDate.getDate() + 20);
	return ('0' + MyDate.getDate()).slice(-2) + '.' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '.' + MyDate.getFullYear()+' '+MyDate.getHours()+':'+MyDate.getMinutes()+':'+MyDate.getSeconds();
 
	
	}
