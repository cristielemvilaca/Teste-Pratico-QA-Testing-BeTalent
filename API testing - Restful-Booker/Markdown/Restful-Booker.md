### Caso de Teste: Gerar Token de Autenticação

#### Descrição

- Este caso de teste verifica se o endpoint `Gerar token de Autenticacao` retorna os dados esperados para a requisição `POST`.


### Detalhes da Requisição

#### Método HTTP
`POST`

#### URL
`https://restful-booker.herokuapp.com/auth`

#### Headers
| Nome          | Valor                       |
|---------------|-----------------------------|
| Content-Type  | application/json            |



#### Body da Requisição
```json
{
  "username": "admin",
  "password": "password123"
}
```

#### Validações (Scripts de Testes no Postman)

**1. Valida se o Status Code retornou 200 OK**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
```

**2. Valida se o token foi retornado**
```javascript
pm.test("Token is present", function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property("token");
});
```

**3. Salva o token em uma variável de ambiente**
```javascript
var jsonData = pm.response.json();
pm.environment.set("authToken", jsonData.token);
```
----

### Caso de Teste: Gerar Token - Credencial Invalida

#### Descrição

- Este caso de teste verifica se o endpoint `Gerar Token - Credencial Invalida` retorna os dados esperados para a requisição `POST`.



### Detalhes da Requisição

#### Método HTTP
`POST`

#### URL
`https://restful-booker.herokuapp.com/auth`

#### Headers
| Nome          | Valor                       |
|---------------|-----------------------------|
| Content-Type  | application/json            |



#### Body da Requisição
```json
{
  "username": "invalid_user",
  "password": "wrong_password"
}
```

#### Validações (Scripts de Testes no Postman)

**1. Valida status code 200 (mas não gera o token)**
```javascript
pm.test("Verifica se o status é 200", function () {
    pm.response.to.have.status(200);
});
```

**2. Testa se a resposta contém uma mensagem de erro apropriada**
```javascript
pm.test("Verifica mensagem de erro na resposta", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("reason");
    pm.expect(jsonData.reason).to.be.a("string").that.is.not.empty;
});
```

**3. Testa se o token não é gerado**
```javascript
pm.test("Token não deve ser gerado", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.not.have.property("token");
});
```
---
### Caso de Teste: Criar Reserva

#### Descrição

- Este caso de teste verifica se o endpoint `Criar Reserva` retorna os dados esperados para a requisição `POST`.



### Detalhes da Requisição

#### Método HTTP
`POST`

#### URL
`https://restful-booker.herokuapp.com/booking`

#### Headers
| Nome          | Valor                       |
|---------------|-----------------------------|
| Content-Type  | application/json            |



#### Body da Requisição
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "totalprice": 123,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2024-11-25",
    "checkout": "2024-11-30"
  },
  "additionalneeds": "Breakfast"
}
```

#### Validações (Scripts de Testes no Postman)

**1. Valida status code 200**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
```

**2. Testa se a resposta contém um objeto de reserva**
```javascript
pm.test("Response contains booking ID", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("bookingid").that.is.a("number");
    pm.expect(jsonData).to.have.property("booking").that.is.an("object");
});
```

**3. Testa se os dados da reserva estão corretos**
```javascript
pm.test("Booking details match request", function () {
    var jsonData = pm.response.json();
    var requestData = pm.request.body.raw ? JSON.parse(pm.request.body.raw) : {};
    pm.expect(jsonData.booking.firstname).to.eql(requestData.firstname);
    pm.expect(jsonData.booking.lastname).to.eql(requestData.lastname);
    pm.expect(jsonData.booking.totalprice).to.eql(requestData.totalprice);
    pm.expect(jsonData.booking.depositpaid).to.eql(requestData.depositpaid);
    pm.expect(jsonData.booking.bookingdates.checkin).to.eql(requestData.bookingdates.checkin);
    pm.expect(jsonData.booking.bookingdates.checkout).to.eql(requestData.bookingdates.checkout);
    pm.expect(jsonData.booking.additionalneeds).to.eql(requestData.additionalneeds);
});
```
----

### Caso de Teste: Busca Reserva Especifica

#### Descrição

- Este caso de teste verifica se o endpoint `Busca Reserva Especifica` retorna os dados esperados para a requisição `GET`.



#### Passos para a execução do teste

-  Executar o endpoint `Lista Todas as Reservas`, no resultado da listagem, copiar um ID válido para utilizar no teste abaixo.


### Detalhes da Requisição

#### Método HTTP
`GET`

#### URL
`https://restful-booker.herokuapp.com/booking/566`

#### Headers
| Nome          | Valor                       |
|---------------|-----------------------------|
| Content-Type  | application/json            |



