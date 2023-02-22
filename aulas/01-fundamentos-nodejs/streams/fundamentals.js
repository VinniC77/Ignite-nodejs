// Sim, Netlfix e Spotify podem nos ajudar a entender melhor o que significam streams no Node.
// Em ambas aplicações, assim que apertamos o play a musica ou o filme começam a rodar imediatamente, mesmo não tendo carregado todo o arquivo.
// Com o node, podemos fazer isso de forma simples e performática.

/**
 * Numa aplicação normal, um arquivo de 1GB a uma velociadade de upload internet de 10MB/s demoraria 100s para ser carregada. E, só depois de ser totalmente carregada,
 * ficaria disponível para o usuário interagir com ela. Isso é chamado de READABLE STREAM
 * 
 * Com o Node essa mesma operação já disponibilizaria os dados à medida em que fossem baixados, não precisando carregar totalmente o arquivo antes de poder usá-lo.
 * Isso é chamado de WRITABLE STREAM
 * 
 * STDin é tudo o que o usuário digita no terminal.
 * 
 * O grande lance do Node é poder conectar as streams
 */

process.stdin
    .pipe(process.stdout)
// Nesse exemplo, tudo que estou recebendo (stdin), estou encaminhando (através do pipe) para o stdout (stream de saída). Por isso que o terminal escreve duas vezes

import { Readable, Writable, Transform } from 'node:stream'

// Criando uma stream de LEITURA (readable) do total zero:
class OneToHundredStream extends Readable {
    index = 1
    _read() {
        const i = this.index++ // somando 1 ao index a cada execução do metodo _read

        setTimeout(() => {
            if (i > 100) {
                this.push(null) // Não tem mais informações para serem enviadas de dentro dessa stream
            } else {
                const buff = Buffer.from(String(i)) // o Node não lida com dados primitivos como number e etc... precisamos converter para o tipo Buffer
                this.push(buff) // Enviar o i de dentro da stream
            }
        }, 1000)
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
    // o primeiro parametro do callback é o erro
    // o segundo parametro é o item transformado
        callback(null, Buffer.from(String(transformed)))
    }
}

// Criando uma stream de ESCRITA (writable) do total zero: - só processa o dado e não transforma em outra coisa
class MultiplyByTenStream extends Writable {
    // chunk - o pedaço da stream de leitura enviado no this.push - buf no caso
    // encoding - como a informação está codificada 
    // callback é uma função que a stream de escrita precisa chamar quando ela terminou o que precisava fazer.
    _write(chunk, incoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}


new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())
// enquanto está lendo a stream, já vai escrevendo no terminal

// Aqui podemos verificar que já temos acesso aos números antes da contagem estar totalmente finalizada.

// OneToHundredStream - Stream de leitura só conseguimos ler dados dela
// MultiplyByTenStream - Stream de escrita só conseguimos escrever dados para ela
// InverseNumberStream - Stream de transformação obrigatoriamente precisa ler dados de um lugar e escrever dados pra outro lugar.
// Ou seja, é uma stream utilizada para comunicação entre streams