import { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";

export default function Latest() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/package/show")
      .then((res) => res.json())
      .then((dataRes) => setData(dataRes));
  }, []);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  const datashow = data.map((item) => (
    <>
      <div className="card">
        <img
          src={item.package_image}
          className="card-img-top"
          alt="..."
          style={{ width: "100%", height: "20vw", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{item.details_title_en}</h5>
          <p className="balneo">
            <i
              className="fa-solid fa-location-dot"
              style={{ paddingRight: "5px" }}
            ></i>
            {item.city_name_en}
          </p>

          <p className="balneo">
            Package Period: <span style={{ fontWeight: "blod" }}> From </span>
            <span style={{ color: "#ff5959" }}> {item.period_from}</span>
            <span style={{ fontWeight: "blod" }}> To </span>{" "}
            <span style={{ color: "#ff5959" }}> {item.period_to}</span>
          </p>
          <div>
            <p className="paragraph">
              <span style={{ color: "var(--yellow-color)" }}>
                {item.package_rate === 0 || item.package_rate === null ? (
                  ""
                ) : item.package_rate === 1 ? (
                  <i className="fa-solid fa-star"></i>
                ) : item.package_rate === 2 ? (
                  <>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </>
                ) : item.package_rate === 3 ? (
                  <>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </>
                ) : item.package_rate === 4 ? (
                  <>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </>
                )}
              </span>
            </p>
          </div>
          <p className="card-text">{item.city_details_text1_en}</p>
        </div>
      </div>
    </>
  ));

  return (
    <div className="container pt-5 pb-5">
      <h3 className="fw-bold pt-5 text-center mb-5">Featured Listings</h3>
      <Carousel breakPoints={breakPoints} enableAutoPlay autoPlaySpeed={3000}>
        {datashow}
      </Carousel>
    </div>
  );
}