#### Validações (Scripts de Testes no Postman)

**1. Valida status code 200 OK**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

```

**2. Testa se os dados retornados contêm as propriedades esperadas**
```javascript
pm.test("Response has all expected properties", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("firstname").that.is.a("string");
    pm.expect(jsonData).to.have.property("lastname").that.is.a("string");
    pm.expect(jsonData).to.have.property("totalprice").that.is.a("number");
    pm.expect(jsonData).to.have.property("depositpaid").that.is.a("boolean");
    pm.expect(jsonData).to.have.property("bookingdates").that.is.an("object");
    pm.expect(jsonData.bookingdates).to.have.property("checkin").that.is.a("string");
    pm.expect(jsonData.bookingdates).to.have.property("checkout").that.is.a("string");
    pm.expect(jsonData).to.have.property("additionalneeds").that.is.a("string");
});

```

**3. Testa se os valores retornados são válidos (opcional)**
```javascript
pm.test("Values are valid", function () {
    var jsonData = pm.response.json();
    var dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Valida formato de data YYYY-MM-DD 
    pm.expect(jsonData.firstname).to.not.be.empty;
    pm.expect(jsonData.lastname).to.not.be.empty;
    pm.expect(jsonData.bookingdates.checkin).to.match(dateRegex);
    pm.expect(jsonData.bookingdates.checkout).to.match(dateRegex);
});
```
----

### Caso de Teste: Busca Reserva Especifica - ID Inexistente

#### Descrição

- Este caso de teste verifica se o endpoint `Busca Reserva Especifica` retorna os dados esperados para a requisição `GET`.


### Detalhes da Requisição


#### Método HTTP
`GET`

#### URL
`https://restful-booker.herokuapp.com/booking/999`

#### Headers
| Nome          | Valor                       |
|---------------|-----------------------------|
| Content-Type  | application/json            |



#### Validações (Scripts de Testes no Postman)

**1. Testa ID inexistente**
```javascript
pm.test("Status code is 404 for non-existent booking", function () {
    pm.response.to.have.status(404);
});

```
----
### Caso de Teste: Lista Todas as Reservas

#### Descrição

- Este caso de teste verifica se o endpoint `Lista Todas as Reservas` retorna os dados esperados para a requisição `GET`.


### Detalhes da Requisição

#### Método HTTP
`GET`

#### URL
`https://restful-booker.herokuapp.com/booking`

#### Headers
| Nome          | Valor                       |
|---------------|-----------------------------|
| Content-Type  | application/json            |



#### Validações (Scripts de Testes no Postman)

**1. Valida Status Code  200 OK**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

```

**2. Testa se a resposta contém uma lista de reservas**
```javascript
pm.test("Response is an array", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an("array");
});

```

**3. Testa se cada item da lista possui as propriedades esperadas**
```javascript
pm.test("Each booking has expected properties", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.length).to.be.greaterThan(0); // Garante que existe pelo menos uma reserva

    jsonData.forEach(function (booking) {
        pm.expect(booking).to.have.property("bookingid").that.is.a("number");
    });
});
```
----

### Caso de Teste: Busca Reserva por bookingid

#### Descrição

- Este caso de teste verifica se o endpoint `Busca Reserva por bookingid` retorna os dados esperados para a requisição `GET`.


### Detalhes da Requisição

#### Método HTTP
`GET`

#### URL
`https://restful-booker.herokuapp.com/booking?bookingid=566`

#### Headers
| Nome          | Valor                       |
|---------------|-----------------------------|
| Content-Type  | application/json            |

#### Params
| Key          | Value                     |
|---------------|-----------------------------|
| bookingid  | 566           |



#### Validações (Scripts de Testes no Postman)

**1. Valida Id**
```javascript
pm.test("Search array by bookingid", function () {
    // id para a busca
    var id = 566; 

    var responseJson = pm.response.json();

    // var para verificar se o nome foi encontrado
    var isId = false;

    //pesquisando id no array
    responseJson.forEach(function(booking) {
        if (booking.bookingid && booking.bookingid === id) {
            isId = true;
        }
    });

    // Teste para verificar se o id foi encontrado
    pm.expect(isId).to.be.true;
});
```
----
### Caso de Teste: Busca por Nome

#### Descrição

- Este caso de teste verifica se o endpoint `Busca por Nome` retorna os dados esperados para a requisição `GET`.


### Detalhes da Requisição

#### Método HTTP
`GET`

#### URL
`https://restful-booker.herokuapp.com/booking?firstname=Josh`

#### Headers
| Nome          | Valor                       |
|---------------|-----------------------------|
| Content-Type  | application/json            |

