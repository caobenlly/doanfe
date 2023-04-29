/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/style-prop-object */
import React from "react";

function LienHe() {
  return (
    <div
      style={{
        height: "500px",
        width: "95%",
        display: "flex",
        margin: '0 50px',
        justifyContent: "center",
      }}
    >
      <div id="map" style={{width: "100%",}}>
        {" "}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7034.649489635212!2d106.21440960718905!3d20.933399986306295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135993a1557b9b3%3A0x360e2fc326c39df!2zTmfDoyB0xrAgR2jhur0!5e0!3m2!1svi!2s!4v1618842061325!5m2!1svi!2s"
          style={{
            width: "100%",
            height: "500px",
            border: "0",
          }}
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default LienHe;
