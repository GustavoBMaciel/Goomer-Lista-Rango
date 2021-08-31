# Goomer-Lista-Rango
<center><h1> API RESTful capaz de gerenciar os restaurantes e os produtos do seu cardápio <h1></center>
  
## Considerações 
Por ser a primeira API REST que fiz sem utilizar nenhum ORM, eu não sabia por onde começar. Fiquei alguns dias pesquisando e testando como fazer a conexão com o banco de dados. A primeira tentativa foi utilizando typescript, que já estou acostumado a mexer por trabalhar com ele em uma outra API, mas não tive sucesso, decidi então fazer apenas utilizando javascript e depois de muitas tentativas finalmente consegui conectar com o banco e criar a primeira tabela. Outro problema que enfrentei foi a criação das “migrations”, pelo que percebi, sem ORM não existe migrations, então deixei tudo em apenas um arquivo de criação.
Na parte dos controllers, a dificuldade maior foi executar dois INSERTS um após o outros, pois criei uma estrutura com chave estrangeira (foi o modo mais fácil que achei). Nos controllers de criação não consegui retornar os dados cadastrados, tentei pegar pela variável de retorno, mas sempre vinha vazia. 
Após a API estar “pronta” pensei em separar os métodos dos controllers em alguns services, seguindo a orientação SOLID, porem tive alguns erros, e como o prazo já estava bem em cima decidi não mexer. 
Tive um pouco de dificuldade em retornar o erro da restrição de horários. Gostaria que o erro retornasse na rota e não apenas no console. 

Em resumo foi um desafio legal de desenvolver. Aprendi muito com as dificuldades que tive, aprendi como funciona um ORM por trás dos panos, como os models funcionam. Valeu a pena todo aprendizado que tive. Agradeço a oportunidade.

## Documentação

> Após download do repositório, renomeie o arquivo <strong>.env.example</strong>. Nesse arquivo voce deve informar os dados de conexão com o seu banco de dados 
> <strong>PostgreSQL</strong>. Feito isso, abra o terminal e execute o comando <strong>yarn</strong> para baixar todas as dependencias do projeto.

### Criando a estrutura do banco de dados

> Com o banco de dados criado, e o arquivo <strong>.env</strong> configurado voce deve abrir o terminal e rodar o comando <strong>yarn db</strong>.
> Esse comando irá criar as tabelas do banco de dados.

### Executar a API

> Para executar a API use o comando <strong>yarn dev</strong>.
  
### Cadastrar um restaurante

> Para cadastrar um restaurante utilize a rota <strong>POST /restaurantes</strong>. Exemplo do body:
```
file: File,
nome: Teste,
endereco: TesteEnd,
horarios: {"dsDiaSemana": "segunda", "dtHorarioINI": "21:30", "dtHorarioFIM": "21:45"},{"dsDiaSemana": "terça", "dtHorarioINI": "21:30", "dtHorarioFIM": "21:45"},{"dsDiaSemana": "quarta", "dtHorarioINI": "21:30", "dtHorarioFIM": "21:45"}
```
### Consultar todos os restaurantes
> Para consultar todos os restaurantes cadastrados utilize a rota <strong>GET /restaurantes</strong>
  
### Consultar um restaurante especifico
> Para consultar um restaurante cadastrado utilize a rota <strong>GET /restaurantes/<id_Restaurante></strong>
  
### Atualizar dados de um restaurante especifico
> Para atualizar os dados de um restaurante cadastrado utilize a rota <strong>PUT /restaurantes/<id_Restaurante></strong>. Exemlo do body:
  ```
file: File,
nome: Teste,
endereco: TesteEnd,
horarios: {"dsDiaSemana": "segunda", "dtHorarioINI": "21:30", "dtHorarioFIM": "21:45"},{"dsDiaSemana": "terça", "dtHorarioINI": "21:30", "dtHorarioFIM": "21:45"},{"dsDiaSemana": "quarta", "dtHorarioINI": "21:30", "dtHorarioFIM": "21:45"}
```
### Deletar um restaurante especifico
> Para deletar um restaurante cadastrado utilize a rota <strong>DELETE /restaurantes/<id_Restaurante></strong>
  
### Cadastrar um produto

> Para cadastrar um produto utilize a rota <strong>POST /produtos</strong>. Exemplo do body:
```
file: File,
nome: Teste,
preco: 1.20,
categoria: salgado,
nomePromocao: TestePromocao || null,
diaSemanaPromocao: Segunda || null,
dtHorarioINIPromocao: 12:00 || null,
dtHorarioFIMPromocao: 12:30 || null,
precoPromocao: 1.00 || null
```
### Consultar todos os produtos
> Para consultar todos os produtos cadastrados utilize a rota <strong>GET /produtos</strong>
  
### Consultar um produto especifico
> Para consultar um produtos cadastrado utilize a rota <strong>GET /produtos/<id_Produto></strong>
  
### Atualizar dados de um produto especifico
> Para atualizar os dados de um produto cadastrado utilize a rota <strong>PUT /produtos/<id_Produto></strong>. Exemlo do body:
```
file: File,
nome: Teste,
preco: 1.20,
categoria: salgado,
nomePromocao: TestePromocao || null,
diaSemanaPromocao: Segunda || null,
dtHorarioINIPromocao: 12:00 || null,
dtHorarioFIMPromocao: 12:30 || null,
precoPromocao: 1.00 || null
```
### Deletar um produto especifico
> Para deletar um produto cadastrado utilize a rota <strong>DELETE /produtos/<id_Restaurante></strong>
 
