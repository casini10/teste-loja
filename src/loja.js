const pool = require('../conexao')
const instanciaAxios = require('./venda/dados')
const { criarToken, cobrar } = require('./venda/stripe')

const venda = async (req, res) => {
	const {produto, quantidade,card } = req.body
	try {
       // const {data:saldo}=await instanciaAxios.get('/balance')
      //return res.json(saldo)
		const item=await pool.query('select * from produtos where id=$1', [produto])
        const valorT=item.rows[0].valor*quantidade

		/*const tokenCartao = await criarToken({ card })
		const cobranca = await cobrar(valorVenda, tokenCartao.id)*/
		const cobranca = await cobrar(valorT, 'tok_visa')//foi necessario
		//fazer isso q nao estava aceitando o de cima com o cartao deles     
        console.log(cobranca.id)

		const vendaRealizada = await pool.query('insert into venda (usuario_id, produto_id, quantidade_id, valor,dados_cobranca) values ($1, $2, $3, $4,$5) returning *', [
			req.usuario,
			produto,
			quantidade,//quantidade tem que ser a mesma do banco de dados    
            valorT,
			cobranca.id,//  essa cobranca é o id da costante cobranca la de cima e
			//o charge volta um objeto muito grande 
			//e so queremos o id

		])
        console.log(cobranca.id)

        

		return res.status(201).json(vendaRealizada.rows[0])
	} catch (error) {
		//console.error(error); // Registra o erro para mais detalhes
		if (error.response) {
			console.log(error.message)
			return res.status(400).json({ mensagem: error.response.data.error.message });
		}
		return res.status(500).json({ mensagem: 'Erro interno do servidor' });
	}
	
}

module.exports = {
	venda
}
