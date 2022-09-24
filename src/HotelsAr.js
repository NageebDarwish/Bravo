import HeaderAr from "./components/HeaderAr";

import FooterAr from "./components/FooterAr";
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
            src={item.hotel_image}
            style={{
              width: "500px",
              height: "300px",
              objectFit: "cover",
            }}
            alt="Card  cap"
          />
          <h3
            class="card-text"
            style={{ fontWeight: "bold", color: "#ff5959" }}
            dir="rtl"
          >
            {item.hotel_name_ar}
          </h3>
          <h3 class="card-text" dir="rtl">
            {item.hotel_location_ar !== "undefined" ? (
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
                  {item.hotel_location_ar}
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
      <HeaderAr />
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
      <FooterAr />
    </div>
  );
}
