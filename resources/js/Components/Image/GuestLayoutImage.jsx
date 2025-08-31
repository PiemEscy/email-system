import logo from '../../../../public/image/guest-layout-logo.png';

export default function GuestLayoutImage(props) {
    return (
        <img src={logo} alt="Lending System Logo" {...props} />
    );
}
