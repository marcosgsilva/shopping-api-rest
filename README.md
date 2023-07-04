# Aplicação é um carrinho de compras, segue abaixo o requisito para rodar a aplicação

 - NodeJS versão 16
 - MongoDB configurado
 - Rodar o docker-compose que está dentro do projeto de carrinho de compras, para rodar o postgres
 - Framework NestJS
 - Necessário ter configurado o docker par uso do Postgres
 - Necessário rodar yarn ou npm i para baixar as dependências do projeto


*Requisitos*
Node Versão 16
ter o mongo configurado localmente
Rodar o docker-compose no microserviço de carrinhos para subir o postgres
Necessário ter o docker instalado



*Microserviços:*<br />

   https://github.com/marcosgsilva/shopping-product

   https://github.com/marcosgsilva/shopping-cart

*Autenticação*
   Projeto autenticado para a parte do carrinho, ainda faltando adicionar autenticação para produtos.

*Testes Unitários*
   Testes realizados para microserviço de produtos
   ![Captura de tela de 2023-07-04 11-09-03](https://github.com/marcosgsilva/shopping-api-rest/assets/12539016/b7331e21-0a89-4cd6-a0ad-7b9114de43de)



 *Projeto se encontra com o swagger configurado*
  - localhost:3000/api

    ![Captura de tela de 2023-07-04 10-54-48](https://github.com/marcosgsilva/shopping-api-rest/assets/12539016/f45a1bd1-0fa9-4344-9fb9-1e10b026d6b5)


 Projeto também está com o insonmia dentro do diretório data



 Sobre as features
  - Autenticação funcionando para Carrinho de compras, não tive tempo de colocar para produtos
  - Testes unitários feitos em produtos para demonstrar meu conhecimento


  Apis/Microserviço
  RestApi: 
    * Autenticação necessária

    Registrar user  
    http://localhost:3000/auth/register - POST - 
    {
	  "username": "henri",
    "email": "henri@gmail.com",
    "password": "1234",
    "roles": "user"
    }

    * Login
    http://localhost:3001/auth/login - POST - 
    {
	  "username": "henri",
    "email": "henri@gmail.com",
    "password": "1234",
    "roles": "user"
     }

     * Pesquisar a permissão do user
     http://localhost:3001/auth/user {
        "userId": "649a049db7cb7d69be79a63b",
        "username": "henri",
        "roles": [
          "user"
        ]
      }
   


     * Chamadas Autenticadas
     http://localhost:3000/cart  - AddCart
     http://localhost:3000/cart/ - RemoveCart
     http://localhost:3000/cart/649a049db7cb7d69be79a63b - DeleteCart

     * Chamadas não autenticadas

     localhost:3000/store/products/649e340729e1bda83cf850f3 - GET -  Obter produto
     localhost:3000/store/products/6499f0d993309e1bb83a5e8a - DELETE - Delete produto
     localhost:3000/store/products/64a2baf4f759d3e8b9979002 - PUT - Alterar produto]
     localhost:3000/store/products?search=Miojo&category=Macarrão - GET -  Listar produto
     localhost:3000/store/products - POST -  Cadastrar Produto


  Produto: http://localhost:3002/store/products
  Carrinho de compras: http://localhost:3001/cart

