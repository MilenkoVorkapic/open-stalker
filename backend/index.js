const { exec } = require("child_process");
const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
app.get("/:name", function(req, res) {
  exec(
    "python3 sherlock.py " + req.params.name + " --print-found --timeout 10",
    (err, stdout, stderr) => {
      res.send(stdout);
    }
  );
});

app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
