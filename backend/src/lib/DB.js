const mongoose = require("mongoose");
const connectDB = () => {
  mongoose
    .connect(process.env.URI)
    .then((data) => {
      console.log(
        `Server is connected with the database ${data.connection.host}`
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;
