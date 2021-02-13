import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Image, } from 'antd'
import logo from '../../styles/images/logo_with_text.svg'
import { PageHeader } from 'antd';

const Header = (props) => {
    const {
        isLoggedIn,
    } = props;
    return (
        <PageHeader
            className="site-page-header"
            title={
                <>
                    <Link>
                        <Image
                            alt="logo"
                            src={logo}
                            preview={false}
                            style={{
                                width: '280px',
                                height: '60px',
                            }}
                        />
                    </Link>
                </>
            }

            extra={
                isLoggedIn ? (
                    <Avatar icon={<UserOutlined />} size={44} />
                ) : null
            }
        />
    );
};

export default Header;
