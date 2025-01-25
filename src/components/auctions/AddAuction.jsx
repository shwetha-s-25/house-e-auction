import { Button, Form, Modal, Alert, Row, Col } from "react-bootstrap";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

export const AddAuction = ({ setAuction }) => {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const itemTitle = useRef();
  const itemDesc = useRef();
  const startPrice = useRef();
  const itemDuration = useRef();
  const itemImage = useRef();
  const bedrooms = useRef();
  const bathrooms = useRef();
  const surface = useRef();
  const year = useRef();
  const type = useRef();
  const address = useRef();
  const country = useRef();
  const agentname = useRef();
  const agentnumber = useRef();
  const location = useLocation();
  const upcomingEvent = location.pathname === "/upcoming";

  const { currentUser } = useContext(AuthContext);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const imgTypes = ["image/png", "image/jpeg", "image/jpg"];

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");

    if (!imgTypes.includes(itemImage.current.files[0].type)) {
      return setError("Please use a valid image");
    }
    let currentDate;
    let dueDate;
    if (location.pathname === "/upcoming") {
      currentDate = new Date(itemDuration.current.value);
      dueDate = currentDate.setSeconds(3600 * 4);
    } else {
      currentDate = new Date();
      dueDate = currentDate.setSeconds(itemDuration.current.value * 3600);
    }

    let newAuction = {
      email: currentUser.email,
      title: itemTitle.current.value,
      type: type.current.value,
      desc: itemDesc.current.value,
      curPrice: startPrice.current.value,
      bedrooms: bedrooms.current.value,
      bathrooms: bathrooms.current.value,
      surface: surface.current.value,
      year: year.current.value,
      country: country.current.value,
      address: address.current.value,
      duration: dueDate,
      itemImage: itemImage.current.files[0],
      agentname: agentname.current.value,
      agentnumber: agentnumber.current.value,
      upcomingEvent: upcomingEvent,
    };

    setAuction(newAuction);
    closeForm();
  };

  return (
    <>
      <div className="col d-flex justify-content-center my-3">
        <div onClick={openForm} className="btn btn-outline-secondary mx-2">
          + Auction
        </div>
      </div>
      <Modal centered show={showForm} onHide={closeForm}>
        <form onSubmit={submitForm}>
          <Modal.Header>
            <Modal.Title>Create Auction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Item Title</Form.Label>
                  <Form.Control type="text" required ref={itemTitle} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Item Description</Form.Label>
                  <Form.Control type="text" required ref={itemDesc} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <label for="exampleFormControlSelect1">
                    Number of Bedrooms
                  </label>
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    ref={bedrooms}
                  >
                    <option>One</option>
                    <option>Two</option>
                    <option>Three</option>
                    <option>Four</option>
                  </select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <label for="exampleFormControlSelect1">
                    Number of Bathrooms
                  </label>
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    ref={bathrooms}
                  >
                    <option>One</option>
                    <option>Two</option>
                    <option>Three</option>
                    <option>Four</option>
                  </select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Year of Construction</Form.Label>
                  <Form.Control type="number" required ref={year} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Area in Sqft</Form.Label>
                  <Form.Control type="number" required ref={surface} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Start Price</Form.Label>
                  <Form.Control type="number" required ref={startPrice} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  {location.pathname === "/upcoming" ? (
                    <>
                      <Form.Label>Auction Start Date</Form.Label>
                      <Form.Control type="date" required ref={itemDuration} />
                    </>
                  ) : (
                    <>
                      <Form.Label>Item Duration in hours</Form.Label>
                      <Form.Control type="number" required ref={itemDuration} />
                    </>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" required ref={address} />
                </Form.Group>
              </Col>
              <Col>
                <label for="exampleFormControlSelect1">Country</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  ref={country}
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Sri Lanka</option>
                  <option>India</option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col>
                <label for="exampleFormControlSelect1">Type</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  ref={type}
                >
                  <option>Apartment</option>
                  <option>House</option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Seller Name</Form.Label>
                  <Form.Control type="text" required ref={agentname} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Seller Number</Form.Label>
                  <Form.Control type="number" required ref={agentnumber} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Seller</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentUser.email}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Item Image</Form.Label>
                  <Form.Control
                    type="file"
                    label="Select Item Image"
                    custom
                    required
                    ref={itemImage}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeForm}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
