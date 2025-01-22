### Análise de Teste de Performance com k6

Este documento apresenta a análise dos resultados obtidos ao executar um teste de performance utilizando a ferramenta **k6**. O teste foi realizado com o objetivo de avaliar a estabilidade e a capacidade de resposta de um servidor ao realizar requisições HTTP.

### Tambem pode ser utilizado um grafana para visualizar os dados graficamente 

## Resultados do Teste

### 1. **Taxa de Sucesso de Checagem**
- **99.61%** (261 de 262): A maioria das requisições passou nas verificações (status de resposta, etc.), com apenas uma falha. Esse é um bom indicativo de que o servidor está atendendo a maioria das expectativas de resposta.

### 2. **Dados Enviados e Recebidos**
- **Dados Recebidos**: 114 kB (1.9 kB/s) – A quantidade de dados recebidos é relativamente baixa, indicando que as respostas não são muito grandes.
- **Dados Enviados**: 22 kB (361 B/s) – A quantidade de dados enviados também é baixa, o que é esperado para um teste de simples requisições de API.

### 3. **Tempo de Bloqueio de Requisição**
- **Tempo Médio**: 3.75 ms – O tempo médio em que as requisições ficam bloqueadas antes de serem enviadas é muito baixo, o que indica uma boa capacidade do servidor em iniciar as conexões rapidamente.
- **Máximo**: 311.44 ms – No entanto, houve picos de latência, com algumas requisições apresentando tempos de bloqueio maiores.

### 4. **Tempo de Conexão**
- **Tempo Médio de Conexão**: 1.63 ms – O tempo necessário para estabelecer uma conexão com o servidor é muito baixo, o que é bom para a performance geral.
- **Máximo**: 150.34 ms – Apesar da média ser baixa, algumas conexões foram mais lentas, o que pode ser investigado.

### 5. **Tempo de Resposta das Requisições**
- **Tempo Médio de Resposta**: 686.31 ms – O tempo médio de resposta das requisições está dentro de uma faixa aceitável, mas ainda pode ser otimizado.
- **Percentis 90 e 95**: 776.91 ms e 780.12 ms, respectivamente. Isso significa que 90% das requisições levaram menos de 776 ms para responder.
- **Máximo**: 905.68 ms – O maior tempo de resposta observado foi de 905 ms, o que pode ser considerado uma latência excessiva em alguns cenários.

### 6. **Falhas de Requisição**
- **0.57%** (1 de 175): Houve uma falha de requisição entre 175 feitas. Esse número é baixo, mas ainda assim é relevante para investigar as causas dessa falha.

### 7. **Tempo de Recebimento e Envio**
- **Tempo Médio de Recebimento**: 291.11 µs – O tempo necessário para o cliente receber os dados é muito baixo.
- **Tempo Médio de Envio**: 443.15 µs – O tempo necessário para enviar dados também é eficiente, com um valor muito baixo.

### 8. **Tempo de Handshake TLS**
- **Tempo Médio de Handshake TLS**: 2.04 ms – A conexão segura (HTTPS) está sendo estabelecida rapidamente, com um tempo de handshake muito baixo.

### 9. **Tempo de Espera da Requisição**
- **Tempo Médio de Espera**: 685.57 ms – O tempo de espera entre o envio da requisição e a recepção da resposta é relativamente alto, o que pode ser uma área de melhoria.

### 10. **Total de Requisições e Iterações**
- **Total de Requisições**: 175 requisições – Este é o número total de requisições feitas durante o teste, o que está em linha com o número de iterações e usuários virtuais especificados.
- **Iterações**: 88 iterações – O número de iterações executadas no teste é 88, com uma taxa média de 1.45 iterações por segundo.

### 11. **Duração das Iterações**
- **Tempo Médio de Iteração**: 1.38s – O tempo médio necessário para completar uma iteração é de 1.38 segundos.
- **Percentis 90 e 95**: 1.56s e 1.57s, respectivamente. Para 90% das iterações, o tempo ficou abaixo de 1.56s.

### 12. **Usuários Virtuais (VUs)**
- **Número de VUs**: 2 usuários virtuais (VUs) – O teste foi configurado para usar 2 usuários simultâneos, o que significa que o servidor foi testado sob carga mínima.

## Conclusões e Pontos de Atenção

1. **Latência Geral**: O tempo médio de resposta está razoável, mas pode ser otimizado. A latência no **http_req_waiting** (tempo de espera) e as variações nos tempos de resposta podem indicar possíveis gargalos no servidor.
2. **Falhas de Requisição**: Embora a taxa de falhas seja baixa (0.57%), é importante investigar a falha única para garantir que não haja problemas não detectados durante o teste.
3. **Variações de Tempo de Resposta**: A variação significativa entre o tempo mínimo (80ms) e o máximo (905ms) sugere que há picos de latência em algumas requisições, possivelmente devido a sobrecarga do servidor ou problemas de rede.
4. **Eficiência na Comunicação**: O envio e recebimento de dados estão bem otimizados, com tempos baixos de envio (443.15µs) e recebimento (291.11µs).
5. **Conexão Segura**: O tempo de handshake TLS é bem rápido, o que é um bom sinal para a segurança da aplicação.
6. **Possível Oportunidade de Melhoria**: A maior oportunidade de melhoria está no tempo de espera (685.57ms), que pode ser reduzido com ajustes no backend ou infraestrutura.

## Recomendações

- Investigar as causas das falhas de requisição para garantir a robustez do sistema.
- Analisar os picos de latência observados no tempo de resposta máximo e tentar otimizá-los.
- Avaliar o impacto da carga do servidor em termos de escalabilidade, especialmente em casos de requisições simultâneas mais altas.
- Continuar monitorando a performance do sistema durante os testes com mais usuários virtuais para simular cenários de maior carga.

## Resultado do Teste

Aqui está a imagem que ilustra os resultados do teste:

![Resultado do Teste](resultado.png)
