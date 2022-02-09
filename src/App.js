import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import UserLogin from "./components/UserLogin/UserLogin";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { logout, setUserId, login } from "./features/userSlice";
import { resetFav, addToFav } from "./features/userFavoritesSlice";
import { resetCart, addToCart } from "./features/userCartSlice";
import { ref, onValue, update } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "./firebase";
import Favorites from "./components/Favorites/Favorites";
import Cart from "./components/Cart/Cart";
import Shop from "./components/Shop/Shop";
import ShopMen from "./components/Shop/ShopMen";
import ShopWomen from "./components/Shop/ShopWomen";
import ProductView from "./components/ProductView/ProductView";
import Checkout from "./components/Checkout/Checkout";
import OrderConfirmation from "./components/OrderConfirmation/OrderConfirmation";
import UserAlert from "./assets/UserAlerts/UserAlert";
import Intro from "./assets/Intro/Intro";

function App() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites.favorites);
  const cart = useSelector((state) => state.cart.cart);

  //favorites & cart updates
  useEffect(() => {
    const updateFireBase = () => {
      const userRef = ref(db, "users/" + userId);
      try {
        update(userRef, {
          cart,
          favorites,
        });
      } catch (e) {
        console.log(e);
      }
    };
    if (auth.currentUser) {
      updateFireBase();
    }
  }, [favorites, cart, userId]);

  //toggle quick cart

  //Set User profile
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const getUserInfo = (userId) => {
        return onValue(
          ref(db, "/users/" + userId),
          (snapshot) => {
            const username =
              (snapshot.val() && snapshot.val().username) || "Anonymous";
            const lastName =
              (snapshot.val() && snapshot.val().lastName) || "Anonymous";
            const email =
              (snapshot.val() && snapshot.val().email) || "Anonymous";
            dispatch(
              login({ userName: username, lastName: lastName, email: email })
            );
            dispatch(setUserId(userId));
          },
          {
            onlyOnce: true,
          }
        );
      };
      const getUserFavorites = (userId) => {
        return onValue(
          ref(db, "/users/" + userId + "/favorites"),
          (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val();
              dispatch(addToFav(childData));
            });
          },
          {
            onlyOnce: true,
          }
        );
      };
      const getUserCart = (userId) => {
        return onValue(
          ref(db, "/users/" + userId + "/cart"),
          (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val();
              dispatch(addToCart(childData));
            });
          },
          {
            onlyOnce: true,
          }
        );
      };
      if (user) {
        const currentID = auth.currentUser.uid;
        getUserInfo(currentID);
        getUserFavorites(currentID);
        getUserCart(currentID);
      } else {
        dispatch(logout());
        dispatch(resetFav());
        dispatch(resetCart());
      }
    });
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <Intro />
        <NavBar />
        <UserAlert />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route exact path="/login" element={<UserLogin />} />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route
            exact
            path="/order-confirmation"
            element={<OrderConfirmation />}
          />
          <Route
            exact
            path="/shop"
            element={<Shop />}
          />
          <Route
            exact
            path="/shop-Men"
            element={<ShopMen />}
          />
          <Route
            exact
            path="/shop-Women"
            element={<ShopWomen />}
          />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route
            exact
            path="/product/:productURL/:id"
            element={<ProductView />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
