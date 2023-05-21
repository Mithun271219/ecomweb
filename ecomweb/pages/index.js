import React, { useEffect } from "react";
import Link from "next/link"
import axios from "axios"
import { useContext } from "react";
import Context from "@/Components/Context/Context";
// const Body = React.lazy(() => import('../Components/Body'));
import Body from "../Components/Body";
import { CircularProgress } from '@mui/material';

let api = 'http://localhost:5000'

export default function Home() {

  let { products, setProducts } = useContext(Context);
  const [loading, setLoading] = React.useState(true);

  // useEffect(() => {
  //   const loadData = async () => {
  //     // Simulate data loading
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     setLoading(false);
  //   };

  //   loadData();
  // }, []);  

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      {
        loading ?
          <div className="productsSpinners">< CircularProgress /></div> :
          <Body products={products} />
      }

    </>
  )
}


// export async function getServerSideProps() {
//   try {
//     let { data } = await axios.get(`${api}/products`);
//     return {
//       props: { products: data }
//     }
//   } catch (error) {
//     console.error(error);
//     return {
//       props: { products: null }
//     }
//   }
// }