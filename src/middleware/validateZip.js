const  validateZip = (req, res, next) => {
  
  const zip = req.params.zip
  const invalidMessage = `Zip (${zip}) is invalid!`

  if (isNaN(zip)) {
    next(invalidMessage)
  } else if (zip.length !== 5) {
    next(invalidMessage)
  } else {
    next()
  }

}

module.exports = validateZip
