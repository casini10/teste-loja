const { Pool } = require('pg')
require('dotenv').config()
//  require('dotenv').config({path:'./src/.env'})
 //se o env estiver dentro de uma pasta tem que usar o path e dizer o caminho
const pool = new Pool({
host: process.env.DB_HOST,
	port:process.env.DB_PORT,
	user:process.env.DB_USER,
	password: process.env.DB_PASS,
	database:process.env.DB_NAME,
	ssl:{rejectUnauthorized: false},
})
module.exports=pool

