const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');
const postTransferencias = require('../fixtures/postTransferencias.json');

describe('Transferências', () => {
    let token

    beforeEach(async () => {
        token = await obterToken('julio.lima', '123456');
    })

    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferencia for maior ou igual que 10 reais', async () => {
            const bodyTransferencias = { ...postTransferencias }

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias);

            expect(response.status).to.equal(201);
        })
        it('Deve retornar sucesso com 422 quando o valor da transferencia for menor que 10 reais', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 9.99;

            const response = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias);

            expect(response.status).to.equal(422);
        })
    })

    describe('GET /transferencias{id}', () => {
        it('Deve retornar sucesso com 200 e dados iguais ao registro de transferencia contido no banco de dados quando o ID for válido', async () => {
            const response = await request(process.env.BASE_URL)
                .get('/transferencias/1')
                .set('Authorization', `Bearer ${token}`)
                
            expect(response.status).to.equal(200)
            expect(response.body.id).to.equal(1)
            expect(response.body.id).to.be.a('number')
            expect(response.body.conta_origem_id).to.equal(1)
            expect(response.body.conta_origem_id).to.be.a('number')
            expect(response.body.conta_destino_id).to.equal(2)
            expect(response.body.conta_destino_id).to.be.a('number')
            expect(response.body.valor).to.equal(40)
            expect(response.body.valor).to.be.a('number')
        })
    })

    describe('GET /transferencias', () => {
        it('Deve retornar 10 elementos na paginação quando informar limite de 10 registros', async () => {
            const response = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Authorization', `Bearer ${token}`)
                
            expect(response.status).to.equal(200)
            expect(response.body.limit).to.equal(10)
            expect(response.body.transferencias).to.have.lengthOf(10)
        })
    })
})