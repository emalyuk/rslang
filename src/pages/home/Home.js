import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeInfo } from "./HomeSliceReducer";

export const Home = () => {
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(getHomeInfo());
  }, []);

  return (
    <div className="home">
      <h1>Home</h1>
      <div className="home-container">
        <h2>Our response is: </h2>
        {data.map((value, index) => (
          <div key={index}>{value}</div>
        ))}
      </div>
    </div>
  );
};

export default Home;
