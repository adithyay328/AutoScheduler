import { Row, Image, Col } from 'antd';
import React from 'react';
import imageLanding from '../../../styles/images/landing_page.svg'

const LandingWrapper = ({ children }) => {
    return (
        <>
        <Row type="flex" style={{padding: '10px'}} className="landing-wrapper-row">
            <Col span={12}>
                <Row className="landing-wrapper-row-form">
                    <Col span={3} />
                    <Col span={18}>
                        <div style={{textAlign: 'left', padding: '10px'}}>
                            {children}
                        </div>
                    </Col>
                    <Col span={3} />
                </Row>
            </Col>
            <Col span={12} className="landing-wrapper-col-image">
                <Row type="flex" align="middle">
                    <Col>
                        <div>
                            <Image
                                alt="image"
                                src={imageLanding}
                                preview={false} 
                                className="landing-wrapper-image"
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

export default LandingWrapper;
