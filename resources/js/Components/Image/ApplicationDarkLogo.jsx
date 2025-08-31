import logo from '../../../../public/image/email-system-logo-removebg.png';

export default function ApplicationLogo(props) {
    return (
        <img src={logo} alt="Logo" {...props} />
    );
}
