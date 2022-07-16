// const dbConnection = require("./index").dbConnection; same as const {dbConnection} = require("./index");
const {dbConnection, Movie, Genre } = require("./index")

const runSeed = async () => {
    await dbConnection.sync({ force: true });

    const horrorGenre = await Genre.create({name: "Horror"})
    const comedyGenre = await Genre.create({name: "Comedy"})
    const actionGenre = await Genre.create({name: "Action"})
    const dramaGenre = await Genre.create({name: "Drama"})

    const EverythingEverywhereAllAtOnce = await Movie.create({
        title: "Everything Everywhere All at Once",
        imbdLink: "https://www.imdb.com/title/tt6710474/?ref_=nv_sr_srsg_0"
    });

    const Parasite = await Movie.create({
        title: "Parasite",
    });

    const MidSommar = await Movie.create({
        title: "MidSommar",
    });

    const WhereTheCrawdadsSing = await Movie.create({
        title: "Where the Crawdads Sing",
    });

    // Sequelize magic method, could put ids or variables in setGenres
    await EverythingEverywhereAllAtOnce.setGenres([comedyGenre, actionGenre, dramaGenre])
    await Parasite.setGenres([actionGenre, dramaGenre])
    await MidSommar.setGenres([horrorGenre])
    await WhereTheCrawdadsSing.setGenres([dramaGenre])

    console.log('seed is complete!');
    process.kill(0);
}
runSeed();
