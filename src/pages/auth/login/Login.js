import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLoginInfo } from "./LoginSliceReducer";

export const Login = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(getLoginInfo());
  }, []);

  return (
    <div className="usc-footer">
      <h1>Login</h1>
      {data.map((value, index) => (
        <div key={index}>{value}</div>
      ))}
    </div>
  );
};

export default Login;
