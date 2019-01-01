import React, {Component} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import './App.css';
import {inject, observer} from "mobx-react";
import {Col, Grid, Row} from "react-bootstrap";
import MoviesList from "./components/movies-list/MoviesList";
import MovieDetails from "./components/movie-details/MovieDetails";
import loader from './assets/images/loading.svg'


@withRouter
@inject('moviesStore')
@observer
class App extends Component {

    componentDidMount() {
        const {moviesStore} = this.props
        moviesStore.getMovies()
    }

    render() {
        const {moviesStore} = this.props
        // console.log('moviesStore: ', moviesStore)

        if (moviesStore.isLoading)
            return <img src={loader} className="loader" alt="loading-spinner"/>

        return (
            <Grid>
                <Row>
                    <Col sm={12}>
                        <Switch>
                            <Route exact path="/" component={MoviesList}/>
                            <Route exact path="/:movieId" component={MovieDetails}/>
                        </Switch>

                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default App;
