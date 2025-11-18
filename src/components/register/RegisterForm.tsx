import { useState, ChangeEvent, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

interface FormDataType {
  name: string;
  phone: string;
  email: string;
  grade: string;
  message: string;
}

const RegisterForm = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    phone: "",
    email: "",
    grade: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const GOOGLE_SHEETS_WEBAPP_URL =
    "https://script.google.com/macros/s/AKfycbyPglIv5u21WeEcAe1nAltqsGFTbXd5R8sICO_pGaYpQiQUHebnflS6t0pHrLsgpMBh9Q/exec";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceID = "service_wswswsq";
    const templateID = "template_nzsewus";
    const publicKey = "e5vZ59vfSPFDcwThA";

    try {
      // ✅ Send EmailJS
      await emailjs.send(serviceID, templateID, formData as unknown as Record<string, unknown>, publicKey);

      // ✅ Store to Google Sheets
      fetch(GOOGLE_SHEETS_WEBAPP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      Swal.fire({
        title: "✅ Enquiry Sent!",
        text: "Thank you for your interest. We'll contact you soon!",
        icon: "success",
        timer: 2500,
        showConfirmButton: false,
        background: "#f9fbff",
        color: "#0C2E52",
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        grade: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        title: "❌ Failed!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonColor: "#0C2E52",
        background: "#fff",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="enquiry-section section-padding"
      style={{
        background: "linear-gradient(135deg, #f4f8ff 0%, #e8f0ff 100%)",
        padding: "100px 0",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2 style={{ color: "#0b2b5c", fontWeight: 700 }}>
            Admission <span style={{ color: "#0077cc" }}>Enquiry Form</span>
          </h2>
          <p
            style={{
              color: "#004080",
              maxWidth: "650px",
              margin: "15px auto",
              lineHeight: 1.6,
            }}
          >
            Interested in joining Sahyadri World School? Fill in your details
            below and our admissions team will get in touch with you shortly.
          </p>
        </div>

        <div
          className="form-wrapper mx-auto"
          style={{
            maxWidth: "650px",
            background: "#fff",
            borderRadius: "20px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            padding: "40px",
          }}
        >
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label" style={{ fontWeight: 600 }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter your full name"
                style={{ borderRadius: "10px", padding: "10px" }}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label" style={{ fontWeight: 600 }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter your phone number"
                style={{ borderRadius: "10px", padding: "10px" }}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label" style={{ fontWeight: 600 }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your email"
                style={{ borderRadius: "10px", padding: "10px" }}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label" style={{ fontWeight: 600 }}>
                Grade Interested In
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="form-select"
                required
                style={{ borderRadius: "10px", padding: "10px" }}
              >
                <option value="">Select Grade</option>
                {[
                  "Nursery",
                  "Junior KG",
                  "Senior KG",
                  "1st Standard",
                  "2nd Standard",
                  "3rd Standard",
                  "4th Standard",
             
                ].map((grade) => (
                  <option key={grade}>{grade}</option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <label className="form-label" style={{ fontWeight: 600 }}>
                Message / Enquiry
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="form-control"
                placeholder="Enter your enquiry or message"
                style={{ borderRadius: "10px", padding: "10px" }}
              ></textarea>
            </div>

            <div className="col-12 text-center mt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: "#0077cc",
                  color: "#fff",
                  border: "none",
                  borderRadius: "25px",
                  padding: "10px 35px",
                  fontWeight: 600,
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
              >
                {isSubmitting ? "Sending..." : "Submit Enquiry"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
