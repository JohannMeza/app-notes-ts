const ValidarEntorno = (env) => {
  if (env === 'desarrollo') return true
  else if (env === 'produccion') return false
  else return null
}

module.exports = {
  ValidarEntorno
}