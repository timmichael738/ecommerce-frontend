import './App.css';
import { Outlet } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice';
import PreLoader from './components/PreLoader';


function App() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);


  const fetchUserDetails = async () => {
    setLoading(true);
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    });



    const response = await dataResponse.json();

    if (response.success) {
      dispatch(setUserDetails(response.data))
    }
    setLoading(false);

  }




  useEffect(() => {
    /* userDetails*/
    fetchUserDetails()


  }, [])

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <Context.Provider value={{ fetchUserDetails }}>
          <ToastContainer />
          <Header />
          <main className="min-h-[calc(100vh-120px)] pt-16">
            <Outlet />
          </main>
          <Footer />
        </Context.Provider>
      )}
    </>
  );
}

export default App;
