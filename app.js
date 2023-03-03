const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3200;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

// Configuração do handlebars
app.engine('hbs', exphbs.engine());
app.set('view engine', 'hbs');

// CRUD MENSALIDADE 

// Mostra a página para cadastro de mensalidade
app.get('/', (req, res) => {
    res.render('home', { layout: false });
})

app.get('/cadmensalidade', (req, res) => {
    res.render('post', {layout: false})
})
// Mostra a página com a lista de todas os mensalidades cadastradas
app.get('/mensalidades', (req, res) => {
    const sql = `SELECT * FROM mensalidade`;

    conn.query(sql, (err, data) => {
        if(err){
            console.log(err);
        }
        const listar = data;
        res.render('getmensalidade', {layout: false, listar});
    })
})

// Mostra os dados de um curso específico
app.get('/mensalidades/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM mensalidades WHERE id = ${id}`;

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        const listar = data[0];
        res.render('getMensalidadeId', {layout: false, listar} );
    })
})

// Mostra os dados de uma mensalidade específica para renderizar nos values dos input para editar os dados
app.get('/mensalidade/edit/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM mensalidade WHERE id = ${id}`;

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        const infos = data[0];
        res.render('updateMensalidade', {layout: false, infos})
    })
})

// Cadastra uma mensalidade no database
app.post('/cadastrar', (req, res) => {
    const nome = req.body.nome;
    const preco = req.body.preco;
    const quantAlunos = req.body.quantAlunos;
    const horario = req.body.horario;
    const descricao = req.body.descricao;
    const sql = `INSERT INTO mensalidade(nome, preco, quantAlunos, horario, descricao) VALUES('${nome}', ${preco}, ${quantAlunos}, '${horario}', '${descricao}')`;

    conn.query(sql, (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/mensalidade');
    })
})

// Atualiza os dados de um mensalidade
app.post('/updateMensalidade', (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const preco = req.body.preco;
    const quantAlunos = req.body.quantAlunos;
    const horario = req.body.horario;
    const descricao = req.body.descricao;
    const sql = `UPDATE mensalidade SET nome = '${nome}', preco = ${preco}, quantAlunos = ${quantAlunos}, horario = '${cargaHoraria}', descricao = '${descricao}' WHERE id = ${id}`;

    conn.query(sql, (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/mensalidade');
    })
})

// Remove uma mensalidade do database
app.get('/remove/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM mensalidade WHERE id = ${id}`;

    conn.query(sql, (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/mensalidade');
    })
})



// Busca uma mensalidade através do seu id
app.get('/buscar', (req, res) => {
    res.render('buscar', {layout: false});
})
app.post('/buscar/', (req, res) => {
    const id = req.body.id;
    const sql = `SELECT * FROM curso WHERE id = ${id}`;

    conn.query(sql, (err, data) => {
        if(err){
            console.log(err);
        }
        const listar = data[0];
        res.render('getMensalidadeId', {layout: false, listar});
    })
})

//CRUD FUNCIONARIO

// Mostra a página para cadastro de funcionario
app.get('/funcionario', (req, res) => {
    res.render('postFuncio', { layout: false });
});

// Mostra a página com a lista de todos os funcionario cadastrados
app.get('/funcionario', (req, res) => {
    const sql = `SELECT * FROM funcionario`;

    conn.query(sql, (err, data) => {
        if(err){
            console.log(err);
        }
        const listarFuncio = data;
        res.render('getFuncionario', {layout: false, listarFuncio});
        //getFuncionario <<handlebars
    })
});

// Buscar funcionario pelo id

app.get('/buscarFuncionario', (req, res) => {
    res.render('buscarFuncionario', {layout: false});
})

app.post('/buscarFuncionario/', (req, res) => {
    const id = req.body.id;
    const sql = `SELECT * FROM funcionario WHERE id = ${id}`;

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        const listar = data[0];
        res.render('getFuncioID', {layout: false, listar} );
    })
})

// Mostra os dados de um Fucionario específico
app.get('/funcionario/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM funcionario WHERE id = ${id}`;

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        const listar = data[0];
        res.render('FuncioID', {layout: false, listar} ); //getFuncionarioID <<handlebars
    })
})

// Mostra os dados de um funcionario específico para renderizar nos values dos input para editar os dados
app.get('/funcionario/edit/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM funcionario WHERE id = ${id}`;

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        const infos = data[0];
        res.render('updateFuncio', {layout: false, infos}) //updateFuncio<<handlebars
    })
});


