import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar";
import { addToCart } from "../../Redux/cartRedux";
import ReactPaginate from "react-paginate";
import "./home.css";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchArray, setSearchArray] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const search = useSelector((state) => state.search.search);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getBooks = async () => {
      const url = "https://api.itbook.store/1.0/new";
      const res = await axios.get(url);
      setBooks(res.data.books);
    };
    getBooks();
  }, [search]);

  useEffect(() => {
    const getSearchBooks = async () => {
      const url = `https://api.itbook.store/1.0/search/${search}`;
      const res = await axios.get(url);
      const result = res.data.books;
      setSearchArray(result);
    };
    getSearchBooks();
  }, [search]);

  const userPerPage = 10;
  const pageVisited = pageNumber * userPerPage;
  const displayUser = books.slice(pageVisited, pageVisited + userPerPage);
  const pageCount = Math.ceil(books.length / userPerPage);


  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleCart = (book) => {
    dispatch(addToCart({ ...book }));
  };


  return (
    <>
      <Navbar />

      <div className="homecontainer">
        {searchArray
          ? searchArray.map((book) => (
              <div className="homecart" key={book.isbn13}>
                <div className="image">
                  <img src={book.image} alt="img" />
                </div>
                <div className="title">
                  <h2>{book.title.slice(0, 30)}</h2>
                </div>
                <div className="subtitle">
                  <p>{book.subtitle}</p>
                </div>
                <div className="isbn">
                  <span>{book.isbn13}</span>
                </div>
                <div className="price">
                  <span>{book.price}</span>
                  <button onClick={() => handleCart(book)}>ORDER NOW</button>
                </div>
              </div>
            ))
          : 
          <div className='displayUserContainer'>
          <div className='displayUser'>
            {
              displayUser.map((book) => (
                <div className="homecart" key={book.isbn13}>
                  <div className="image">
                    <img src={book.image} alt="img" />
                  </div>
                  <div className="title">
                    <h2>{book.title.slice(0, 30)}</h2>
                  </div>
                  <div className="subtitle">
                    <p>{book.subtitle}</p>
                  </div>
                  <div className="isbn">
                    <span>{book.isbn13}</span>
                  </div>
                  <div className="price">
                    <span>{book.price}</span>
                    <button onClick={() => handleCart(book)}>ORDER NOW</button>
                  </div>
                </div>
              ))
            }
          </div>
          <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBtns"}
                previousLinkClassName={"previousBtn"}
                nextLinkClassNameLinkClassName={"nextBtn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
                renderOnZeroPageCount={null}
                hrefBuilder={(pageNumber, pageCount) =>
                  pageNumber <= 3 && pageNumber <= pageCount ? `/page/${pageNumber}` : '#'
                }
                hrefAllControls
              />
          </div>
          }
      </div>
    </>
  );
};

export default Home;
