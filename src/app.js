const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rota de Health Check (Passo essencial para monitoramento em CD)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Rota de exemplo de negócio
app.get('/users', (req, res) => {
  res.status(200).json([
    { id: 1, name: 'DevOps Engineer' },
    { id: 2, name: 'SRE Specialist' }
  ]);
});

// Evita que o servidor rode sozinho durante os testes automatizados
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`API rodando com sucesso na porta ${PORT}`);
  });
}

module.exports = app;