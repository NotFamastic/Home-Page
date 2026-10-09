//!
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
//!
import {
  Button,
  Modal,
  Image,
  Container,
  Col,
  Nav,
  Row,
  Tab,
  Form,
} from "react-bootstrap";
//!
import { UserD, themes, SettD } from "../Shared/Types";
import { UpdateUserD } from "../Shared/UserData/Functions";
import { ThemeList } from "../Shared/Variables";

export default function SettingsUi({
  SettData,
  setUserdata,
  Close,
}: {
  SettData: SettD;
  setUserdata: Dispatch<SetStateAction<UserD>>;
  Close: () => void;
}): React.ReactElement {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="modal-90w"
      show
      onHide={Close}
    >
      <Modal.Header closeButton>
        <Modal.Title>Setting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
                <Button variant="Danger" onClick={()=>{
                  localStorage.clear()
                  
                }}>Remove DATA</Button>
              </Col>
              <Col>
                <Tab.Content>
                  <Tab.Pane eventKey="general">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Appearence</Form.Label>
                      <Form.Select>
                        <option value="Light">Light</option>
                        <option value="Dark">Dark</option>
                      </Form.Select>
                      <Form.Label>Themes</Form.Label>
                      <Form.Select
                        value={SettData.theme}
                        onChange={(e) => {
                          const n = UpdateUserD("Setting", {
                            ...SettData,
                            theme: e.target.value as themes,
                          });

                          setUserdata(n);
                        }}
                      >
                        {Object.keys(ThemeList).map((T: string) => {
                          return (
                            <option key={T} value={T}>
                              {T}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
