class AbstractError extends Error {
  constructor(err) {
    super(err);
    this.statusCode = err.statusCode;
    this.message = err.body;
  }
}
module.exports = AbstractError;
