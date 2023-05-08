import '@/styles/globals.scss'
import { store } from '../store/store'
import { Provider } from 'react-redux'
import Header from '@/components/header/header'
import { useState } from 'react'
import { useEffect } from 'react'


 function App({ Component, pageProps }) {

  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {

  
  return (
    <>
    <Provider store={store}>
      <Header/>
    <Component {...pageProps} />
     </Provider>
    </>
  ) 
  }
}

export default App
