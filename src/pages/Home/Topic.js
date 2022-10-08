import {Menu, message} from 'antd';
function Topic({setTopic}){
    const onClick = ({ key, label }) => {
        message.info(`Click on item ${key}`);
        // console.log( label);
        setTopic(key);
    };
    return <Menu
    onClick={onClick}
    items={[
        {
            label: 'greeting',
            key: 'greeting',
        },
        {
            label: 'girl',
            key: 'girl',
        },
        {
            label: 'Chu de 3',
            key: 'Chu de 3',
        },
        {
            label: 'Chu de 4',
            key: 'Chu de 4',
        },
        {
            label: 'Chu de 5',
            key: 'Chu de 5',
        },
    ]}
/>
}

export default Topic;