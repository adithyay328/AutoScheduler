import Header from '../atoms/Header'
import HomeWrapper from '../base/wrappers/HomeWrapper'
import ButtonComponent from '../atoms/ButtonComponent'
import Paragraph from '../atoms/Paragraph';

function Home() {
    const onClick = () => {
        console.log('Success:');
    };

    return (
        <>
            <Header />
            <HomeWrapper>
                <div style={{padding: '20px'}}>
                    <Paragraph text='
                        Stop worrying about the tasks you need to do. 
                        Autotask will automatically build out a plan for your tasks so you always know what to do!
                    '/>
                </div>

                <div style={{padding: '20px'}}>
                    <ButtonComponent
                        type="primary"
                        htmlType="submit"
                        buttontext="Let’s complete those tasks"
                    />
                </div>
            </HomeWrapper>
        </>
    )
}

export default Home;