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
        // value: localStorage.getItem('email')
    },
    {
        id: 'id',
        // type: 'hidden'
        // value: localStorage.getItem('email')
    },
    {
        name: 'category',
        label: 'Category',
        // value: localStorage.getItem('firstName'),
        rules: 'string|between:2,25',
    },
    {
        name: 'imageUrl',
        label: 'Image Url',
        // value: localStorage.getItem('phone'),
        // rules: ['regex:/^(\\()?0?(5[02-9])(\\))?-?\\d{7}$/']
    },
    {
        name: 'description',
        label: 'Description',
        // rules: 'string|between:1,25',
        // value: localStorage.getItem('area'),
        // options: {
        //     validateOnChange: true
        // }
    },
    {
        name: 'rate',
        label: 'Rate',
        rules: 'numeric|min:0|max: 10',
        options: {
            validateOnChange: true
        }
    },
    {
        name: 'year',
        label: 'Year',
        rules: 'string|between:1,25',
        // options: {
        //     validateOnChange: true
        // }
    }
];



export default class EditMoviesModalUiState {

    constructor(apiGateway, moviesStore) {
        const hooks = {
            onSubmit(form) {

            },
            onSuccess(form) {
                // console.log('values: ', form.values())
                let movie = form.values()
                movie.id = moviesStore.selectedMovie.id
                // console.log('-movie: ', movie)
                moviesStore._updateMovie(movie)
                // form.clear()
                moviesStore.closeEditMovieForm()
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
