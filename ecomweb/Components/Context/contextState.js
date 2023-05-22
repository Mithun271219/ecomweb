import Context from "./Context";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ContextState({ children }) {

    const backendLink = `https://ecomweb-backend.onrender.com`

    const [isLogin, setIsLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [signUpData, setSignUpData] = useState([]);
    let [user, setUser] = useState('');

    async function getproducts() {
        let { data } = await axios.get(`${backendLink}/products`);
        setProducts(data);
    }

    async function getuser() {
        try {
            let { data } = await axios.get(`${backendLink}/user`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setUser(data);
            setIsLogin(true)
        } catch (error) {
            console.log(error);
            setIsLogin(false);
        }
    }

    useEffect(() => {
        getproducts()
    }, [])


    return (
        <Context.Provider value={{ backendLink, products, setProducts, user, setUser, isLogin, setIsLogin, getuser, signUpData, setSignUpData }}>
            {children}
        </Context.Provider>
    )
}