// build server
var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000, () =>{
    console.log('server running');
});

// tạo kết nối giữa client và server
io.on("connection", function(socket)
	{
		console.log('new client connecting');
		socket.on("disconnect", function()
		{
			console.log('client disconnected');
		});
         //server lắng nghe dữ liệu từ client
		socket.on("Client-sent-data", function(data)
		{
				//sau khi lắng nghe dữ liệu, server phát lại dữ liệu này đến các client khác
				socket.emit("Server-sent-data", data);
				console.log(data);
		});
	});

// create route, display view

app.get("/", function(req, res)
	{
		res.render("homepage");
	});