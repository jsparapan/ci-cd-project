const request = require('supertest');
const app = require('./app');

describe('Testes de Integração da API', () => {
  
  test('Deve retornar 200 OK na rota de Health Check', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('UP');
  });

  test('Deve retornar a lista de usuários corretamente', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe('DevOps Engineer');
  });
  
});