import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  React.useEffect(() => {
    if (!props.isLoggedIn && !localStorage.getItem('jwt')) {
      props.setLoginPopup(true);
    }
  }, [props]);
  return (
    <Route>
      {
            () => (props.isLoggedIn ? <Component {...props} /> : <Redirect to="./" />)
        }
    </Route>
  );
};

export default ProtectedRoute;