#### Params
| Key          | Value                     |
|---------------|-----------------------------|
| firstname  | Josh         |



#### Validações (Scripts de Testes no Postman)

**1. Valida por Nome**
```javascript
pm.test("Search array by fistname", function () {
    // nome para a busca
    var name = 999; 

    var responseJson = pm.response.json();

    // var para verificar se o nome foi encontrado
    var isName = false;

    //pesqwuisando id no array
    responseJson.forEach(function(booking) {
        if (booking.firstnanme && booking.firstname === name) {
            isName = true;
        }
    });

    // Teste para verificar se o nome foi encontrado
    pm.expect(isName).to.be.true;
});
```
----

### Caso de Teste: busca por Data de Check-In

#### Descrição

- Este caso de teste verifica se o endpoint `busca por Data de Check-In` retorna os dados esperados para a requisição `GET`.


### Detalhes da Requisição

#### Método HTTP
`GET`

#### URL
`https://restful-booker.herokuapp.com/booking?bookingdates=2024-11-25`

#### Headers
| Nome          | Valor                       |
|---------------|-----------------------------|
| Content-Type  | application/json            |

#### Params
| Key          | Value                     |
|---------------|-----------------------------|
| bookingdates  | 2024-11-25        |



#### Validações (Scripts de Testes no Postman)

**1. Valida por Data Check-In**
```javascript
pm.test("Search array by Check-In Date", function () {

    var checkinDate = "2024-11-25"; 

    var responseJson = pm.response.json();

    var isValid = false;

    responseJson.forEach(function(booking) {
        if (booking.bookingdates.checkin && booking.bookingdates.checkin === checkinDate) {
            isValid = true;
        }
    });

    // Teste para verificar se o nome foi encontrado
    pm.expect(isValid).to.be.true;
});
```
----

### Caso de Teste: Busca por Data de Check-out

#### Descrição

- Este caso de teste verifica se o endpoint `Busca por Data de Check-out` retorna os dados esperados para a requisição `GET`.


### Detalhes da Requisição

#### Método HTTP
`GET`

#### URL
`https://restful-booker.herokuapp.com/booking?bookingdates=2024-11-25`

#### Headers
| Nome          | Valor                       |
|---------------|-----------------------------|
| Content-Type  | application/json            |

#### Params
| Key           | Value                       |
|---------------|-----------------------------|
| bookingdates  | 2024-11-25                  |



#### Validações (Scripts de Testes no Postman)

**1. Valida por Data de Check-out**
```javascript
pm.test("Search array by Check-In Date", function () {

    var checkoutDate = "2024-11-25"; 

    var responseJson = pm.response.json();

    var isValid = false;

    responseJson.forEach(function(booking) {
        if (booking.bookingdates.checkin && booking.bookingdates.checkin === checkoutDate) {
            isValid = true;
        }
    });

    // Teste para verificar se o nome foi encontrado
    pm.expect(isValid).to.be.true;
});
```
----

### Caso de Teste: Atualizar Reserva Existente

#### Descrição

- Este caso de teste verifica se o endpoint `Atualizar Reserva Existente` retorna os dados esperados para a requisição `PUT`.

#### Passos para a execução do teste

- Executar o endpoint `Gerar Token`, no resultado do endpoint, copiar o token.
- Com o token copiado, abra o Cookies do postman, clique em Manage Cookies, preencher com o link: restful-booker.herokuapp e clicar em Add domain e preecher o cookies com o token gerado.

### Detalhes da Requisição

#### Método HTTP
`PUT`

#### URL
`https://restful-booker.herokuapp.com/booking/1142`

#### Headers
| Nome          | Valor                       |
|---------------|-----------------------------|
| Content-Type  | application/json            |



#### Body da Requisição
```json
{
  "firstname": "Jane",
  "lastname": "Smith",
  "totalprice": 200,
  "depositpaid": false,
  "bookingdates": {
    "checkin": "2024-12-01",
    "checkout": "2024-12-10"
  },
  "additionalneeds": "Lunch"
}
```

#### Validações (Scripts de Testes no Postman)

**1. Testa se a resposta tem o status 200**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
```

**2. Testa se a resposta contém os dados atualizados**
```javascript
pm.test("Response contains updated booking details", function () {
    var jsonData = pm.response.json();
    var requestData = pm.request.body.raw ? JSON.parse(pm.request.body.raw) : {};
    
    pm.expect(jsonData.firstname).to.eql(requestData.firstname);
    pm.expect(jsonData.lastname).to.eql(requestData.lastname);
    pm.expect(jsonData.totalprice).to.eql(requestData.totalprice);
    pm.expect(jsonData.depositpaid).to.eql(requestData.depositpaid);
    pm.expect(jsonData.bookingdates.checkin).to.eql(requestData.bookingdates.checkin);
    pm.expect(jsonData.bookingdates.checkout).to.eql(requestData.bookingdates.checkout);
    pm.expect(jsonData.additionalneeds).to.eql(requestData.additionalneeds);
});

