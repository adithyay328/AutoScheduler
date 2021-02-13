import Header from '../atoms/Header'
import LandingWrapper from '../base/wrappers/LandingWrapper'
import ButtonComponent from '../atoms/ButtonComponent'
import Paragraph from '../atoms/Paragraph';
import { Link } from 'react-router-dom';

function Landing() {
    const onClick = () => {
        console.log('Success:');
    };

    return (
        <>
            <Header />
            <LandingWrapper>
                <div style={{padding: '20px', position: "relative"}}>
                    <h2 style={{fontSize: "2.2em", lineHeight: "2.6em"}}>Get Your Tasks <span style={{fontSize: "2.6em", fontWeight: 400, verticalAlign: "middle", paddingLeft: "10px"}}>DONE</span></h2>
                </div>
                <div style={{padding: "0px 20px"}}>
                    <Paragraph style={{fontSize: "1.2em"}} text='
                        Stop worrying about the tasks you need to do. 
                        Autotask will automatically build out a plan for your tasks so you always know what to do!
                    '/>
                </div>

                <div style={{padding: '80px 20px'}}>
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