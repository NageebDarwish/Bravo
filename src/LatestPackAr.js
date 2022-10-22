import { useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import HeaderAr from "./components/HeaderAr";
import FooterAr from "./components/FooterAr";
import Loading from "./components/Loading";

import { useEffect } from "react";

export default function Pack() {
  const [deatils, setDeatil] = useState([]);
  const [videos, setVideos] = useState([]);
  const [data, setData] = useState([]);
  const user = localStorage.getItem("email");
  const [userA, setUserA] = useState("");

  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/user/show")
      .then((res) => res.json())
      .then((dataRes) =>
        setUserA(dataRes.find((item) => `"${item.email}"` === user).accepted)
      );
  }, []);
  console.log(data);

  const id = Number(window.location.pathname.split("/").slice(-1)[0]);

  useEffect(() => {
    fetch(`https://test.emkanfinances.net/api/detail/show`)
      .then((res) => res.json())
      .then((dataRes) => setDeatil(dataRes.filter((x) => x.package_id === id)));
  }, []);
  useEffect(() => {
    fetch(`https://test.emkanfinances.net/api/video/show`)
      .then((res) => res.json())
      .then((dataRes) => setVideos(dataRes));
  }, []);
  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/package/show")
      .then((res) => res.json())
      .then((dataRes) =>
        setData(dataRes.filter((x) => x.id === id)[0].package_price)
      );
  }, []);

  const items = deatils.map((item) => (
    <>
      <div>
        <div className="WordStyle">{parse(item.text_ar)}</div>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel slide custom-detail"
        data-bs-ride="carousel"
        style={{ width: "70%", margin: "0 auto" }}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={item.detailimages[0].image}
              className="d-block w-100"
              height={"600px"}
              alt="img"
            />
          </div>
          {deatils
            .map((item) => item.detailimages)[0]
            .slice(1)
            .map((nice) => (
              <div className="carousel-item">
                <img
                  src={nice.image}
                  className="d-block w-100"
                  height={"600px"}
                  alt="img"
                />
              </div>
            ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
          style={{ left: "-10%" }}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
          style={{ right: "-10%" }}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div>
        <div className="WordStyle">{parse(item.text2_ar)}</div>
      </div>
    </>
  ));

  const videosI = videos.map((item) => (
    <div className="col-md-4">
      <video autoPlay muted>
        <source src={`${item.video}`} type="video/mp4" />
      </video>
    </div>
  ));
  return (
    <>
      <HeaderAr />
      {userA ? (
        <div>
          <div className="container arabic" style={{ marginTop: "10%" }}>
            {items}
            <div className="row">{videosI}</div>
            <div
              style={{
                position: "sticky",
                bottom: "0px",
                backgroundColor: "var(--first-color)",
                opacity: "0.8",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-between container"
                style={{
                  paddingBottom: "1rem",
                  paddingTop: "1rem",
                }}
                dir="rtl"
              >
                <h4
                  style={{
                    color: "#FFAD5B",
                  }}
                >
                  سعر البكج: <span style={{ color: "#ff5959" }}>{data}$</span>
                </h4>
                <div
                  className="btn roundrd-circle main-btn btn-book btn-business ms-0 ms-lg-2 mt-0"
                  style={{
                    marginLeft: "10px",
                    width: "120px",
                  }}
                >
                  حجز
                </div>
              </div>
            </div>
          </div>
          <FooterAr />
        </div>
      ) : !localStorage.getItem("email") ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h1 className="text-center">قم بتسجيل الدخول لترى التفاصيل</h1>
          <Link to="/Register" style={{ textAlign: "center" }}>
            {" "}
            <div
              className="btn roundrd-circle main-btn btn-login text-center"
              style={{ marginLeft: "10px" }}
            >
              تسجيل الدخول
            </div>
          </Link>
        </div>
      ) : userA === 0 ? (
        <div
          className="text-center"
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <h1>لم يتم قبولك بعد</h1>
            <a href="/">العودة للصفحة الرئيسية</a>
          </div>
        </div>
      ) : (
        <div style={{ height: "100vh" }}>
          <Loading />
        </div>
      )}
    </>
  );
}
