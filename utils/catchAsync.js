module.exports = fn => {
  // returns an anonymous function
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  };
}
