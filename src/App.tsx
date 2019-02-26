// import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// import Loader from 'react-loader-spinner'
import './App.css';

interface IState {
  search: any,
  movies: any[]
}

export default class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      search: "",
      movies: []
    }
  }

  public render(){
    return (
      <Grid>
        <div className="bg"/>
        <Row className="show-grid">
          <Col md={12}>

            <div className="imgContainer">
              <img className="img" src={require('./assets/backgroundImg.jpeg')} />
              <div className="centered">
                <p className="title front-text">Watch Now!</p>
                <p className="front-text">
                  Can't afford to watch movies, because you're still a student?
                </p>
                <p className="front-text">
                  Using this web app you can search AND download torrents of your favourite movies!
                </p>
                <p>
                  <LinkContainer to="/Search">
                    <Button className="font-color" bsStyle="primary">Search for a movie</Button>
                  </LinkContainer>
                </p>
                <p>
                  <LinkContainer to="/Latest">
                    <Button className="font-color" bsStyle="primary">Check out the latest uploads</Button>
                  </LinkContainer>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}