import { dataUsers, dataRepartidores } from "../../shared/tabsAdminReport";
import { TableSide } from "./TableSide";

export function NavbarReportes({ content }) {
  return (
    <>
      <nav className="nav-extended indigo darken-3">
        <div className="nav-wrapper">
          <div className="row">
            <a href="#!" className="brand-logo center col s12">
              {content.title}
            </a>
          </div>
        </div>
        <div className="nav-content">
          <ul className="tabs tabs-transparent tabs-fixed-width">
            {content.tabs.map((tab, index) => {
              return (
                <li className="tab" key={index}>
                  <a href={"#" + tab.title}>
                    <div className="row">
                      <div className="col s8 offset-s3 valign-wrapper hide-on-med-and-down">
                        <i
                          className="material-icons left"
                          style={{ marginBottom: "0", marginRight: "25px" }}
                        >
                          {tab.icon}
                        </i>
                        {tab.title}
                      </div>
                      <i
                        className="material-icons show-on-medium-and-down hide-on-large-only tooltipped"
                        data-position="bottom"
                        data-tooltip={tab.title}
                      >
                        {tab.icon}
                      </i>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {content.tabs.map((tab, index) => {
        return (
          <div id={tab.title} key={index} className="col s12">
            {content.type === "usuarios" && (
              <div className="row" style={{ padding: "15px" }}>
                <div
                  className="col s4"
                  style={{ height: "250px", overflow: "scroll" }}
                >
                  <TableSide data={dataUsers} />
                </div>
                <div className="col s8"></div>
              </div>
            )}

            {content.type === "repartidores" && (
              <div className="row" style={{ padding: "15px" }}>
                <div
                  className="col s4"
                  style={{ height: "250px", overflow: "scroll" }}
                >
                  <TableSide data={dataRepartidores}/>
                </div>
                <div className="col s8"></div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
