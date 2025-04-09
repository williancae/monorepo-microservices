#!/usr/bin/env node

/**
 * Script para executar determinados serviços em paralelo usando concurrently.
 *
 * Exemplo de uso:
 *   node scripts/serveServices.js api workers
 * ou
 *   npm run custom:start -- api workers
 *
 * Cada serviço mapeado abaixo corresponde a um script do seu package.json
 * que inicia aquele serviço individualmente (por ex. "api", "workers", etc.).
 */

const { spawn } = require('child_process');

// Mapeie aqui seus serviços e os comandos associados (definidos no package.json)
const availableServices = {
  api: 'npm run api',
  workers: 'npm run workers',
  gateways: 'npm run gateways',
};

// -----------------------------------------------------------------------
// 1) Captura os nomes dos serviços passados após o script
//    Exemplo: `node serveServices.js api workers` => ["api", "workers"]
// -----------------------------------------------------------------------
const servicesRequested = process.argv.slice(2);

// Se nenhum serviço foi informado, mostra ajuda e sai.
if (!servicesRequested.length) {
  console.log('Nenhum serviço especificado.');
  console.log('Uso: node serveServices.js [service1] [service2] ...');
  console.log(
    'Serviços disponíveis:',
    Object.keys(availableServices).join(', ')
  );
  process.exit(1);
}

// -----------------------------------------------------------------------
// 2) Monta a lista de comandos e a lista de nomes (para exibir prefixos)
// -----------------------------------------------------------------------
const recognizedServices = [];
const commands = [];

for (const srv of servicesRequested) {
  if (availableServices[srv]) {
    recognizedServices.push(srv);
    commands.push(availableServices[srv]);
  } else {
    console.log(`Serviço "${srv}" não é reconhecido. Será ignorado.`);
  }
}

// Se não houver nenhum serviço válido, sai.
if (!recognizedServices.length) {
  console.log('Nenhum serviço válido foi solicitado. Encerrando...');
  process.exit(1);
}

// -----------------------------------------------------------------------
// 3) Executa o concurrently com:
//    - --names => nomes lógicos dos serviços (ex.: "api,workers")
//    - --prefix => formata o prefixo que aparece nos logs (ex.: "[API]")
//    - Lista de comandos
// -----------------------------------------------------------------------
const concurrentlyArgs = [
  'concurrently',
  '--names',
  recognizedServices.join(','), // ex: "api,workers"
  '--prefix',
  '[{name}]', // Assim, o log fica "[API]" ou "[WORKERS]"
  ...commands, // ex: "npm run api", "npm run workers"
];

console.log('Iniciando serviços:', recognizedServices.join(', '));
console.log('Comandos:', commands);

// Cria um processo filho que roda o concurrently
const child = spawn('npx', concurrentlyArgs, { stdio: 'inherit' });

// Quando o concurrently encerrar, repassa o código de saída para este processo
child.on('close', (code) => {
  process.exit(code);
});
