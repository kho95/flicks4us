import LinearProgress from '@material-ui/core/LinearProgress';
import * as React from "react";
import { Col, Grid, Media, MenuItem, Pager, Row, Well } from 'react-bootstrap';
import '../css/styles.css';


interface Iprop {
  movies: any[],
  pageNum: number,
  firstPage: boolean
}

export default class Latest extends React.Component<{}, Iprop> {
  constructor(props: any) {
		super(props)
		this.state = {
      movies: [],
      pageNum: 1,
      firstPage: true
    }
    this.nextPage = this.nextPage.bind(this);
    this.backPage = this.backPage.bind(this);
    this.latestMovie(1);
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

	public latestMovie(pageNumber: number){
		fetch('https://yts.am/api/v2/list_movies.json?sort_by=date_added&limit=9&page='+pageNumber, {
			method: 'GET',
			headers: {
				'Content-Type': 'text/plain',
			}
		})
			.then(dataPromise => dataPromise.json())
			.then((response: any) => {
				if (response.status !== 'ok') {
					this.setState({ movies: response.statusText })
				}
				else {
					this.setState({ movies: response.data.movies });
				}
				return response
			})
  }
  
  public nextPage(){
    this.latestMovie(this.state.pageNum+1);
    this.setState({ pageNum: this.state.pageNum + 1});
    if(this.state.pageNum === 1){
      this.setState({ firstPage: false});
    }
  }

  public backPage(){
    if(this.state.pageNum > 1){
      this.latestMovie(this.state.pageNum - 1);
      this.setState({ pageNum: this.state.pageNum - 1});
    }
    if(this.state.pageNum === 1){
      this.setState({ firstPage: true});
    }else{
      this.setState({ firstPage: false});
    }
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
          <p className="page-title">Latest Uploads</p>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col md={12}>
          <Pager>
          {this.state.firstPage ? (<Pager.Item previous={true} disabled={true}>&larr; Previous Page</Pager.Item>) : (<Pager.Item previous={true} onClick={this.backPage}>&larr; Previous Page</Pager.Item>)}
            <Pager.Item next={true} onClick={this.nextPage}>
              Next Page &rarr;
            </Pager.Item>
          </Pager>;
          </Col>
					{this.state.movies ? this.RenderMovies() : this.loadingBar()}
        </Row>
        <Pager>
          {this.state.firstPage ? (<Pager.Item previous={true} disabled={true}>&larr; Previous Page</Pager.Item>) : (<Pager.Item previous={true} onClick={this.backPage}>&larr; Previous Page</Pager.Item>)}
            <Pager.Item next={true} onClick={this.nextPage}>
              Next Page &rarr;
            </Pager.Item>
          </Pager>;
      </Grid>
		);
  }
}