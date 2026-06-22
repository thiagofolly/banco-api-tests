const request = require('supertest');
const { expect } = require('chai');

describe('Transferências', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferencia for maior ou igual que 10 reais', async () => {
            const loginResponse = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'julio.lima',
                    senha: '123456'
                });

            const token = loginResponse.body.token;

            const response = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 10,
                    token: ""
                });

            expect(response.status).to.equal(201);
        })
        it('Deve retornar sucesso com 422 quando o valor da transferencia for menor que 10 reais', async () => {

        })
    })
})