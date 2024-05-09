const express=require('express')
const app=express()
const {cadastrar, login, excluir, detalharCliente, excluirProduto}=require('./src/usuario')
const {validar}=require('./src/validarUsuario')
const { schema } = require('./src/dadosUsuario')
const { venda } = require('./src/loja')
const { token } = require('./src/intermediario')

app.post('/cadastrar', validar(schema), cadastrar)
app.post('/login', login)
app.post('/venda', token,venda)
app.delete('/excluir/:id', excluirProduto)
app.get('/cliente/:id',detalharCliente)


module.exports=app



