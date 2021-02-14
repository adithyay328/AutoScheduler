import Header from '../atoms/Header'
import LandingWrapper from '../base/wrappers/LandingWrapper'
import ButtonComponent from '../atoms/ButtonComponent'
import Paragraph from '../atoms/Paragraph';
import Title from '../atoms/Paragraph';
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <>
            <Header />
            <LandingWrapper>
                <div>
                    <Title style={{ fontSize: '33px', verticalAlign: "middle"}} text='Get your tasks ' />
                    <span style={{fontSize: "44px", fontWeight: 400, verticalAlign: "middle", paddingLeft: "10px"}}>DONE</span>
                </div>

                <br />

                <div>
                    <Paragraph style={{ fontSize: '18px' }} text='
                        Stop worrying about the tasks you need to do. 
                        Autotask will automatically build out a plan for your tasks so you always know what to do!
                    '/>
                </div>
                
                <br />

                <div>
                    <Link to="/auth">
                        <ButtonComponent
                            type="primary"
                            htmlType="submit"
                            buttontext="Let’s complete those tasks"
                        />
                    </Link>
                </div>
            </LandingWrapper>
        </>
    )
}

export default Landing;