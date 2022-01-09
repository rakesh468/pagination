import './App.css';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const PER_PAGE=10;

function App() {
  const[currentPage,setcurrentPage]=useState(0);
  const[data,setdata]=useState([]);

  useEffect(()=>{
    fetchData();
  },[]);

  function fetchData(){
    fetch("https://jsonplaceholder.typicode.com/photos")
    .then((res)=>res.json())
    .then((data)=>{
      setdata(data)
    })
  } 

  function handlePageClick({selected:selectedpage}){
console.log("selectedpage",selectedpage);
setcurrentPage(selectedpage);
  }

  const offset=currentPage * PER_PAGE;
  //pagination//
  
  const currentPageData=data
  .slice(offset,offset+PER_PAGE)
  .map((res,index)=><img key={index} src={res.thumbnailUrl} alt={res.title}/>)
  const pagecount=Math.ceil(data.length / PER_PAGE);
  
  return (
    <div className="App">
      <h1>React Pagination</h1>
      {currentPageData}
      <ReactPaginate 
      previousLabel={"← Pervious"}
      nextLabel={"Next →"}
      pageCount={pagecount}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      previousLinkClassName={"pagination_link"}
      nextLinkClassName={"pagination_link"}
      disabledClassName={"pagination_link_disabled"}
      activeClassName={"pagination_link_active"}/>

    </div>
  );
}

export default App;
