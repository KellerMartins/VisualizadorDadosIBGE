const db = require('../../../../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
  const urbano_rural = await db.query(escape`
    SELECT SUM(urbano) as urbano, SUM(rural) as rural
    FROM domicilios NATURAL JOIN municipio NATURAL JOIN uf
    WHERE sigla_uf = ${req.query.sigla.toUpperCase()}
  `)

  if ('error' in urbano_rural)
    return res.status(500).end(urbano_rural.error.message);

  var total = {"Nº de domicílios urbanos": urbano_rural[0].urbano,
               "Nº de domicílios rurais": urbano_rural[0].rural}
  res.status(200).json(total)
}