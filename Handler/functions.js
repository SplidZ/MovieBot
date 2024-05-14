const { QuickDB } = require("quick.db");
const fetch = require("node-fetch");

module.exports = { setData, getData, deleteData, pushData, pullData, addData, subData, searchMovie, searchMovieById };

/**
 * Set data in the dataBase.
 * @param {string} path - Data path.
 * @param {any} value - Value to set.
 */
async function setData(path, value) {
    
    const db = new QuickDB({ filePath: `Databases/Bot.sqlite`, table: "bot" });

    const result = await db.set(path.toString(), value);

    return result;
    
}

/**
 * Get data from the dataBase.
 * @param {string} path - Data path.
 */
async function getData(path) {
    
    const db = new QuickDB({ filePath: `Databases/Bot.sqlite`, table: "bot" });

    const result = await db.get(path.toString());

    return result;
    
}

 /**
 * Delete data from the dataBase.
 * @param {string} path - Data path.
 */
async function deleteData(path) {
    
    const db = new QuickDB({ filePath: `Databases/Bot.sqlite`, table: "bot" });

    const result = await db.delete(path.toString());

    return result;
    
}

/**
 * Push data in the dataBase.
 * @param {string} path - Data path.
 * @param {any} value - Value to push.
 */
async function pushData(path, value) {
    
    const db = new QuickDB({ filePath: `Databases/Bot.sqlite`, table: "bot" });

    const result = await db.push(path.toString(), value);

    return result;
    
}

/**
 * Pull data from the dataBase.
 * @param {string} path - Data path.
 * @param {any} value - Value to pull.
 */
async function pullData(path, value) {
    
    const db = new QuickDB({ filePath: `Databases/Bot.sqlite`, table: "bot" });

    const result = await db.pull(path.toString(), value);

    return result;
    
}

/**
 * add data in the dataBase.
 * @param {string} path - Data path.
 * @param {any} value - Value to add.
 */
async function addData(path, value) {
    
    const db = new QuickDB({ filePath: `Databases/Bot.sqlite`, table: "bot" });

    const result = await db.add(path.toString(), value);

    return result;
    
}

/**
 * sub data in the dataBase.
 * @param {string} path - Data path.
 * @param {any} value - Value to sub.
 */
async function subData(path, value) {
    
    const db = new QuickDB({ filePath: `Databases/Bot.sqlite`, table: "bot" });

    const result = await db.sub(path.toString(), value);

    return result;
    
}

/**
 * Search a movie in the API.
 * @param {string} title - Movie title.
 * @param {number} year - Movie release year.
 * @param {object} client - Client.
 */
async function searchMovie(title, year, client) {
    
    const response = await fetch(`https://www.omdbapi.com/?s=${title.toLowerCase()}${year}&apikey=${client.config.api.authorizationKey}`);

    const body = await response.json();

    return body;
    
}

/**
 * Search a movie by his ID in the API.
 * @param {string} id - Movie ID.
 * @param {object} client - Client.
 */
async function searchMovieById(id, client) {
    
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${client.config.api.authorizationKey}`);

    const body = await response.json();

    return body;
    
}
