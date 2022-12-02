import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    return (
      <div>
        <div className="filter-result" style={{marginLeft:'3%',display:'inline-block'}}> Showing {this.props.count} Products out of {this.props.count} </div>
        
        {/* <div className="filter-sort"> */}
          
          <button value={'Latest'} className="btn-primary" onClick={this.props.sortProducts} style={{padding:'0.8%', fontSize:'14px',marginLeft: '15%', marginRight:'15px'}}>
          Relevance
          </button>

          <button value={'lowest'} className="btn-primary" onClick={this.props.sortProducts} style={{padding:'0.8%', fontSize:'14px',margin: '15px'}}>
          Price Low to High
          </button>

          <button value={'Highest'} className="btn-primary" onClick={this.props.sortProducts}  style={{padding:'0.8%', fontSize:'14px',margin: '15px'}}>
          Price High to Low
          </button>


      </div>
    );
  }
}