```
----
### Caso de Teste: Atualizar Reserva Existente - Com Token Invalido

#### Descrição

- Este caso de teste verifica se o endpoint `Atualizar Reserva Existente - Com Token Invalido` retorna os dados esperados para a requisição `PUT`.

#### Passos para a execução do teste

- Executar o endpoint `Gerar Token`, no resultado do endpoint, copiar o token.
- Com o token copiado, abra o Cookies do postman, clique em Manage Cookies, preencher com o link: restful-booker.herokuapp e clicar em Add domain e preecher o cookies com o token gerado.

### Detalhes da Requisição

#### Método HTTP
`PUT`

#### URL
`https://restful-booker.herokuapp.com/booking/156`

#### Headers
| Nome          | Valor                       |
|---------------|-----------------------------|
| Content-Type  | application/json            |



#### Body da Requisição
```json
{
  "firstname": "Jane",
  "lastname": "Smith",
  "totalprice": 200,
  "depositpaid": false,
  "bookingdates": {
    "checkin": "2024-12-01",
    "checkout": "2024-12-10"
  },
  "additionalneeds": "Lunch"
}
```

#### Validações (Scripts de Testes no Postman)

**1. Validar falha ao atualizar com token inválido**
```javascript
pm.test("Status code is 403 for invalid token", function () {
    pm.response.to.have.status(403);
});
```
----

### Caso de Teste: Atualizar Reserva Existente - Credencial Invalida

#### Descrição

- Este caso de teste verifica se o endpoint `Atualizar Reserva Existente - Credencial Invalida` retorna os dados esperados para a requisição `PUT`.

#### Passos para a execução do teste

- Executar o endpoint `Gerar Token`, no resultado do endpoint, copiar o token.
- Com o token copiado, abra o Cookies do postman, clique em Manage Cookies, preencher com o link: restful-booker.herokuapp e clicar em Add domain e preecher o cookies com o token gerado.

### Detalhes da Requisição

#### Método HTTP
`PATCH`

#### URL
`https://restful-booker.herokuapp.com/booking/1142`

#### Headers
| Nome          | Valor                       |
|---------------|-----------------------------|
| Content-Type  | application/json            |



#### Body da Requisição
```json
{
  "firstname": "Alice",
  "lastname": "Johnson"
}
```

#### Validações (Scripts de Testes no Postman)

**1. Atualizar Reserva Existente - Credencial Invalida**
```javascript
pm.test("Fails with invalid token", function () {
    pm.response.to.have.status(403);
});
```
----

### Caso de Teste: Deletando Reserva

#### Descrição

- Este caso de teste verifica se o endpoint `Deletando Reserva` retorna os dados esperados para a requisição `DEL`.

#### Passos para a execução do teste

- Executar o endpoint `Gerar Token`, no resultado do endpoint, copiar o token.
- Com o token copiado, abra o Cookies do postman, clique em Manage Cookies, preencher com o link: restful-booker.herokuapp e clicar em Add domain e preecher o cookies com o token gerado.

### Detalhes da Requisição

#### Método HTTP
`DEL`

#### URL
`https://restful-booker.herokuapp.com/booking/156`

#### Headers
| Nome          | Valor                       |
|---------------|-----------------------------|
| Content-Type  | application/json            |



#### Validações (Scripts de Testes no Postman)

**1. Testa se o status da resposta é 201 indicando exclusão com sucesso**
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});
```
**2. Teste para confirmar exclusão**
```javascript
pm.test("Response is empty", function () {
    pm.expect(pm.response.text()).to.be.empty;
});
```
----

### Resultado Obtidos
 - Os caso de teste do POST, tiveram resultados satisfatórios, obtendo o resultado esperado.

 - Os casos de uso do GET com reserva especifica, reserva especifica com ID inexistente e Lista reserva, tiveram os resultados como esperado.

- Os casos de uso do PUT, PATCH e DEL  tiveram resultado satisfatório



### Bugs encontrado
 - Os caso de teste Busca nome e data de check-in e check-out, teve como o resultado Fail, pois observei que na API não tinha este endpoint criado para este tipo de teste, mas criei os cenários mesmo assim.

 ### Dificuldade encontradas
 - A dificuldade que tive foi em relação ao cookies, pois na API disponibilizada não estava identificando, que era necessário ultilizar autenticação.


