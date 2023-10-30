const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      //returning a promise
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = asyncWrapper
