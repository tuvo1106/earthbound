/* eslint-disable semi */
const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'missing name or price'
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success'
    // results: tours.length,
    // data: {
    //   tours
    // }
  });
};

exports.getTourByID = (req, res) => {
  // console.log(req.params); { id: 5 }
  // convert string to number
  const id = req.params.id * 1;
  // find element in tours array
  // const tour = tours.find(el => el.id === id);
  res.status(200).json({
    status: 'success'
    // data: {
    //   tour: tour
    // }
  });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success'
    // data: {
    //   tour: newTour
    // }
  });
};

exports.updateTour = (req, res) => {
  // will not implement patch with local storage
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour'
    }
  });
};

exports.deleteTour = (req, res) => {
  // will not implement patch with local storage
  // 204 means no content
  res.status(204).json({
    status: 'success',
    data: null
  });
};
