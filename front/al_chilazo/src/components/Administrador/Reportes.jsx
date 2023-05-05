import { useEffect } from "react";
import "../../styles/Administrador/reportes.css";
import { NavbarReportes } from "./NavbarReportes";
import { data, data2, data3 } from "../../shared/tabsAdminReport";

export function Reportes() {
  useEffect(() => {
    var elems = document.querySelectorAll(".carousel");
    M.Carousel.init(elems, {
      fullWidth: true,
      dist: 25
    });

    var elem = document.querySelectorAll(".tabs");
    M.Tabs.init(elem, {
      duration: 100,
    });

    var elems = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(elems, {
      inDuration: 200,
      outDuration: 200,
    });
  });

  const next = () => {
    var elem = document.getElementById("carouselReportes")
    var instance = M.Carousel.getInstance(elem);
    instance.next()
  }

  const prev = () => {
    var elem = document.getElementById("carouselReportes")
    var instance = M.Carousel.getInstance(elem);
    instance.prev()
  }

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h2 className="red-text text-darken-3 center-align">REPORTES</h2>
            <div className="divider"></div>
          </div>
        </div>
      </div>
      <div
        className="carousel carousel-slider center" 
        style={{ height: "475px" }}
        id="carouselReportes"
      >
        <div className="carousel-fixed-item center">
          <div className="row">
            <div className="col s1 offset-s5">
              <a
                href="#!"
                className="waves-effect waves-light btn indigo darken-4 center tooltipped"
                data-position="top"
                data-tooltip="Prev"
                onClick={prev}
              >
                <i className="material-icons">arrow_back</i>
              </a>
            </div>
            <div className="col s1">
              <a
                href="#!"
                className="waves-effect waves-light btn indigo darken-4 center tooltipped"
                data-position="top"
                data-tooltip="Next"
                onClick={next}
              >
                <i className="material-icons">arrow_forward</i>
              </a>
            </div>
          </div>
        </div>
        <div className="carousel-item" href="#one!">
          <NavbarReportes content={data} />
        </div>
        <div className="carousel-item" href="#two!">
          <NavbarReportes content={data2} />
        </div>
        <div className="carousel-item" href="#three!">
          <NavbarReportes content={data3} />
        </div>
      </div>
    </section>
  );
}
