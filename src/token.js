// login.js
import http from 'k6/http';
import { check } from 'k6';

// Função para realizar o login e obter o token
export function login() {
    const loginPayload = JSON.stringify({
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
    });

    const loginParams = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Fazendo a requisição POST para login
    const res = http.post('https://reqres.in/api/login', loginPayload, loginParams);

    // Verificando se o status da resposta foi 200 (OK)
    check(res, {
        'login successful': (r) => r.status === 200,
    });

    // Retorna o token se o login for bem-sucedido
    return res.json('token');
}
