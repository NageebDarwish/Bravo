import Header from "./components/Header";

import Footer from "./components/Footer";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const [data, setData] = useState([]);

  const id = Number(window.location.pathname.split("/").slice(-1)[0]);
  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/hotel/show")
      .then((res) => res.json())
      .then((dataRes) => setData(dataRes.filter((x) => x.city_id === id)));
  }, []);

  const items = data.map((item) => (
    <Link to={`packages/${item.id}`} style={{ textDecoration: "none" }}>
      <div class="card" style={{ width: "24rem" }}>
        <div class="card-body text-center">
          <img
            class="card-img-top mb-2"
            style={{ width: "500px", height: "300px", objectFit: "cover" }}
            src={item.hotel_image}
            alt="Card cap"
          />
          <h3
            class="card-text"
            style={{ fontWeight: "bold", color: "#ff5959" }}
          >
            {item.hotel_name_en}
          </h3>
          <h3 class="card-text">
            {item.hotel_location_en !== "undefined" ? (
              <>
                {" "}
                <i
                  class="fa-solid fa-location-dot"
                  style={{ color: "var(--yellow-color)" }}
                >
                  {" "}
                </i>{" "}
                <span style={{ fontSize: "22px" }}>
                  {" "}
                  {item.hotel_location_en}
                </span>
              </>
            ) : (
              ""
            )}
          </h3>
        </div>
      </div>
    </Link>
  ));
  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "5rem 0",
          gap: "20px",
        }}
      >
        {items}
      </div>
      <Footer />
    </div>
  );
}
