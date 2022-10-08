import { Menu, message } from 'antd';

const onClick = ({ key, label }) => {
    message.info(`Click on item ${key}`);
    // console.log( label);
};

const menu = (
    <Menu
        onClick={onClick}
        items={[
            {
                label: 'N1',
                key: 'Trinh do N1',
            },
            {
                label: 'N2',
                key: 'Trinh do N2',
            },
            {
                label: 'N3',
                key: 'Trinh do N3',
            },
            {
                label: 'N4',
                key: 'Trinh do N4',
            },
            {
                label: 'N5',
                key: 'Trinh do N5',
            },
        ]}
    />
);

const menuTopic = (
    <Menu
        onClick={onClick}
        items={[
            {
                label: 'Chu de 1',
                key: 'Chu de 1',
            },
            {
                label: 'Chu de 1',
                key: 'Chu de 2',
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
);


export { menu, menuTopic };