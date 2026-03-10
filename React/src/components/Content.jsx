import { useState } from 'react'
function Content(){
    const [count,setCount]=useState(0)
    

    const inc=()=>{
        setCount(count+1)
    }
    const dec=()=>{
        setCount(count-1)
    }
    const fetchProducts = async () =>{
        const url = "http://localhost:5000/products"
        const products = await axios.get()
    }
    return <div>
        <h3>Products page</h3>
        <h1>
            <button onClick={dec}>-</button>{count}
            <button onClick={inc}>+</button>
        </h1>
    </div>
}
export default Content;