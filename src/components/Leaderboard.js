import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";

const Leaderboard = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("/api/getlevels")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Container fluid className="home-section" id="home">
        <Container className="about-content">
          <Row>
            <Col md={12} className="heading" style={{ textAlign: "center" }}>
              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: "600",
                  letterSpacing: "0.2rem",
                  paddingBottom: "1rem",
                }}
              >
                <b className="purple">LEADERBOARD </b>
              </h1>
              <p
                className="home-about-body"
                style={{
                  textAlign: "center",
                  fontSize: "1.2rem",
                }}
              ></p>
              <div className="leaderboard">
                <div className="spanboard">
                <label>POSITION</label>
                <label>TEAMNAME</label>
                <label>LEVEL</label>
                </div>
                {data.map((team, idx) => (
                  <div className="team">
                    <div className="pos">{idx}</div>
                    <div className="team-stat">{team.teamname}</div>
                    <div className="points">{team.atlevel}</div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Leaderboard;