// Cadastra um funcionario no database
app.post('/cadastrarFuncio', (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const matricula = req.body.matricula;
    const telefone = req.body.telefone ;
    const endereco = req.body.endereco;
    const sql = `INSERT INTO funcionario(nome, matricula, telefone, endereco) VALUES('${nome}', '${ matricula}', '${telefone}', '${endereco}')`;

    conn.query(sql, (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/funcionarios');
    })
});
// Atualiza os dados de um professor
app.post('/updateFuncio', (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const matricula = req.body.matricula;
    const telefone = req.body.telefone ;
    const endereco = req.body.endereco;
    const sql = `UPDATE funcionario SET nome = '${nome}', matricula = ${matricula}, telefone = '${telefone}', endereco = '${endereco}' WHERE id = ${id}`;

   

    conn.query(sql, (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/funcionario');
    })
});

// Remove um professor do database
app.get('/removefuncionario/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM funcionario WHERE id = ${id}`;

    conn.query(sql, (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/funcionario');
    })
});

// CRUD ALUNO

// Rota da pagina Cadastro de alunos
app.get('/cadaluno', (req, res) => {
    res.render('postAluno', { layout: false} );
});

// Cadastrar alunos
app.post('/cdalnpost', (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const peso = req.body.peso;
    const altura = req.body.altura;
    const telefone = req.body.telefone;
    const sql = `INSERT INTO aluno (nome, peso, altura, telefone) VALUES ('${nome}', '${peso}', '${altura}','${telefone}')`;

    conn.query(sql, (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/aluno');
    })
});

//ver lista de alunos
app.get('/aluno', (req, res) => {
    const sql = `SELECT * FROM aluno`;

    conn.query(sql, (err, data) => {
        if(err){
            console.log(err);
        }
        const listarAlunos = data;
        res.render('getAluno', {layout: false, listarAlunos});
    })
});

// Buscar aluno pelo id

app.get('/buscaraluno', (req, res) => {
    res.render('buscarAluno', {layout: false})
})

app.post('/buscaraluno/', (req, res) => {
    const id = req.body.id;
    const sql = `SELECT * FROM aluno WHERE id = ${id}`;

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        const listar = data[0];
        res.render('getAlunosID', {layout: false, listar} );
    })
});

// Mostra os dados de um aluno específico
app.get('/alunos/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM aluno WHERE id = ${id}`;

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        const listar = data[0];
        res.render('getAlunosID', {layout: false, listar} );
    })
});


// Mostra os dados de um aluno específico para renderizar nos values dos input para editar os dados
app.get('/alunos/edit/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM aluno WHERE id = ${id}`;

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        const infos = data[0];
        res.render('updateAluno', {layout: false, infos})
    })
});

// Atualiza os dados de um aluno
app.post('/updatealuno', (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const peso = req.body.peso;
    const altura = req.body.altura
    const telefone = req.body.telefone;
    const sql = `UPDATE aluno SET nome = '${nome}', peso = ${peso}, altura = '${altura}', telefone = '${telefone}' WHERE id = ${id}`;

   

    conn.query(sql, (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/aluno');
    })
});

// Remove um aluno do database
app.get('/removeralunos/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM aluno WHERE id = ${id}`;

    conn.query(sql, (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/aluno');
    })
});

// CRUD PRODUTOS

// Rota da pagina Cadastro de produtos
app.get('/cadproduto', (req, res) => {
    res.render('postProduto', { layout: false} );
});

// Cadastrar produtos
app.post('/cadprodpost', (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const preco = req.body.preco;
    const descricao = req.body.descricao;
    const sql = `INSERT INTO produto (nome, preco, descrição) VALUES ('${nome}', '${preco}', '${descricao}')`;

    conn.query(sql, (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/produto');
    })
});

//ver lista de produtos
app.get('/produto', (req, res) => {
    const sql = `SELECT * FROM produto`;

    conn.query(sql, (err, data) => {
        if(err){
            console.log(err);
        }
        const listarProdutos = data;
        res.render('getProduto', {layout: false, listarProdutos});
    })
});

// Buscar uma produto pelo id

app.get('/buscarProduto', (req, res) => {
    res.render('buscarProduto', {layout: false});
})

