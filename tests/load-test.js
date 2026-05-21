import http from 'k6/http';
import { check, sleep } from 'k6';

// Pega a URL do ambiente ou usa o padrão da API local
const BASE_URL = __ENV.TARGET_URL || 'http://localhost:3000';

export const options = {
  vus: 20,
  duration: '10s',
  thresholds: {
    http_req_failed: ['rate<0.01'], 
    http_req_duration: ['p(95)<500'], 
  },
};

export default function () {
  // Agora os testes apontam dinamicamente para a BASE_URL (Que será o Kong no CI)
  const resHealth = http.get(`${BASE_URL}/health`);
  check(resHealth, {
    'status é 200 (Health)': (r) => r.status === 200,
  });

  sleep(0.5);

  const resUsers = http.get(`${BASE_URL}/users`);
  check(resUsers, {
    'status é 200 (Users)': (r) => r.status === 200,
    'retornou array de usuários': (r) => r.json().length === 2,
  });

  sleep(0.5);
}