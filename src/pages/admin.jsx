
import React from "react";
import axios from 'axios'
import { useEffect, useState } from 'react'
import '../assets/App.css'
import { logout } from "../services/auth.service";

export default function AdminPage() {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [produitSelectionne, setProduitSelectionne] = useState({});

  const handelLogout = () => {
    logout();
  };

  let BACKEND_URL;
  if (process.env.NODE_ENV == "production") {
    BACKEND_URL = "https://imprim-server.onrender.com"
  } else {
    BACKEND_URL = "http://localhost:7000"
  }


  function getProducts() {
    axios.get(BACKEND_URL + '/products')
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  function addProduct(e) {
    e.preventDefault();

    // 1. on récupére les valeurs des inputs
    let title = e.target.title.value
    let description = e.target.description.value
    let category = e.target.category.value
    let image = e.target.image.value
    // let price = e.target.price.value
    // let rate = e.target.rate.value
    // let count = e.target.count.value

    // 3. On crée un objet qui contient toutes les valeurs des inputs
    let newProduct = {
      // 6. On ajoute un id dynamique qui s'incrémente par rapport à la taille de la liste des produits
      id: products.length + 1,
      title, description, category,image 
      // price,
      // rating: {
      //   rate, count
      // }
    }

    // 4. On fais appelle à notre api POST au chemi /products
    axios.post(BACKEND_URL + '/products', {
      // 5. On lui envoie le body product qui contient le nouveau produit et on le récupére du serveur par req.body.product
      product: newProduct
    })
      .then(res => {
            // 7. On appelle la function qui récupére toute la liste des produits afin d'actualiser la state
          getProducts()
        alert(res.data.msg)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
    }

  function editProduct(e) {
    e.preventDefault();
    // 1. on récupére les valeurs des inputs
    let title = e.target.title.value
    let description = e.target.description.value
    let category = e.target.category.value
    let image = e.target.image.value
    // let price = e.target.price.value
    // let rate = e.target.rate.value
    // let count = e.target.count.value

    let editedProduct = {
      id: produitSelectionne.id,
      title, description, category, image
      // price,
      // rating: {
      //   rate, count
      // }
    }

    // 2. On fais appelle à notre api PUT au chemin /products
    axios.put(BACKEND_URL + '/product/:id', {

      // 5. On lui envoie le body product qui contient le nouveau produit et on le récupére du serveur par req.body.product
      product: editedProduct
    })
      .then(res => {
        alert(res.data.msg)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })

    }


  // On récupére l'id du produit séléctionné
  function deleteProduct(e, id) {
    e.preventDefault();

    axios.delete(BACKEND_URL + '/products', {

      // 1. On lui envoie l'id du product selectionné pour être supprimé et on le récupére dans le server avec req.body.id
      data: { id }
    })
      .then(res => {
        alert(res.data.msg)
        setLoading(false)

        // On appelle la function qui récupére la liste des produits afin d'actualiser le composant
        getProducts()
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })

    }

  // Générer une liste qui contient le prix de chaque produit
  // let listPrix = products.map(e => e.price)

  // On utilise la liste récupéré et on lui fait un reduce qui va sommer chaque élement de cette liste
  // let totalPrice = listPrix.reduce(
    // (accumulator, currentValue) => accumulator + currentValue, 0)

  useEffect(() => {
    getProducts()
  }, []);

  return (

    loading ? <h1>Loading ..</h1> :

      <div className='products'>

        <h1 className="text-4xl font-bold">DASHBOARD</h1>
       <button onClick={handelLogout} className="btn p-1 mt-3 bg-gray-600 font-bold text-white">
        Logout
        </button>

        {/* On affiche le prix totale des produits */}
        {/* <h2 style={{ marginBottom: "5vh" }}> Prix totale des ventes : <span className="prt"> {totalPrice.toFixed(2)} </span> DZD</h2> */}
        
        <button type="button" className="details" data-bs-toggle="modal" data-bs-target="#addProduct">
          Add product
        </button>


        {/* MODAL POUR AJOUTER UN PRODUIT */}
        <div className="modal fade" id="addProduct" tabIndex="-1" aria-labelledby="addProductLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Ajouter un produit</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                {/* 2. On appelle la function dans le onsubmit du formulaire */}
                <form onSubmit={addProduct}>
                  <div className='input-wrapper'>
                    <label className="modSpace" htmlFor="title">Title </label>
                    <input type="text" id='title' name='title' />
                  </div>
                  {/* <div className='input-wrapper'>
                    <label htmlFor="price">Price</label>
                    <input type="number" id='price' name='price' />
                  </div> */}
                  <div className='input-wrapper'>
                    <label className="modSpace" htmlFor="category">Category </label>
                    <input type="text" id='category' name='category' />
                  </div>
                  <div className='input-wrapper'>
                    <label className="modSpace" htmlFor="description">Description </label>
                    <input type="text" id='description' name='description' />
                  </div>
                  <div className='input-wrapper'>
                    <label className="modSpace" htmlFor="image">Image </label>
                    <input type="text" id='image' name='image' />
                  </div>
                  {/* <div className='input-wrapper'>
                    <label htmlFor="rate">Rate</label>
                    <input type="number" id='rate' name='rate' />
                  </div>
                  <div className='input-wrapper'>
                    <label htmlFor="count">Count</label>
                    <input type="number" id='count' name='count' />
                  </div> */}

                  <button className="validMod" type='submit'>Valider</button>
                </form>
              </div>
            </div>
          </div>
        </div>


        {/* MODAL POUR MODIFIER UN PRODUIT */}
        <div className="modal fade" id="editProduct" tabIndex="-1" aria-labelledby="editProductLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modifier un Produit </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={editProduct}>
                  <div className='input-wrapper'>
                    <label className="modSpace" htmlFor="title">Title </label>
                    <input defaultValue={produitSelectionne.title} type="text" id='title' name='title' />
                  </div>                
                  <div className='input-wrapper'>
                    <label className="modSpace" htmlFor="category">Category </label>
                    <input defaultValue={produitSelectionne.category} type="text" id='category' name='category' />
                  </div>
                  <div className='input-wrapper'>
                    <label className="modSpace" htmlFor="description">Description </label>
                    <input defaultValue={produitSelectionne.description} type="text" id='description' name='description' />
                  </div>
                  <div className='input-wrapper'>
                    <label className="modSpace" htmlFor="image">Image </label>
                    <input defaultValue={produitSelectionne.image} type="text" id='image' name='image' />
                  </div>
                   {/* <div className='input-wrapper'>
                    <label htmlFor="price">Price</label>
                    <input defaultValue={produitSelectionne.price} type="number" id='price' name='price' />
                  </div> */}
                  {/* <div className='input-wrapper'>
                    <label htmlFor="rate">Rate</label>
                    <input defaultValue={produitSelectionne?.rating?.rate} type="number" id='rate' name='rate' />
                  </div> */}
                  {/* <div className='input-wrapper'>
                    <label htmlFor="count">Count</label>
                    <input defaultValue={produitSelectionne?.rating?.count} type="number" id='count' name='count' />
                  </div> */}

                  <button className="validMod" type='submit'>Valider</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='products-container'>
          {products?.map((product, index) => {
            return (
              <div className="product-card" key={index}>
                <img className="img" src={product.image} alt={product.title} width='150px' />
                <p className="title">{product.title}</p>
                <div style={{ display: 'flex' }}>
                  {/* <h6>{product.price}$</h6> */}
                  {/* <h6>{product?.rating?.rate}</h6> */}
                  {/* <h6>{product?.rating?.count}</h6> */}
                </div>
                <div>
                  <button  type="button" data-bs-toggle="modal" data-bs-target="#editProduct" className="details"
                    onClick={() => setProduitSelectionne(product)}>Modifier le produit</button>
                  <button className="delete" onClick={(e) => deleteProduct(e, product.id)}>Supprimer</button>
                </div>
              </div>

            )
          })}

        </div>
      </div>
  )
}
