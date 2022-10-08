import {Menu, message} from 'antd';
function Level({setLevel}){
    const onClick = ({ key, label }) => {
        message.info(`Sort ${key}`);
        setLevel( key);
    };
    return <Menu
        onClick={onClick}
        items={[
            {
                label: 'N1',
                key: 'N1',
            },
            {
                label: 'N2',
                key: 'N2',
            },
            {
                label: 'N3',
                key: 'N3',
            },
            {
                label: 'N4',
                key: 'N4',
            },
            {
                label: 'N5',
                key: 'N5',
            },
        ]}
    />
}


export default Level;