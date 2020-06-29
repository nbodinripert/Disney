export default class MoviesProvider {
    async getMovies() {
        try {
            let response = await fetch(`http://api.elorri.fr/disney-plus/movies`);
            if(!response.ok) {
                throw Error(response.statusText);
            } else {
                return await response.json();
            }
        } catch(error) {
            console.log(error);
        }
    }

    async getCompanyMovies(name) {
        try {
            let response = await fetch(`http://api.elorri.fr/disney-plus/company/${name}`);
            if(!response.ok) {
                throw Error(response.statusText);
            } else {
                return await response.json();
            }
        } catch(error) {
            console.log(error);
        }
    }

    async getMovie(id) {
        try {
            let response = await fetch(`http://api.elorri.fr/disney-plus/movie/${id}`);
            if(!response.ok) {
                throw Error(response.statusText);
            } else {
                let movie = await response.json();
                switch(movie.company) {
                    case "Marvel Studios":
                        movie.companyLink = "marvel"
                        break;
                    case "Walt Disney Pictures":
                        movie.companyLink = "disney"
                        break;
                    case "Pixar":
                        movie.companyLink = "pixar"
                        break;
                    default:
                        movie.companyLink = "starwars"
                        break;
                }
                return movie;
            }
        } catch(error) {
            console.log(error);
        }
    }

    getHilightedMovie(movies) {
        return movies.find(movie => movie.highlighted);
    }

    getNewMovies(movies) {
        return movies.sort((d1Str, d2Str) => {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(d2Str.releaseDate) - new Date(d1Str.releaseDate);
          }).slice(0, 6);
    }

    getSuggestions(movies) {
        // shuffle the array
        // --------
        let movies2 = [...movies]
        for (let i = movies2.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [movies2[i], movies2[j]] = [movies2[j], movies2[i]];
        }
        // --------
        
        return movies2.slice(0, 3);
    }
}