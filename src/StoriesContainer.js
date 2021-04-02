import React, { Component } from 'react';
import axios from 'axios'
import  Story  from './Story'
class StoriesContainer extends Component {
  constructor(props) {
    
    super(props);
    
    this.state = {
      error: false,
      items: [],
      searchItem: "newstories",
      promises: [{}],
      storage:[{}],
      base:'https://hacker-news.firebaseio.com/v0/',
      extension: ".json?print=pretty"
     };}
    
    componentDidMount() { 
    
      this.getData();
    var productList = window.localStorage.getItem('product-list');
    productList = productList === null || productList === '' ? [{}] : productList;
   this.setState({storage:productList})
   window.addEventListener('beforeunload', this.componentCleanup);
   
   }
    getData = () =>{
      axios
      .get(`${this.state.base}newstories.json`)
      .then(result => {console.log(result.data)
      
       const topStories = result.data.slice(0,100);
       const promises = topStories.map(story => {
         return axios.get(`https://hacker-news.firebaseio.com/v0/item/${story}.json`).then(res => res.data)
       })
       Promise.all(promises).then(data => {
         console.log(data)
         this.setState({ promises: data },()=>{
         // localStorage.setItem('-list',data);
         })
       });
  })
  
    }
    
    componentWillUnmount = () => {
      localStorage.setItem('product-list',this.state.promises);
      this.componentCleanup();
      window.removeEventListener('beforeunload', this.componentCleanup); // remove the event handler for normal unmounting
    };
    render() {
    
    let counter = 0;
    
    return (<div style={{width:"100vw",overflowX:'hidden',scrollbarWidth: "none"  }}>
      
      {this.state.promises.length<50?<div className="loading"></div>: (<>
        
        <Story story={this.state.promises} storage={this.state.storage}/></> )}
      </div>
     );
     }
    }
 
export default StoriesContainer;
