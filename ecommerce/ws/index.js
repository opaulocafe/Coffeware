const express = require('express')
const morgan = require('morgan')
const app = express()

require('./src/services/database')

const loginRoutes = require('./src/routes/login.routes')
const cadastroRoutes = require('./src/routes/cadastro.routes')
const produtoRoutes = require('./src/routes/produto.routes')
const enderecoRoutes = require('./src/routes/endereco.routes')
const cupomRoutes = require('./src/routes/cupom.routes')
const pagamentoRoutes = require('./src/routes/pagamento.routes')
const bannerRoutes = require('./src/routes/banner.routes')

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

// ROTAS
app.use('/', loginRoutes)
app.use('/cadastrar', cadastroRoutes)
app.use('/produto', produtoRoutes)
app.use('/endereco', enderecoRoutes)
app.use('/cupom', cupomRoutes)
app.use('/pagamento', pagamentoRoutes)
app.use('/banners', bannerRoutes)

app.listen(8080, () => {
    console.log('Meu servidor está funcionando!')
})