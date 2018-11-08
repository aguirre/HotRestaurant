// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var res_tables = [];
// Routes
// =============================================================
//Basic Route of pages
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// =============================================================
// POST

app.post("/tables", function(req, res) {
  var new_res = req.body;

  res_tables.push(new_res);

  for (var i = 0; i < res_tables.length; i++) {
    if (i < 4) {
      res_tables[i].table = i + 1;
    } else {
      res_tables[i].table = "wait";
    }
  }

  return res.json(res_tables);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on http://localhost:" + PORT);
});
