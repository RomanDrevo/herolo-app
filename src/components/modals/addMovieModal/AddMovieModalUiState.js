import validatorjs from 'validatorjs'
import MobxReactForm from 'mobx-react-form'


const plugins = {

    dvr: {
        package: validatorjs
    }
}

const fields = [

    {
        name: 'name',
        label: 'Name',
        rules: 'required|string|between:2,25',
        options: {
            validateOnChange: true
        }
    },

    {
        name: 'category',
        label: 'Category',
        rules: 'required|string|between:2,25',
        options: {
            validateOnChange: true
        }
    },
    {
        name: 'imageUrl',
        label: 'Image Url',
        rules: 'required|string|between:2,25',
        options: {
            validateOnChange: true
        }
    },
    {
        name: 'description',
        label: 'Description',
        rules: 'required|string|between:2,500',
        options: {
            validateOnChange: true
        }
    },
    {
        name: 'rate',
        label: 'Rate',
        rules: 'required|numeric|min:0|max: 10',
        options: {
            validateOnChange: true
        }
    },
    {
        name: 'year',
        label: 'Year',
        rules: 'required|string|between:4,4',
        options: {
            validateOnChange: true
        }
    }
];



export default class AddMovieModalUiState {

    constructor(apiGateway, moviesStore) {
        const hooks = {
            onSubmit(form) {

            },
            onSuccess(form) {
                let movie = form.values()
                movie.id = Math.floor(Math.random() * 100000) + 1

                if (moviesStore.movies.some(e => e.name === movie.name)) {
                    moviesStore._openMovieExistSwal()
                    return null
                }else {
                    moviesStore._addMovie(movie)
                }

                form.clear()
                moviesStore.closeAddMovieForm()
            },
            onError(form) {

                alert('Form has errors!');
                // get all form errors
                console.log('All form errors', form.errors());
            }
        }

        this.form = new MobxReactForm({fields}, {plugins, hooks});

    }

}
