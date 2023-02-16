import http from 'node:http'

/**
 * Rotas para:
 * - Criar usuarios
 * - Listagem de usuários
 * - Edição de usuários
 * - Remoção de usuários
 * 
 * Uma requisição HTTP é composta de 2 principais recursos:
 * - Método HTTP
 * - URL
 * (ambas acessadas através do req)
 * 
 * Principaos métodos: GET, POST, PUT, PATCH, DELETE
 * GET - BUSCAR/LER uma informação/recurso do back-end
 * POST - CRIAR uma informação/recurso no back-end
 * PUT - ATUALIZAR uma informação/recurso no back-end (muitos campos ao mesmo tempo)
 * PATCH - ATUALIZAR uma informação ESPECÍFICA de um recurso no back-end (uma informação)
 * DELETE - Deletar uma informação/recurso do back-end
 * 
 * Exemplo de leitura de rota = método HTTP + URL:
 * GET / users => Buscando um usuario no back-end
 * POST / users => Criando um usuario no back-end
 * 
 * Tudo o que for criado aqui no servidor com o Node fica salvo em memória - Stateful
 * A diferença entre uma aplicação statefull para stateless é que a primeira sempre tem as informações sendo guardadas em memória até que ela seja derrubada.
 * Uma aplicação stateless não salva nada em memória, e sim em bd, arquivos de textos e etc então se for derrubada não se perdem essas informações
 * 
 * Aqui, vamos criar uma aplicação stateful
 * 
 * HEADERS - Cabeçalhos (Requisição / Resposta) -> Metadados que servem para que a comunicação entre front-end e back-end seja interpretada de maneira correta.
 * São enviados através do método .setHeader
 * 
 * HTTP Status Code - Respostas do back-end para o front-end sobre se a requisição foi executada com sucesso ou não - dentre outros status
 * 100 - 199 => Respostas Informativas apenas
 * 200 - 299 => Respostas de Sucesso
 * 300 - 399 => Redirecionamento de Rota
 * 400 - 499 => Erros originados na requisição (pelo usuário) - Quando o usuário não informa um dado esperado para criação de um usuário, por exemplo.
 * 500 - 599 => Erro em alguma parte do back-end
 * 
 * Os status code podem ser escritos através do método writeHead()
 */

const users = []

const server = http.createServer((req, res) => {
    const method = req.method
    const url = req.url

    if (method === 'GET' && url === '/users') {
        // Precisamos transformar os dados de array para string, pois, o Node não devolve arrays para o front-end
        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'Jefferson',
            email: 'jeffersonmailai@bol.com'
        })

        return res.writeHead(201).end()
        // Normalmente, ao criar algo, o status utilizado é o 201.
    }

    return res.writeHead(404).end()
})

server.listen(3333)