const express = require("express");
const router = express.Router();
const DBConfig = require("../utils/DBconfig");

router.post("/upload", function (request, response) {
  let smFile;
  let path;

  if (!request.files || Object.keys(request.files).length === 0) {
    return response.status(400).send("No se recibió ningún archivo");
  }

  smFile = request.files.file;
  let time = new Date().getSeconds();
  path = `${__dirname}/file/${time}/${smFile.name}`;

  let qry = "insert into docs(file, hash) values(?,?)";

  let conect = new DBConfig().getConnection();
  conect.query(qry, [path, request.body.hash], (error, result) => {
    if (error) {
      return response.json(error);
    } else {
      return response.json(result);
    }
  });

  conect.end();
  smFile.mv(path, function (error) {
    if (error) return response.send("error");
    return response.send("Success");
  });
});

router.get("/getFiles", function (request, response) {
  let qry = "select * from docs";

  let conect = new DBConfig().getConnection();
  conect.query(qry, (error, result) => {
    if (error) {
      return response.json(error);
    } else {
      return response.json(result);
    }
  });

  conect.end();
});

router.get("/getFile", function (request, response) {
  let qry = "select * from docs where id=?";

  let conect = new DBConfig().getConnection();
  conect.query(qry, [request.query.id],(error, result) => {
    if (error) {
      return response.json(error);
    } else {
      return response.json(result);
    }
  });

  conect.end();
});

router.get("/download", function (request, response) {
  let qry = "select * from docs where id=?";

  let conect = new DBConfig().getConnection();
  conect.query(qry, [request.query.id], (error, result) => {
    if (error) {
      return response.json(error);
    } else {
      const file = result[0].file;
      return response.download(file);
    }
  });

  conect.end();
});

module.exports = router;