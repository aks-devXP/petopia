import React from 'react';

const Header = ({
  path = "/contact-vid.mp4",
  highlighted = "digital masterpieces",
  normal1 = "Crafting",
  normal2 = "with pixel-perfect precision.",
  textcol ="white",
  highlightedcol = "#FFBF1A"
}) => {
  return (
    <section id="hero" style={{ position: "relative", color: "white" }}>
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        id="media"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      >
        <source src={path} type="video/mp4" />
        <source src={path} type ="video/webM" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "4rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h1
          style={{
            fontSize: "4.875rem",
            fontWeight: 700,
            lineHeight: 1.2,
            maxWidth: "80%",
            color: textcol
          }}
        >
          {normal1} <span style={{ color:highlightedcol }}>{highlighted}</span>{" "}
          {normal2}
        </h1>
      </div>
    </section>
  );
};

export default Header;