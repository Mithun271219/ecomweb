import '@/styles/globals.css'
import Layout from '@/Components/Layout';
import ContextState from '@/Components/Context/contextState';

export default function App({ Component, pageProps }) {
  return (
    <ContextState>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextState>
  )
}
