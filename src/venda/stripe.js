const instanciaAxios=require('./dados')
const qs=require('qs')

const criarToken = async card => {
	const dadosCartao = qs.stringify(card)//o card sera o cartao apresentado pelo usuario
	const { data: tokenCartao } = await instanciaAxios.post(
		'/tokens',
		dadosCartao
	)//jeito da biblioteca axios, desse jeito ira gerar um token e um
	//id que sera pego futuramente
	return tokenCartao
}

const cobrar = async (amount, tokenCartao) => {
	const dadosCobranca = qs.stringify({//essa linha é igual a linha dadosCartao
		amount,//valor da venda
		currency: 'brl',
		source: tokenCartao,
	})
	const { data: cobranca } = await instanciaAxios.post(
		'/charges',//charges usado para nova cobrança ou transação.
		dadosCobranca
	)
	return cobranca
}

module.exports = {
	criarToken,
	cobrar,
}
