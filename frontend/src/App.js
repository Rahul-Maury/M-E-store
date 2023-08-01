
import './App.css';
import Header from './component/layout/Header/Header.js'
import Footer from './component/layout/Footer/Footer.js'
import { BrowserRouter as Router,Route ,Switch} from 'react-router-dom';
import Home from './component/Home/Home.js'
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import { useEffect ,useState} from 'react';

import axios from 'axios';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions.js';
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile";
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile.js'
import UpdatePassword from './component/User/UpdatePassword.js'
import ForgotPassword from './component/User/ForgotPassword.js'
import ResetPassword from './component/User/ResetPassword.js';
import Cart from "./component/Cart/Cart";
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment.js';
import OrderSuccess from './component/Cart/OrderSuccess.js';
import MyOrders from './component/Order/MyOrders.js'
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/Admin/Dashboard.js';
import ProductList from './component/Admin/ProductList.js';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from "./component/Admin/UpdateProduct";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UpdateUser from './component/Admin/UpdateUser';
import OrderList from "./component/Admin/OrderList";
import UsersList from "./component/Admin/UserList";
import About from "./component/layout/About/About";
import ProductReviews from "./component/Admin/ProductReviews";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
//  import NotFound from "./component/layout/NotFound/NotFound";
import Contact from './component/layout/Contact/Contact';
function App() {

const{isAuthenticated,user}=useSelector(state=>state.user);
const [stripeApiKey, setStripeApiKey] = useState("");


async function getStripeApiKey() {
 const { data } = await axios.get("/api/v1/stripeapikey");

  setStripeApiKey(data.stripeApiKey);
}

useEffect(()=>{
 store.dispatch(loadUser());
 getStripeApiKey();
},[]);




  return (

    <Router>
         <Header/>
         {
          isAuthenticated&&<UserOptions user={user}/>
         }

      {/* {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )} */}
    
        
          <Route exact path="/" component={Home}/>
          <Route exact path="/product/:id" component={ProductDetails}/>
          <Route path="/products/:keyword" component={Products}/>
          <Route exact path="/products" component={Products}/>  
          <Route exact path="/search" component={Search}/>
          <Route exact path="/contact" component={Contact} />

          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={LoginSignUp}/>
          <ProtectedRoute exact path="/account" component={Profile}/>
          {/* <Route exact path="/account" component={Profile}/> */}
          <ProtectedRoute  exact path="/me/update" component={UpdateProfile}/>
          <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
          <Route exact path="/password/forgot" component={ForgotPassword}/>
          <Route exact path="/password/reset/:token" component={ResetPassword} />
          <Route exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/shipping" component={Shipping} />
          
         {stripeApiKey&&(<Elements stripe={loadStripe(stripeApiKey)}>
          
          <ProtectedRoute  exact path="/process/payment" component={Payment}/>
          </Elements>)
        }
         <ProtectedRoute exact path="/success" component={OrderSuccess}/>
         <ProtectedRoute exact path="/orders" component={MyOrders} />
         
         <Switch>
         <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
         <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
         </Switch>

         <ProtectedRoute isAdmin={true} exact path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList}/>
        <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />


           <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
        />
         <ProtectedRoute 
            exact path="/admin/order/:id"
            isAdmin={true}
            component={ProcessOrder}
  
  
          />


          <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />

         <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />

         <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        />
        {/* <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        /> */}
    
        <Footer/>
    </Router>
  
  );
}

export default App;
