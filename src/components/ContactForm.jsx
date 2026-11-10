import { useState } from "react";
import { useContent } from "../context/useContent";

export function ContactForm() {
  const { content } = useContent();
  const email = content.profile.email;
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${name || "visitor"}`);
    const body = encodeURIComponent(
      `${message}\n\nFrom: ${name}\n${from}\nLinkedIn: ${linkedin}\nGitHub: ${github}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label>
        Name
        <input value={name} onChange={(event) => setName(event.target.value)} required />
      </label>
      <label>
        Email
        <input type="email" value={from} onChange={(event) => setFrom(event.target.value)} required />
      </label>
      <label>
        LinkedIn
        <input value={linkedin} onChange={(event) => setLinkedin(event.target.value)} />
      </label>
      <label>
        GitHub
        <input value={github} onChange={(event) => setGithub(event.target.value)} />
      </label>
      <label className="is-wide">
        Message
        <textarea rows={5} value={message} onChange={(event) => setMessage(event.target.value)} required />
      </label>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
