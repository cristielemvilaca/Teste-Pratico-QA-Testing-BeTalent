# Projeto automação WEB com Cypress do site Sauce Demo 

Projeto de automação web com Cypress do site Sauce Demo, nesta automação foi realizado apenas a automação de login, configurado o videos e screenshots

# Pré requisitos para utilizar o projeto

SO
---
* macOS 10.9 e superior (Intel ou Apple Silicon 64-bit (x64 ou arm64))
* Linux Ubuntu 20.04 e superior, Fedora 21 e Debian 8 (x86_64 ou Arm 64 bits (x64 ou arm64))
* Windows 10 e superior (apenas 64 bits)

Hardware
---

* Mínimo de 2 CPUs para rodar o Cypress
* 1 CPU adicional se a gravação de vídeo estiver ativada


Memória
---
* Mínimo de 4 GB, 8 GB + para execuções de teste mais longos.

NodeJS
---
* Node.js 18.x
* Node.js 20.x ou superior

IDE
---
* VSCODE
* Qualquer outra de sua preferência

Links de instalação
---
* NodeJs - https://nodejs.org/en/download
* VSCODE - https://code.visualstudio.com/download

Documentos de referência
---
* Cypress:
* https://www.cypress.io/
* https://example.cypress.io/commands/actions
* https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Folder-Structure

Configurando ambiente para começar a usar o Cypress
---
Agora iremos configurar o ambiente para iniciarmos nosso projeto com o Cypress. Para isso é necessário realizar o download da IDE do VSCODE

1. Instalação inicial

* Faça o download o NodeJS e instale a versão compatível com seu Sistema Operacional;
* Faça o download e instale o VSCODE ou outra IDE de sua preferência;

2. Instale o Cypress
```
npm install cypress --save-dev
```

3. Executando o cypress
```
npx cypress open
```
4. Modo headless:
```
npx cypress run
```
