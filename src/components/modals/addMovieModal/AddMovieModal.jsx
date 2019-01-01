import React, {Component} from 'react';
import {FormControl, FormGroup, Modal} from "react-bootstrap";
import {inject, observer} from "mobx-react/index";

@inject('moviesStore', 'addMoviesModalUiState')
@observer
class AddMovieModal extends Component {


    render() {
        const {moviesStore, addMoviesModalUiState} = this.props
        const {form} = addMoviesModalUiState

        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Add Movie</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form id="login-form" className="login-form" onSubmit={form.onSubmit}>
                            <FormGroup>

                                <div className="flex">
                                    <div className="flex flex-column mr3">
                                        <label className="mr2" htmlFor={form.$('name').id}>
                                            {form.$('name').label}
                                        </label>

                                        <FormControl
                                            {...form.$('name').bind()}
                                        />
                                        <p className="error">{form.$('name').error}</p>
                                    </div>

                                    <div className="flex flex-column">
                                        <label className="mr2" htmlFor={form.$('category').id}>
                                            {form.$('category').label}
                                        </label>

                                        <FormControl
                                            {...form.$('category').bind()}
                                        />
                                        <p className="error">{form.$('category').error}</p>
                                    </div>
                                </div>



                                <div className="flex flex-column">
                                    <label className="mr2" htmlFor={form.$('imageUrl').id}>
                                        {form.$('imageUrl').label}
                                    </label>

                                    <FormControl
                                        {...form.$('imageUrl').bind()}
                                    />
                                    <p className="error">{form.$('imageUrl').error}</p>
                                </div>


                                <div className="flex flex-column">
                                    <label className="mr2" htmlFor={form.$('description').id}>
                                        {form.$('description').label}
                                    </label>

                                    <textarea
                                        rows="2"
                                        {...form.$('description').bind()}
                                    />

                                    <p className="error">{form.$('description').error}</p>
                                </div>

                                <div className="flex">
                                    <div className="flex flex-column mr3">
                                        <label className="mr2" htmlFor={form.$('rate').id}>
                                            {form.$('rate').label}
                                        </label>

                                        <FormControl
                                            {...form.$('rate').bind()}
                                        />
                                        <p className="error">{form.$('rate').error}</p>
                                    </div>

                                    <div className="flex flex-column">
                                        <label className="mr2" htmlFor={form.$('year').id}>
                                            {form.$('year').label}
                                        </label>

                                        <FormControl
                                            {...form.$('year').bind()}
                                        />
                                        <p className="error">{form.$('year').error}</p>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button className="action-button mb2 mt3" type="submit" disabled={!form.isValid}>Save changes</button>
                                    <div className="pointer" onClick={moviesStore.closeAddMovieForm}>Close</div>
                                </div>

                                <p className="error">{form.error}</p>
                                <p className="error">{form.success}</p>

                            </FormGroup>
                        </form>
                    </Modal.Body>

                    <Modal.Footer />

                </Modal.Dialog>
            </div>
        );
    }
}

export default AddMovieModal;
