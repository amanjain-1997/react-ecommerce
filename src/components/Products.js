import React, { Component } from "react";
import formatCurrency from "../util";
// import Modal from "./Modal";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default class Products extends Component {
  constructor(props){
    super(props)
    this.state = {
      insert:true
    }
  }
  quantitycheck = (product) => {
      // console.log(this.props.currentCart);
     var insert = true;
      for (var i=0;i<this.props.currentCart.length; i++){
        // console.log(this.props.currentCart[i]);
        if (this.props.currentCart[i]._id ==product._id){
          if(this.props.currentCart[i].count >= product.quantity){
            insert = false;
          }
        }
      }

      if (insert){
        console.log("Adding to cart")
        this.props.addToCart(product);
      }
      else{
          console.log("Limit reached");
          this.setState({insert:false});
      }
     }

     closemod = () => {
      this.setState({insert:true});
     }

    //  quantitycheck = (product) => {
    //   // console.log(this.props.currentCart);
    //   // var insert = true;
    //   for (var i=0;i<this.props.currentCart.length; i++){
    //     // console.log(this.props.currentCart[i]);
    //     if (this.props.currentCart[i]._id ==product._id){
    //       if(this.props.currentCart[i].count == product.quantity){
    //         console.log("setting ")
    //         this.setInsert(false);
    //       }
    //     }
    //   }

    //   if (this.insert){
    //     console.log("Adding to cart")
    //     this.props.addToCart(product);
    //   }
    //   else{
    //       console.log("Limit reached");
    //   }
    //  }
  render() {
    return (
      <div>
        <div>
          <ul className="products">
            {this.props.products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <a href={"#" + product._id}>
                    <img src={product.image} alt={product.title}></img>
                    <p style={{textAlign:'center', color:'black', fontSize: '17px', marginTop: '2%'}}>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div style={{color:'black'}}>{formatCurrency(product.price)}</div>
                    <button
                      onClick={() => this.quantitycheck(product)}
                      className="btn-primary"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {
          !this.state.insert &&  
          <div className="modalDialog">
            <Modal.Dialog>
              <Modal.Body>
                <p>Quantity Exceeded!</p>
              </Modal.Body>
        
              <Modal.Footer style={{justifyContent:'center !important'}}>
                <Button variant="primary" onClick={() => this.closemod()}>Close</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        }
      </div>
    );
  }
}
