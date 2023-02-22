// Buffer é uma representação de um espaço na memória do computador. É usado para transitar dados de uma maneira muito rápida,
// pois, utiliza linguagem de baixo nível, mais próxima da linguagem do computador.

const buf = Buffer.from('Ok')

console.log(buf)
// Aqui o sistema lê ok como 4f 6b, que é an forma hexadecimal (0123456789ABCDEF) de escrever Ok