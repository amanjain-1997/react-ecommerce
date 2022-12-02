/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

import e from "cors";

class App extends React.Component {
  constructor() {
    super();
    this.getProducts('all');
    this.state = {
      products: '',
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "",
      sort: "",
      insert:true,
    };

  }
  createOrder = (order) => {
  
  var payload = {
      a: 1,
      b: 2
  };
  console.log(order);
  var data = new FormData();
  data.append( "json", JSON.stringify( payload ) );
  console.log(data);
  fetch('http://localhost:5000/api/submitorder',
  {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( order ) 
  })
  .then(function(res){ return res.json(); })
  .then(function(data){ 
     if (data==true){
      alert("Your order has been recieved!");
     }
     else{
      alert("There was an error submitting your order");
     }
     })
  };
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    );
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  sortProducts = (event) => {
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "Highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    }));
  };


  closemod = () => {
    this.setState({insert:true});
   }


  //  showcart = (output) => {
  //     console.log("in second showcart")
  //   }

     showcart = () => {
      console.log("showcart")
       var x = document.getElementById("sidebar");
       var y = document.getElementById("icart");
  
       if (x.style.display === "none") {
         x.style.display = "block";
         y.style.color = "black"
       } else {
         x.style.display = "none";
         y.style.color = "white"
  
       }}

        getProducts = (url) =>{
         
        console.log(this.state);
        fetch('http://localhost:5000/api/products/'+url)
        .then(response => response.json())
        .then((response) =>{
          this.setState( { products: response }, () => { 
            console.log(this.state.products);
         });  
        });
       }
  render() {
    


    return (
      <div className="grid-container">
<header>
    <div className="container" style={{height:'120%'}}>
      <div className="logo"></div>

      <nav>
        <ul>
          <li onClick={() => this.getProducts(String('all'))}><a  href="#">Home</a></li>
          <li onClick={() => this.getProducts(String('Electronics'))}><a href="#">Electronics</a></li>
          <li onClick={() => this.getProducts(String('Clothes'))}><a href="#">Clothes</a></li>
          <li onClick={() => this.getProducts(String('Shoes'))}><a  href="#">shoes</a></li>
        </ul>
      </nav>
       <nav style={{float:'right'}}>
        <ul>
          <li onClick={() => this.showcart()} className="carticon"><a id="icart" href="#">Cart</a></li>
        </ul>
      </nav>
    </div>
  </header>
        <main style={{margin:'2%'}}>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
                currentCart = {this.state.cartItems}
              ></Products>
            </div>
            <div className="sidebar" id = "sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>SAP DEMO PROJECT</footer>
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

export default App;
