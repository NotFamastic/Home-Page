import React, { useEffect, useState } from "react";
import { CD,UD } from "../../Shared/Types";
import { getNextAlarm, Widget } from "../../Shared/Widget";
import {Button, Modal, Image, Container, Col, Nav, Row, Tab } from "react-bootstrap";

export default function SettingsUi({userdata}:{userdata:UD}): React.ReactElement {
  const [key, setKey] = useState("home");
  const [sv, setSV] /*Settings Visibliy*/ = useState(false);
  return (
    <>
      <Button
        variant="white"
        onClick={() => {
          setSV(!sv);
        }}
      >
        <Image src="../../public/Assets/SettingIcon.svg"></Image>
      </Button>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        dialogClassName="modal-90w"
        show={sv}
        onHide={() => setSV(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Setting</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Tab.Container id="left-tabs-example" defaultActiveKey="general">
            <Row>
              <Col>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="general">General</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col>
                <Tab.Content>
                  <Tab.Pane eventKey="general">
                    <h3>Preference</h3>

                  </Tab.Pane>
                  <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Modal.Body>
      </Modal>
    </>
  );
}
