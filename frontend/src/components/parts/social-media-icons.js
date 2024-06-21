import {
  FaFacebookSquare,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const SocialMediaIcons = () => {
  return (
    <>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebookSquare
          size={32}
          color="grey"
          style={{ marginRight: "1rem" }}
        />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={32} color="grey" style={{ marginRight: "1rem" }} />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
        <FaYoutube size={32} color="grey" style={{ marginRight: "1rem" }} />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter size={32} color="grey" style={{ marginRight: "1rem" }} />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedinIn size={32} color="grey" style={{ marginRight: "1rem" }} />
      </a>
    </>
  );
};

export default SocialMediaIcons;