app.post('/buscarProduto/', (req, res) => {
    const id = req.body.id;
    const sql = `SELECT * FROM produto WHERE id = ${id}`;

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        const listar = data[0];
        res.render('getProdutoID', {layout: false, listar} );
    })
});

// Mostra os dados de uma produto específica
app.get('/produto/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM produto WHERE id = ${id}`;

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        const listar = data[0];
        res.render('getProdutoID', {layout: false, listar} );
    })
});


// Mostra os dados de uma produto específica para renderizar nos values dos input para editar os dados
app.get('/produto/edit/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM produto WHERE id = ${id}`;

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        const infos = data[0];
        res.render('updateProduto', {layout: false, infos})
    })
});

// Atualiza os dados de uma Produto
app.post('/updateprod', (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const preco = req.body.preco;
    const descricao = req.body.descricao;
    const sql = `UPDATE produto SET nome = '${nome}', preco = '${preco}', descrição = '${descricao}' WHERE id = ${id}`;

    conn.query(sql, (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/produto');
    })
});

// Remove um produto do database
app.get('/removerproduto/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM produto WHERE id = ${id}`;

    conn.query(sql, (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/produto');
    })
});


// CRUD avaliação

// Mostra a página para cadastro de turmas
app.get('/cadastroAvaliacao', (req, res) => {
    res.render('postAvaliacao', {layout: false})
})

// Mostra a página com a lista de todos as avaliações cadastradas
app.get('/avaliacao', (req, res) => {
    const sql = `SELECT * FROM avaliacao`;

    conn.query(sql, (err, data) => {
        if(err){
            console.log(err);
        }
        const listarAvaliacao = data;
        res.render('getAvaliacao', {layout: false, listarAvaliacao});
    })
})

// Buscar uma Avaliacao pelo id

app.get('/buscarAvaliacao', (req, res) => {
    res.render('buscarAvaliacao', {layout: false})
})

app.post('/buscarAvaliacao/', (req, res) => {
    const id = req.body.id;
    const sql = `SELECT * FROM avaliacao WHERE id = ${id}`;

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        const listar = data[0];
        res.render('getAvaliacaoId', {layout: false, listar} );
    })
})

// Mostra os dados de uma avaliação específica
app.get('/avaliacao/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM avaliacao WHERE id = ${id}`;

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        const listar = data[0];
        res.render('getAvaliacaoId', {layout: false, listar} );
    })
})

// Mostra os dados de uma turma específica para renderizar nos values dos input para editar os dados
app.get('/avaliacao/edit/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM avaliacao WHERE id = ${id}`;

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        const infos = data[0];
        res.render('updateAvaliacao', {layout: false, infos})
    })
})

// Cadastra uma Avaliação no database
app.post('/cadastrarAvaliacao', (req, res) => {
    const id = req.body.id
    const alunos = req.body.alunos;
    const idade = req.body.idade;
    const peso = req.body.peso;
    const sql = `INSERT INTO avaliacao(alunos, idade, peso) VALUES('${alunos}', '${idade}', '${peso}')`;

    conn.query(sql, (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/avaliacao');
    })
})

// Atualiza os dados de uma avaliacao
app.post('/updateAvaliacao', (req, res) => {
    const id = req.body.id;
    const alunos = req.body.alunos;
    const idade = req.body.idade;
    const peso = req.body.peso;
    const sql = `UPDATE avaliacao SET alunos = '${alunos}', idade = '${idade}', peso = '${peso}' WHERE id = '${id}'`;

    conn.query(sql, (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/avaliacao');
    })
})

// Remove uma avaliacao do database
app.get('/removeravaliacao/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM avaliacao WHERE id = '${id}'`;

    conn.query(sql, (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/avaliacao');
    })
})



// Busca uma avaliação através do seu id
app.get('/buscar', (req, res) => {
    res.render('buscar', {layout: false});
})
app.post('/buscar/', (req, res) => {
    const id = req.body.id;
    const sql = `SELECT * FROM avalicao WHERE id = ${id}`;

    conn.query(sql, (err, data) => {
        if(err){
            console.log(err);
        }
        const listar = data[0];
        res.render('getavaliacaoId', {layout: false, listar});
    })
})




// Cria a conexão com o database
const conn = mysql.createConnection({
    host: '127.0.0.1',
    database: 'crud_api',
    port: '3307',     
    password: '',
    user: 'root'
})

// Cria uma porta para o servidor
app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    console.log(`Servidor conectado na porta ${port}`);
})