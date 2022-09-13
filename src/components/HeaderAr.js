


import React from "react";
import { Link } from "react-router-dom";


export default function Header() {


  let handleLogOut = () => {
    localStorage.removeItem('email')
    window.location.href="/ar"
  }

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" dir="rtl">
      <div className="container d-flex justify-content-between align-items-center">
        <img className="img-fluid logo" src={require("../assets/images/logo.png")} />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main"
          aria-controls="main"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main" style={{flexGrow: "0"}}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className="nav-link" to="/ar">الصفحة الرئيسية</Link>
            </li>
            <li className="nav-item">
             <Link className="nav-link" to="/about/ar">عن الشركة</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/contact/ar">تواصل معنا</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/careers/ar">التوظيف</Link>
            </li>
            { !localStorage.getItem('email') && <Link to ='/login'> <div className="btn roundrd-circle main-btn btn-login" style={{marginLeft: '10px'}}>تسجيل الدخول</div></Link>}
            { !localStorage.getItem('email') && <Link to ='/register'> <div className="btn roundrd-circle main-btn btn-login" style={{marginLeft: '10px'}}>تسجيل</div></Link>}
            { localStorage.getItem('email') &&  <button className="btn roundrd-circle main-btn btn-login" onClick={handleLogOut}>تسجيل الخروج</button>}
            <div className="btn roundrd-circle main-btn btn-book btn-business ms-0 ms-lg-2 mt-0">Business B2B</div>
            <div className="lang d-flex align-items-center ms-1 text-black-50"><Link to="/">EN</Link></div>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
}
