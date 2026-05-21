import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuração do teste de estresse
export const options = {
  vus: 20,          // 20 usuários simultâneos
  duration: '10s',  // duração de 10 segundos
  thresholds: {
    http_req_failed: ['rate<0.01'], // O teste falha se mais de 1% das requisições derem erro
    http_req_duration: ['p(95)<500'], // 95% das requisições devem responder em menos de 500ms
  },
};

export default function () {
  // 1. Testa a rota de Health
  const resHealth = http.get('http://localhost:3000/health');
  check(resHealth, {
    'status é 200 (Health)': (r) => r.status === 200,
  });

  sleep(0.5); // Pausa de 500ms entre as requisições de cada usuário

  // 2. Testa a rota de Users
  const resUsers = http.get('http://localhost:3000/users');
  check(resUsers, {
    'status é 200 (Users)': (r) => r.status === 200,
    'retornou array de usuários': (r) => r.json().length === 2,
  });

  sleep(0.5);
}