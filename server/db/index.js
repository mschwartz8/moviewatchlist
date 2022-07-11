const Sequelize = require("sequelize");

// use Sequelize to connect to the database
const dbConnection = new Sequelize(
    "postgres://localhost:5432/moviewatchlist"
)


// test if the connection works
// const test = async () => {
//     try {
//         await dbConnection.authenticate();
//         console.log('authenticate worked')
//     } catch (e) {
//         console.error(e)

//     }
// }
// test()

module.exports = dbConnection;

// define models here since it's a simple app

/*
Movie Model
- title(not null)
- imbdLink
- watched (not null, boolean, default false)

Genre Model
- name (not null)

Many-to-many movies & genres
belongsToMany
*/

const Movie = dbConnection.define("movie", {
    title: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        validate: {
            // empt string cannot be put in this field
            notEmpty: true
        }
    },
    imbdLink: {
        type: Sequelize.DataTypes.STRING(1000),
        allowNull: true,
        validate: {
            isUrl: true
        },
        watched: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
        
    }
})

const Genre = dbConnection.define("genre", {
    name: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true
    }
})


// set associations
Movie.belongsToMany(Genre, {through: "movies_genres" });
Genre.belongsToMany(Movie, {through: "movies_genres"})
