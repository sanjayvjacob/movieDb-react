import {useEffect, useState} from "react"
import MovieBox from "./components/MovieBox"
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=01a954530ea62c34222b0a6d04e1fa06";
const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=01a954530ea62c34222b0a6d04e1fa06&query";

function App() {

  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState("")

  useEffect(()=>{
    fetch(API_URL)
    .then((res)=> res.json())
    .then(data=>{
      console.log(data)
      setMovies(data.results);
    })
  },[])

const searchMovie = async(e)=>{
  e.preventDefault();
  console.log("Searching");
  try{
    const url =`https://api.themoviedb.org/3/search/movie?api_key=01a954530ea62c34222b0a6d04e1fa06&query=${query}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setMovies(data.results);
  }
  catch(e){
    console.log(e);
  }
}
const changeHandler=(e)=>{
  setQuery(e.target.value);
}

  return (
    <>
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/home">Movie Hive</Navbar.Brand>
        <Navbar.Brand href="/home">Trending</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll">
        </Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-3" style={{maxHeight:'100px'}}
            navbarScroll></Nav>
            <Form className="d-flex" onSubmit={searchMovie}>
              <FormControl
              type="search"
              placeholder="Movie Search"
              className="me-2"
              aria-label="search"
              name="query"
              value={query} onChange={changeHandler}></FormControl>
              <Button variant="secondary" type="submit">Search</Button>
            </Form>

          </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>
      {movies.length > 0 ?(
        <div className="container">
        <div className="grid">
        {movies.map((movieReq)=> 
        <MovieBox key={movieReq.id} {...movieReq}/>)}
        </div>
        </div>
      ):(
        <h2>Sorry !! No Movies Found</h2>
      )}
    </div>
    </>
  )
}

export default App
