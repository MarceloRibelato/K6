import http from 'k6/http';
import { check, sleep } from 'k6';
import { login } from './token.js'; // Importando a função de login do arquivo token.js

// Função para gerar nome aleatório
function getRandomName() {
  const firstNames = ['John', 'Jane', 'Paul', 'Anna', 'Mike', 'Sarah', 'David', 'Emily', 'Chris', 'Laura'];
  const lastNames = ['Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${firstName} ${lastName}`;
}

// Configuração de carga de usuários
export const options = {
  scenarios: {
    constant_load: {
      executor: 'constant-vus',
      //Diminui o numero de vus e a duration pois a api pode me bloquear
      vus: 2, // Número de VUs
      duration: '1m', // Duração do teste
    },
  },
};

// Função principal do teste
export default function () {
  // Recuperando o token antes de cada execução
  const token = login(); // Chama a função de login

  // Gerando um nome aleatório
  const randomName = getRandomName();

  // Criando o payload da requisição
  const payload = JSON.stringify({
    name: randomName,
    job: 'Tester',
  });

  // Configurando o cabeçalho com o token
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  // Executando a requisição POST
  const res = http.post('https://reqres.in/api/users', payload, params);

  // Validando a resposta da requisição
  check(res, {
    'success login': (r) => r.status === 201,
    'response time < 2s': (r) => r.timings.duration < 2000,
  });

  // Pausa entre as requisições
  sleep(0.01);
}
