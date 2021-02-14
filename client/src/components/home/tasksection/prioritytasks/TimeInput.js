import { TimePicker, Form, Row, InputNumber, Divider, Col } from 'antd';
import Paragraph from '../../../atoms/Paragraph';

const { Item } = Form;


const { RangePicker } = TimePicker;

function TimeInput({
    label,
    name,
    value,
    initialValue,
    hrs,
    mins,
    onChangeTimeRange,
    onChangeTimeHrs,
    onChangeTimeMins
    }) {
    return (
        <Item
            style={{marginTop: "0em"}}
            label={
                label ? <Paragraph style={{color: '#595959'}} text={label} strong /> : null
            }
            name={name}
            initialValue={initialValue}
            onChange={() => {}}
        >
            <Row justify='space-between'>
                <Col span={24}>
                    <RangePicker name="timeRange" onChange={ onChangeTimeRange} style={{ width: "100%", marginBottom: "1em" }}/>     
                </Col>
                <Col span={24}>
                    <InputNumber
                        defaultValue={hrs}
                        onChange={onChangeTimeHrs}
                        name="hrs"
                        style={{width: "50%"}}
                        formatter={value => `${value} hrs`}
                        parser={value => value.replace(/hrs/g, '').replace(/ /g, '')}
                    />
                    <InputNumber
                        defaultValue={mins}
                        onChange={onChangeTimeMins}
                        name="mins"
                        style={{width: "50%"}}
                        formatter={value => `${value} mins`}
                        parser={value => value.replace(/mins/g, '').replace(/ /g, '')}

                    />
                </Col>

            </Row>
        </Item>
        
        
        
    )
}

export default TimeInput;