import React from "react";
import "../styles/app.css"; // Import CSS for About page

const About = () => {
  return (
    <div className="about-section">
      <div className="container">
        <h1 className="text-center">About SafeVoice: Speak Without Fear</h1>
        <p className="text-muted text-center">
          Empowering individuals to report incidents, seek help, and raise their voice.
        </p>

        <div className="row mt-5">
          {/* Mission Section */}
          <div className="col-md-6">
            <h3>🎯 Our Mission</h3>
            <p>
              SafeVoice aims to provide a secure platform for victims of harassment and violence.
              Our mission is to empower individuals by offering them access to legal help, counseling,
              and anonymous reporting tools.
            </p>
          </div>

          {/* Vision Section */}
          <div className="col-md-6">
            <h3>🌟 Our Vision</h3>
            <p>
              We envision a future where no one feels afraid to speak up about their experiences.
              Through technology and community support, we are dedicated to creating safer environments
              for everyone.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="row mt-5">
          <div className="col-md-4">
            <h4>🔒 Privacy & Security</h4>
            <p>
              We prioritize user privacy by using encrypted systems and secure storage methods.
            </p>
          </div>
          <div className="col-md-4">
            <h4>🤝 Empowerment</h4>
            <p>
              We believe in giving a voice to victims, providing resources to help them take action.
            </p>
          </div>
          <div className="col-md-4">
            <h4>🌐 Inclusivity</h4>
            <p>
              SafeVoice is accessible to people from all backgrounds, ensuring that everyone
              feels safe and supported.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mt-5">
          <h5>📩 Contact Us</h5>
          <p>
            For inquiries or assistance, feel free to{" "}
            <a href="mailto:support@safevoice.com">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
