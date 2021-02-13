import { Row, Image, Col } from 'antd';
import React from 'react';
import imageHome from '../../../styles/images/home_page.svg'

const HomeWrapper = ({ children }) => {
    return (
        <>
        <Row type="flex" style={{padding: '10px'}} className="home-wrapper-row">
            <Col span={12}>
                <Row className="home-wrapper-row-form">
                    <Col span={3} />
                    <Col span={18}>{children}</Col>
                    <Col span={3} />
                </Row>
            </Col>
            <Col span={12} className="home-wrapper-col-image">
                <Row type="flex" align="middle">
                    <Col>
                        <div>
                            <Image
                                alt="image"
                                src={imageHome}
                                preview={false} 
                                className="home-wrapper-image"
                                style={{
                                    display: 'block',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
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

export default HomeWrapper;
