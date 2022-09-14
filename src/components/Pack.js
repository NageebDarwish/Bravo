import { useState } from "react";
import { Link } from "react-router-dom";

import Header from "./Header";

import Footer from "./Footer";

import { useEffect } from "react";

export default function Pack() {
  const [data, setData] = useState([]);

  const id = Number(window.location.pathname.substr(-1));
  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/package/show")
      .then((res) => res.json())
      .then((dataRes) => setData(dataRes.filter((x) => x.hotel_id === id)));
  }, []);

  const items = data.map((item) => (
    <div
      style={{
        marginBottom: "2rem",
        boxShadow: "0 2px 15px rgb(0 0 0 / 10%)",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <div class="header">
        <p style={{ marginBottom: "0" }}>Package</p>
      </div>
      <div class="pakeg">
        <div class="content">
          <h1>{item.details_title_en}</h1>

          <p class="balneo">
            Package Period:{" "}
            <span style={{ color: "var(--yellow-color)" }}>
              {item.package_period}
            </span>
          </p>
          <p class="balneo">
            Package Price:{" "}
            <span style={{ color: "var(--yellow-color)" }}>
              {item.package_price}$
            </span>
          </p>
          <div>
            <p class="paragraph">
              Description:{" "}
              <span style={{ color: "var(--yellow-color)" }}>
                {item.details_text1_en}
              </span>
            </p>
            <p class="paragraph">
              Brif:{" "}
              <span style={{ color: "var(--yellow-color)" }}>
                {item.details_text2_en}
              </span>
            </p>
          </div>
          <Link to={`deatils/${item.id}`}>
            <div
              className="btn roundrd-circle main-btn btn-login"
              style={{ marginLeft: "10px" }}
            >
              Deatils
            </div>
          </Link>
        </div>
        <img src={item.package_image} width={"500px"} height="300px" />
      </div>
    </div>
  ));
  return (
    <>
      <Header />
      <div class="container" style={{ marginTop: "10%" }}>
        {items}
      </div>
      <Footer />
    </>
  );
}