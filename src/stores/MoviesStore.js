import {observable, action, runInAction, computed} from "mobx";


export default class MoviesStore {

    constructor(apiGateway) {
        this._apiGateway = apiGateway;
    }

    @observable isLoading = false
    @observable movies = []
    @observable search = ''
    @observable selectedMovie = null
    @observable getMoviesError = null
    @observable getMovieDetailsError = null
    @observable isEditMovieFormOpen = false
    @observable isAddMovieFormOpen = false
    @observable isRemoveMovieSwalOpen = false
    @observable isMovieExistSwalOpen = false


    @action
    openAddMovieForm = () => {
        runInAction(() => this.isAddMovieFormOpen = true)
    }

    @action
    closeAddMovieForm = () => {
        runInAction(() => this.isAddMovieFormOpen = false)
    }


    @action
    openRemoveMovieSwal = movie => {
        runInAction(() => this.isRemoveMovieSwalOpen = true)
        this._setSelectedMovie(movie)
    }

    @action
    closeRemoveMovieSwal = () => {
        runInAction(() => this.isRemoveMovieSwalOpen = false)
    }

    @action
    openEditMovieForm = movie => {
        runInAction(() => this.isEditMovieFormOpen = true)
        this._setSelectedMovie(movie)
    }

    _updateMovie = movie => {
        const foundIndex = this.filteredMovies.findIndex(x => x.id === movie.id);
        this.filteredMovies[foundIndex] = movie;
    }

    @action
    removeMovie = movie => {
        let movies = this.filteredMovies
        const index = movies.findIndex(x => x.id === movie.id);
        movies.splice(index, 1).splice(index, 1)
        this.movies = movies
        this.closeRemoveMovieSwal()
    }

    _openMovieExistSwal = () => {
        this.isMovieExistSwalOpen = true
    }

    @action
    closeMovieExistSwal = () => {
        this.isMovieExistSwalOpen = false
    }

    _addMovie = movie => {

        let movies = this.filteredMovies


        movies.unshift(movie)
        this.movies = movies
        this.closeAddMovieForm()
        this.closeMovieExistSwal()
    }

    _setSelectedMovie = movie => {
        this.selectedMovie = movie
    }

    @action
    closeEditMovieForm = () => {
        runInAction(() => this.isEditMovieFormOpen = false)
    }

    @action
    async getMovies() {
        this.isLoading = true
        try {
            const movies = await this._apiGateway.getMovies()
            movies.map(movie => {
                this.getMovieDetails(movie.id)
                    .then(res => runInAction(() => {
                        let mov = res.data
                        mov.name = mov.name.replace(/[^a-zA-Z ]/g, "")
                        mov.name = this._titleCase(mov.name)
                        this.movies.push(mov)
                    }))
            })
        }
        catch (e) {
            console.log({e})
            this.getMovieDetailsError = e
        }
        finally {
            this.isLoading = false
        }
    }

    async getMovieDetails(movieId) {
        this.isLoading = true
        try {
            const resp = await this._apiGateway.getMovieDetails(movieId)
            return resp
        }
        catch (e) {
            console.log({e})
            this.getMovieDetailsError = e
        }
        finally {
            this.isLoading = false
        }
    }

    @computed get filteredMovies() {
        return this.movies.filter((thing, index, self) => index === self.findIndex((t) => (
            t.id === thing.id && t.name === thing.name
        )))
    }

    _titleCase = (str)=> {
        let splitStr = str.toLowerCase().split(' ')
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
        }
        return splitStr.join(' ')
    }

}