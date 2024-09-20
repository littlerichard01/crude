const express = require ("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./banco/post")

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.render("primeira_pagina")
})

app.post("/atualizar", function(req, res){
    post.update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    },{
        where:{
            id: req.body.id
        }
    }).then(
        function(){
            console.log("Dados atualizados com sucesso!")
            res.render("primeira_pagina")
        }
    )
})

app.post("/cadastrar", function(req, res){
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao

    }).then(function(){
        console.log("Dados Cadastrados com Sucesso!")
        res.send("Dados Cadastrados com Sucesso")
    }).catch(function(){
        console.log("Erro ao Gravar os Dados na Entidade!")
    })
})

app.get("/consulta", function(req, res){
    post.findAll().then(function(posts){
        res.render("consulta", {posts})
        console.log(posts);
    })

})

app.get("/editar/:id", function(req, res){
    post.findAll({where: {'id': req.params.id}}).then(
        function(posts){
            res.render("editar", {posts})
            console.log(posts)
        }
    )
})

app.get("/excluir/:id", function(req,res){
    post.findAll({where: {'id': req.params.id}}).then(
        function(posts){
            res.render("deletar", {posts})
            console.log(posts)
        }
    )
    
})

app.post("/deletar/:id", function(req, res){
    post.destroy({
        where:{
            'id': req.params.id,
        }
    }).then(
        function(){
            console.log("Dados excluidos com sucesso!")
            res.render("primeira_pagina")
        }
    )
})

app.listen(8081, function(){
    console.log("Servidor Ativo!")
})