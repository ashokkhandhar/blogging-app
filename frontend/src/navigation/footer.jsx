import './footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="copy-right">
                <span>Blogs © {new Date().getFullYear()}</span>
                <div className="divider">|</div>
                <span>
                    <a href='https://github.com/ashokkhandhar/blogging-app' target='_blank'>code</a> with ❤️ by <a href='http://ashokkhandhar.netlify.app/' target='_blank'>Ashok Khandhar</a>
                </span>
            </div>
        </footer>
    );
}

export default Footer;