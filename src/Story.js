import React, { Component } from 'react';
import { mapTime } from './mapTime';
import  ReactPaginate from  'react-paginate';
import _ from 'lodash';
import './story.css'
export default class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset:0,
      tabledata:[{}],
      orgtabledata:[{}],
      sortdata:[{}],
      perpage:10,
      currentpage:0,
      sort:"time",
      ord:""
       
  }
  }
  componentDidMount(){
    this.getdata();
}
getdata(){

  this.setState({orgtabledata:this.props.story,pageCount:Math.ceil(this.props.story.length/this.state.perpage)},
    ()=>{
    var slice=this.state.orgtabledata.slice(this.state.offset,this.state.offset+this.state.perpage)
   this.setState({ tabledata:slice})
    
  })}
  handleitems=(e)=>{
    const count=e.target.value;
    this.setState({perpage:parseInt(count)},()=>{
      this.setState({pageCount:Math.ceil(this.props.story.length/this.state.perpage),},()=>{
        var slice=this.state.orgtabledata.slice(this.state.offset,this.state.offset+this.state.perpage)
        this.setState({ tabledata:slice})
      })

    })
  
  }
handleChange=(e)=>{
  console.log(e.target.value)
  var order=e.target.value;
  this.setState({sort: e.target.value},()=>{
      (console.log(this.state.sort))
  { if(order==="title") {
        this.setState({sort:"title"})
    var w1= ( _.orderBy(this.state.orgtabledata,['title'],['asc'] ))
    console.log(w1)
    this.setState({orgtabledata:w1},()=>{
      const data = this.state.orgtabledata;
      
      const slice = data.slice(this.state.offset, this.state.offset + this.state.perpage)
      this.setState({
          pageCount: Math.ceil(data.length / this.state.perpage),
          tabledata:slice

    })
    
  })
      
  }}

      
      { if(order==="time" ){
       w1= ( _.orderBy(this.state.orgtabledata,['time'],['asc'] ))
      console.log(w1)  
      this.setState({orgtabledata:this.props.story},()=>{
          const data = this.state.orgtabledata;
          
          const slice = data.slice(this.state.offset, this.state.offset + this.state.perpage)
          this.setState({
              pageCount: Math.ceil(data.length / this.state.perpage),
              tabledata:slice

        })
        
      })}
      
      
  } { if(order==="by" ){
    this.setState({sort:"by"})
     w1= ( _.orderBy(this.state.orgtabledata,['by'],['asc'] ))
    console.log(w1)
    this.setState({orgtabledata:w1},()=>{
        const data = this.state.orgtabledata;
        
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perpage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perpage),
            tabledata:slice

      })
      
    })
}

}
      { if(order==="score" ){
          this.setState({sort:"score"})
           w1= ( _.orderBy(this.state.orgtabledata,['score'],['desc'] ))
          console.log(w1)
          this.setState({orgtabledata:w1},()=>{
              const data = this.state.orgtabledata;
              
              const slice = data.slice(this.state.offset, this.state.offset + this.state.perpage)
              this.setState({
                  pageCount: Math.ceil(data.length / this.state.perpage),
                  tabledata:slice
  
            })
            
          })
      }
   
  }
     
     
  })
  // 
}


handlepageclick = (e) => {
  const selectedPage = e.selected;
  const offset = selectedPage * this.state.perpage;

  this.setState({
      currentPage: selectedPage,
      offset: offset
  }, () => {
      this.loadMoreData()
  });

};

loadMoreData() {
  const data = this.state.orgtabledata;
  
  const slice = data.slice(this.state.offset, this.state.offset + this.state.perpage)
  this.setState({
      pageCount: Math.ceil(data.length / this.state.perpage),
      tabledata:slice
  })

}
  render() { 
    return this.props.story && (
    
      <div className="maindiv">
      <div className="sort">
      <label htmlFor="sort">SORT BY
                    
      <select id="sort"
      defaultValue={this.state.sort} 
      onChange={this.handleChange} 
      >
         <option value="time">time</option>
         <option value="title">title</option>
         <option value="score">score</option>
         <option value="by">score</option>
       </select>
      </label>
      <div>
      <label  htmlFor="itemsperpage">Display Items per page:
      <select id="itemsperpage" style={{backgroundColor:"antiquewhite"}}
      defaultValue={this.state.itemsperpage} 
      onChange={this.handleitems} 
      >
         <option value="10">10</option>
         <option value="20">20</option>
         <option value="30">30</option>
         <option value="40">40</option>
       </select>
      
      </label>
      </div>
      </div>
      
      <h1 className="heading">Hacker New Stories</h1>
      <div className="back">
      {this.state.tabledata.map((story,index)=>(
  
       
      <div className="StoryWrapper" key={index}>
    <a  className="hello" href={story.url}>  
    <div className="storytitle">
    {story.title}
    </div>
    <div className="body">
    <span className="story-by" style={{color:"black",fontWeight:"800"}}>
    By: 
  </span>
  <span className="story-by" style={{color:"black"}}>
  {story.by}{` `}
  </span>
  <span className="store-score" style={{color:"black" ,fontWeight:"800"}}>
  score:
  </span>
  <span className="store-score" style={{color:"black"}}>
  {story.score}{` `}
  </span>
  
  <span className="story-time" style={{color:"black" ,fontWeight:"700"}}>
  posted:{` `}  </span>
  <span className="story-time" style={{color:"black" }}>
  {` `} {mapTime(story.time)} </span>
    </div> </a>
    </div>
     ))}
     <ReactPaginate style={{listStyleType:"none",
      display: "flex"}}
     previousLabel={"<<"}
     nextLabel={">>"}
     breakLabel={"..."}
     breakClassName={"break-me"}
     pageCount={this.state.pageCount}
     marginPagesDisplayed={2}
     pageRangeDisplayed={5}
     onPageChange={this.handlepageclick}
     containerClassName={"pagination"}
     subContainerClassName={"pages pagination"}
     activeClassName={"active"}
    
     />
     </div>
  </div>
    );;
  }
}
 

    









//     render() {
//         return (
//             <div>
          
                    

        
//     <ReactPaginate
//     previousLabel={"pre"}
//     nextLabel={"nex"}
//     breakLabel={"..."}
//     breakClassName={"break-me"}
//     pageCount={this.state.pageCount}
//     marginPagesDisplayed={2}
//     pageRangeDisplayed={5}
//     onPageChange={this.handlepageclick}// =(e)=>this.handleclick(e) then no need of binding
//     containerClassName={"pagination"}
//     subContainerClassName={"pages pagination"}
//     activeClassName={"active"}
   
//     />

//             </div>
//         )
//     }
// }

// export default First;

