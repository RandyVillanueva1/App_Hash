const digestMessage = async (text) => {
  const msg = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msg);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

const readText = async (event) => {
  const file = event.target.files.item(0);
  const text = await file.text();
  let hash = await digestMessage(text);
  localStorage.setItem("hash", hash);
};

const compare = async (event) => {
  const file = event.target.files.item(0);
  const text = await file.text();
  let hashTmp = await digestMessage(text);
  let hashOriginal = localStorage.getItem("hashOriginal");

  if(hashTmp == hashOriginal) {
    alert("El documento no ha sido modificado");
  }
  else {
    alert("EL documento fue modificado")
  }
};

const saveHash = (item) => {
axios
      .get(`http://localhost:8080/api/docs/getFile?id=${item}`)
      .then((response) => {
        localStorage.setItem("hashOriginal", response.data[0].hash)
      })
      .catch((error) => {
        alert("Error");
      });
}

const sendData = () => {
  let file = document.getElementById("fileUpload").files[0];
  let hash = localStorage.getItem("hash");

  if (file) {
    let data = new FormData();
    data.append("file", file);
    data.append("hash", hash);
    axios
      .post("http://localhost:8080/api/docs/upload", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Exito");
      })
      .catch((error) => {
        alert("Error");
      });
  }
};


const downloadf = (id) => {
  let url = `http://localhost:8080/api/docs/download?id=${id}`

  axios
      .get(url)
      .then((response) => {
        alert("Descargando");
      })
      .catch((error) => {
        alert("Error");
      });
}
