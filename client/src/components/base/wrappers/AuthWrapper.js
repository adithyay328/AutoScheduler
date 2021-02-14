import { Row, Image, Col } from 'antd';
import React from 'react';
import imageAuth from '../../../styles/images/login_and_register_page.svg'

const AuthWrapper = ({ children }) => {
    return (
        <>
        <Row type="flex" className="auth-wrapper-row">
            <Col span={12}>
                <Row className="auth-wrapper-row-form">
                    <Col span={3} />
                    <Col span={18}>
                        <div style={{textAlign: 'left', padding: '10px'}}>
                            {children}
                        </div>
                    </Col>
                    <Col span={3} />
                </Row>
            </Col>
            <Col span={12} className="auth-wrapper-col-image">
                <Row type="flex" align="middle">
                    <Col>
                        <div>
                            <Image
                                alt="image"
                                src={imageAuth}
                                preview={false} 
                                className="auth-wrapper-image"
                                style={{
                                    alignSelf: 'center'
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        </>
    );
};

export default AuthWrapper;
