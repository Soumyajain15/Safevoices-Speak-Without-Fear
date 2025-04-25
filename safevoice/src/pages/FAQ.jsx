import React from "react";
import { Container, Accordion } from "react-bootstrap";
import "./FAQ.css";

const FAQ = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Frequently Asked Questions (FAQ)</h2>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>What is SafeVoice?</Accordion.Header>
          <Accordion.Body>
            SafeVoice is a platform that empowers women by providing legal aid, anonymous reporting, and counseling services to ensure safety and support.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>How can I report an incident?</Accordion.Header>
          <Accordion.Body>
            You can report an incident anonymously through our reporting system. Your identity will be kept confidential.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>How do I book a counseling session?</Accordion.Header>
          <Accordion.Body>
            Visit the Counseling section and book a virtual session with certified professionals to receive emotional support.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Is my information kept private?</Accordion.Header>
          <Accordion.Body>
            Yes, SafeVoice uses encryption to ensure all reports and counseling sessions remain confidential. Your data is protected, and your identity will never be exposed.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>Are the counselors certified professionals?</Accordion.Header>
          <Accordion.Body>
            Yes, all our counselors are certified and trained professionals specializing in trauma, mental health, and emotional support.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>Can I check the status of my incident report?</Accordion.Header>
          <Accordion.Body>
            Yes, you can track the status of your report anonymously through our <strong>Incident Tracker</strong> feature.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>How do I access legal resources?</Accordion.Header>
          <Accordion.Body>
            You can access legal information, FAQs, and connect with legal advisors by visiting the <strong>Legal Help Desk</strong> section.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="7">
          <Accordion.Header>Does SafeVoice offer multilingual support?</Accordion.Header>
          <Accordion.Body>
            Yes, we are working towards offering multilingual support to ensure accessibility for diverse users.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="8">
          <Accordion.Header>Can I upload evidence when submitting a report?</Accordion.Header>
          <Accordion.Body>
            Yes, when you report an incident, you can upload relevant evidence such as images or documents to strengthen your case.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="9">
          <Accordion.Header>Is SafeVoice available as a mobile app?</Accordion.Header>
          <Accordion.Body>
            We are currently developing a mobile app that will sync data between the web platform and the mobile version for a seamless user experience.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="10">
          <Accordion.Header>How can I contact support?</Accordion.Header>
          <Accordion.Body>
            You can contact our support team by visiting the <strong>Contact Us</strong> section or emailing us at <a href="mailto:support@safevoice.com">support@safevoice.com</a>.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default FAQ;
