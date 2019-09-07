/* eslint-disable semi */
const fs = require('fs');
const Tour = require('./../../models/tourModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(con => {
    // console.log(con.connections)
    console.log('⚙️  DB connection successful! ⚙️');
  });

// Read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

// import JSON into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded.');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// delete all data from db
const deleteData = async () => {
  try {
    await Tour.deleteMany({});
    console.log('Data successfully deleted.');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const command = process.argv[2];
if (command === '--import') {
  importData();
} else if (command === '--delete') {
  deleteData();
}
