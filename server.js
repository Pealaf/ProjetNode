const { Sequelize, DataTypes } = require("sequelize");

const express = require('express')
const app = express()
const port = 3000

const sequelize = new Sequelize('sqlite::memory:');
const Pokemon = sequelize.define('Pokemon', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    level: DataTypes.INTEGER,
    evolution: DataTypes.STRING
});

sequelize.sync()

app.use(express.json())

// Création d'un Pokémon
app.post("/pokemon", async(req,res) => {
    const newPokemon = await Pokemon.create({
        name: req.body.name,
        type: req.body.type,
        level: req.body.level,
        evolution: req.body.evolution
    })
    res.json(newPokemon)
})

// Modification d'un Pokémon
app.put("/pokemon/:id", async(req,res) => {
    const pokemon = await Pokemon.findByPk(req.params.id)
    if(pokemon != null) {
        pokemon.name = req.body.name
        pokemon.type = req.body.type
        pokemon.level = req.body.level
        pokemon.evolution = req.body.evolution
        pokemon.save()
        res.json(pokemon)
    } else {
        res.json("Pokémon inexistant")
    }  
})

// Suppression d'un Pokémon
app.delete("/pokemon/:id", async(req,res) => {
    const pokemon = await Pokemon.findByPk(req.params.id)
    if(pokemon != null) {
        pokemon.destroy()
        res.json("Pokémon supprimé !")
    } else {
        res.json("Erreur lors de la suppression")
    }
})

// Récupération d'un Pokémon par son ID
app.get('/pokemon/:id', async(request, response) => {
    // Récupération de l'ID fourni en paramètre
    const pokemonId = request.params.id;
    // Rcéupération du Pokémons
    const pokemon = await Pokemon.findByPk(pokemonId)
    response.json(pokemon)
})

// Récupération de tous les Pokémons
app.get('/pokemons', async(request, response) => {
    const pokemons = await Pokemon.findAll()
    response.json(pokemons)
})

app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`)
})