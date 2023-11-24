import React, {useState} from "react";
import "./CSS/ContactUs.css";
import SocialMedia from "../Components/SocialMedia/SocialMedia";
import Footer from "../Components/Footer/Footer";

function ContactUs() {

const scriptURL = 'https://script.google.com/macros/s/AKfycbwvCrynxVuFUP0MfPHPgR1jEwu0p0oUr4IMKSra3vzHTiM7rmrv6GAt6qUr67mfjZmu5A/exec';
const [msg, setMsg] = useState('');
const [formData, setFormData] = useState({
name:'',
email:'',
phone:'',
message:''
});
console.log(msg);

const handleSubmit = (e) => {
e.preventDefault();

fetch(scriptURL, { method: 'POST', body: new FormData(e.target) })
    .then(response => {
    setMsg("Message sent successfully. Thanks for contacting me.");
    setTimeout(() => {
        setMsg("");
    }, 1000);
    setFormData({});
    })
    .catch(error => console.error('Error!', error.message));
};

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};


return (
<div className="contact-container">
    <div className="row">
    <div className="contact-left">
        <h1 class="sub-title">Contact Us</h1>

    </div>

    <div className="contact-form">
        <form className="contact-form" onSubmit={handleSubmit} name="submit-to-google-sheet">
        <div className="contact_formTop">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name"  required />
        <input
            type="email"
            name="email"
            value={formData.email} onChange={handleChange}
            placeholder="email@gamil.com"
        />
        <input type="tel" name="phone"  value={formData.phone} onChange={handleChange} placeholder="Phone" />
        </div>
        <div className="contact_formMsg">
        <textarea
            name="message"
            rows="6"
            value={formData.message} onChange={handleChange}
            placeholder="Message"
            required
        ></textarea>

        </div>
        <button type="submit" class="contact_submitBtn">
            Submit
        </button>
        </form>
        <p id="msg">{msg}</p>
    </div>
    </div>
    <div className="contact-link">
    <SocialMedia name={"Himanshu Tripathi"} instagram={"https://www.instagram.com/dr0458571/"}/>
    <SocialMedia name={"Dhruv Rastogi"} instagram={"https://www.instagram.com/dr0458571/"}/>
    <SocialMedia name={"Dheeraj Sharma"} instagram={"https://www.instagram.com/dheerajsharma2425/"}/>
    </div>
    <Footer />
</div>
);
}

export default ContactUs;