import LinearProgress from '@material-ui/core/LinearProgress';
import * as React from "react";
import { Col, Grid, Media, MenuItem, Row, Well } from 'react-bootstrap';
import '../css/styles.css';

interface Iprop {
  search: any,
  movies: any[]
}

export default class Search extends React.Component<{}, Iprop> {
  constructor(props: any) {
		super(props)
		this.state = {
      search: "",
      movies: []
    }
}

	public RenderMovies() {
    const movies = this.state.movies.map(movie => {

			return (
      <Col md={4} key={movie.id}>
        <Well bsSize="large">
        <Media>
            <Media.Heading>{movie.title_english}</Media.Heading>
            <Media.Left><img width={107} height={160} src={movie.medium_cover_image} alt="thumbnail" /></Media.Left>
            <Media.Body>
              <p className="description">{movie.synopsis}</p>
            </Media.Body>
          </Media>
          <Media>
            <Media.Left>Rating: {movie.rating}</Media.Left>
            <Media.Body>
              Torrent Quality:
              <div className="link">
                {movie.torrents.map((torrentLink: any) => {
                  return (
                    <MenuItem key={ torrentLink.hash } href={torrentLink.url}>
                      {torrentLink.quality}
                    </MenuItem>
                  )
                })}
              </div>
            </Media.Body>
          </Media>
        </Well>
			</Col>
      )
		})
		return movies;
	}

	public updateSearch = (event: any) => {
		console.log(event.target.value);
		this.setState({ search: event.target.value });

		fetch('https://yts.am/api/v2/list_movies.json?query_term=' + event.target.value, {
			method: 'GET',
			headers: {
				'Content-Type': 'text/plain',
			}
		})
			.then(dataPromise => dataPromise.json())
			.then((response: any) => {
				if (response.status !== 'ok') {
					this.setState({ movies: response.statusText })
					console.log("NOT OKAY");
					console.log(response);
				}
				else {
					console.log(response.data.movies);
					this.setState({ movies: response.data.movies });
				}
				return response
			})
  }

  public loadingBar() {
    return(
      <LinearProgress />
    );
  }

	public render() {
		return (
      <Grid>
        <Row className="show-grid">
          <Col className="text border" md={12}>
          <p className="page-title">Search for Movie</p>
						<input type="text"
              value={this.state.search}
              onChange={this.updateSearch}/>
          </Col>
        </Row>
        <Row className="show-grid content-padding">
					  {this.state.movies ? this.RenderMovies() : this.loadingBar()}
        </Row>
      </Grid>
		);
	}
}