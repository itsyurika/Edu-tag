
function getAllResourceCards() {
  console.log("loading network.js file");
  let url = "/resources";
  return $.ajax({
    url: url,
    method: "GET",
    type: "application/json",
    success: function(data) {
      console.log("success from ajax:" , data);

    }
  }

  );
}
