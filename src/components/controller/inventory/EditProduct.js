// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { useNavigate, useParams } from 'react-router-dom';

// const EditProduct = () => {
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [description, setDescription] = useState('');
//     const [image, setImage] = useState('');
//     const [serving, setServing] = useState('');

//     // const navigate = useNavigate();
//     const { id } = useParams();

//     const updateProduct = async (e) => {
//         e.preventDefault();
//         await axios.put(`http://localhost:2001/products/${id}`, {
//             name,
//             price,
//             description,
//             image,
//             serving
//         })
//         // navigate("/");
//     }

//     useEffect(() => {
//         getProductById();
//     }, []);

//     const getProductById = async () => {
//         const response = await axios.get(`http://localhost:2001/products/${id}`);
//         setName(response.data.name);
//         setPrice(response.data.price);
//         setDescription(response.data.description);
//         setImage(response.data.image);
//         setServing(response.data.serving);
//     }

//     return (
//         <div>
//             <form onSubmit={updateProduct}>
//                 <div className="field">
//                     <label className="label">Name</label>
//                     <input
//                         className="input"
//                         type="text"
//                         placeholder="name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                 </div>

//                 <div className="field">
//                     <label className="label">Price</label>
//                     <input
//                         className="input"
//                         type="text"
//                         placeholder="Price"
//                         value={price}
//                         onChange={(e) => setPrice(e.target.value)}
//                     />
//                 </div>

//                 <div className="field">
//                     <label className="label">image</label>
//                     <input
//                         className="input"
//                         type="text"
//                         placeholder="image"
//                         value={image}
//                         onChange={(e) => setImage(e.target.value)}
//                     />
//                 </div>

//                 <div className="field">
//                     <label className="label">description</label>
//                     <input
//                         className="input"
//                         type="text"
//                         placeholder="description"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                     />
//                 </div>

//                 <div className="field">
//                     <label className="label">serving</label>
//                     <input
//                         className="input"
//                         type="text"
//                         placeholder="serving"
//                         value={serving}
//                         onChange={(e) => setServing(e.target.value)}
//                     />
//                 </div>

//                 <div className="field">
//                     <button className="button">Update</button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default EditProduct