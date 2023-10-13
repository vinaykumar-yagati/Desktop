import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Form() {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [des, setDes] = useState('');
  const [imgurl, setImgurl] = useState('');
  const [products, setProducts] = useState([{}]);

  const productsData = {
    productId: id,
    title: title,
    brand: brand,
    price: price,
    des: des,
    imgurl: imgurl
  }
  //const fetchData=()=>{
    useEffect(() => {
      axios.get('http://localhost:3002/productsData')
        .then((res) => {
          setProducts(res.data)
        }).catch((error) => {
          console.error("Error Get Add data")
        },0 )
    }, [])
  //}
  console.log(products)
  const handleSubmit = (e) => {
    e.preventDefault();
     console.log(productsData)
    axios.post('http://localhost:3002/productsData', productsData)
      .then((res) => {
        alert("success")
        setId('')
      }).catch((error) => {
        console.error("Error to Add data")
      })
        //fetchData()
      
  }
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3002/productsData/${id}`)
    .then((res)=>{
      alert("Product Deleted")
    })
      //fetchData()
    }
  let sno = 1
  return (
    <>
    <div className='container-fluid bg-info'>
      <br></br>
    <table className='table table-bordered'>
        <thead>
          <tr>
            <th>S.No</th>
            <th>P Id</th>
            <th>Title</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            products.map((e, i) => {
              return (
                <tr>
                  <td>{sno++}</td>
                  <td>{e.productId}</td>
                  <td>{e.title}</td>
                  <td>{e.brand}</td>
                  <td>{e.price}</td>
                  <td>{e.des}</td>
                  <td><img src={e.imgurl} height="100px" /></td>
                  <td><button type="submit" class="btn btn-danger" onClick={e.id}>Delete</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className='row justify-content-center'>
        <div className='col-md-6 img-thumbline bg-warning'>
          <br></br>
        
          <h3 className='text-center text-primary'>Add Product</h3>
          <form action="" method='post' onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="id">product id</label>
              <input type="text" class="form-control" id="id" value={id} onChange={(e) => setId(e.target.value)} />
            </div>
            <div class="form-group md-3">
              <label for="title">title</label>
              <input type="text" class="form-control" id="title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
            </div>
            <div class="form-group md-3">
              <label for="brand">brand:</label>
              <input type="text" class="form-control" id="brand" value={brand} onChange={(e) => { setBrand(e.target.value) }} />
            </div>
            <div class="form-group md-3">
              <label for="price">price:</label>
              <input type="text" class="form-control" id="price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
            </div>
            <div class="form-group md-3">
              <label for="des">description:</label>
              <input type="text" class="form-control" id="des" value={des} onChange={(e) => { setDes(e.target.value) }} />
            </div>
            <div class="form-group md-3">
              <label for="imgurl">Img url:</label>
              <input type="text" class="form-control" id="imgurl" value={imgurl} onChange={(e) => { setImgurl(e.target.value) }} />
            </div>

            <button type="submit" class="btn btn-danger">Submit</button>
          </form>

        </div>


      </div>
      <br></br>
      
      </div>
    </>
  )
}