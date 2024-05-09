const pool=require('./conexao')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const senhajwt=require('./src/senha/senha')


const cadastrar=async(req,res)=>{
    const {nome,email,senha}=req.body
    const senhaCodificada=await bcrypt.hash(senha,10)
    const usuario=await pool.query('INSERT INTO usuario(nome,email,senha)  values($1,$2,$3) returning*', [nome,email,senhaCodificada])
    const {senha:_,...dados}=usuario.rows[0]
    res.json(dados)
}
const login=async(req,res)=>{
    const {nome,senha}=req.body
    const usuario=await pool.query('select * from usuario where nome=$1',[nome])
   if (nome.rowCount<=0) {
    res.json('usuario não foi encontrado')
   }
   const validar=await bcrypt.compare(senha,usuario.rows[0].senha)
   if (!validar) {
    res.json('senha inválida')
   }
   const token=jwt.sign({id:usuario.rows[0].id},senhajwt,{ expiresIn:'8 hr'})
   const {senha:_,...info}=usuario.rows[0]
   const dados={
     dado:info,
     token
   }
   res.json(dados)
  
  }
  

        const excluirProduto = async (req, res) => {
          const { id } = req.params;
          try {
              const dados = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);
              
              if (!dados.rows[0]) {
                  return res.status(404).json({ error: 'Produto não existe' });
              }
              
              const deletarProduto = await pool.query('DELETE FROM produtos WHERE id = $1', [id]);
      
              if (deletarProduto.rowCount === 1) {
                  return res.status(200).json({ mensagem: 'Produto excluído com sucesso' });
              } else {
                  return res.status(500).json({ error: 'Não foi possível excluir o produto' });
              }
          } catch (error) {
              console.error('Erro ao excluir produto:', error);
              res.status(500).json({ error: 'Erro interno do servidor' });
          }
      };
      


const detalharCliente=async(req,res)=>{
    const {id}=req.params
 
   try {
        const dados = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
    
        if (dados.rows.length === 0) {
          return res.status(404).json({ error: 'Cliente não encontrado' });
        }
    
        const cliente = dados.rows[0];
    
        res.status(200).json(cliente);
      } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
    };
    


module.exports={cadastrar,login,excluirProduto,detalharCliente}