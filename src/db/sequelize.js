const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("./mock-pokemon");
const bcrypt = require("bcrypt");

let sequelize;

// if (process.env.NODE_ENV === "production") {
//   sequelize = new Sequelize("pierre-davy_pokedex", "350330", "dvgvbrgq@254", {
//     host: "mysql-pierre-davy.alwaysdata.net",
//     dialect: "mariadb",
//     dialectOptions: {
//       timezone: "Etc/GMT-2",
//     },
//     logging: true,
//   });
// } else {
sequelize = new Sequelize("pokedex", "root", "", {
  host: "127.0.0.1",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: true,
});
// }

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  // paramete sync({ force: true }) pour reinitialiser la bdd à chaque demarrage
  return sequelize.sync({ force: true }).then((_) => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });

    bcrypt
      .hash("pikachu", 10)
      .then((hash) => User.create({ username: "pikachu", password: hash }))
      .then((user) => console.log(user.toJSON()));

    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
