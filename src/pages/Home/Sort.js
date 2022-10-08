import { memo } from "react";
import { DownOutlined } from '@ant-design/icons';

import { Dropdown, Menu, Space, Input } from 'antd';
import style from '~/assets/css/home.module.css'
import { menu, menuTopic } from './Menu';
const { Search } = Input;



function Sort({onSearch}) {
    return <div className={style.search}>
        <div >
            <Dropdown className={style.dropdown} overlay={<Menu items={[]}></Menu>}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space style={{fontSize:"20px"}}>
                        All
                        {/* <DownOutlined /> */}
                    </Space>
                </a>
            </Dropdown>
            <Dropdown className={style.dropdown} overlay={menu}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space style={{fontSize:"20px"}}>
                        Level
                        <DownOutlined style={{fontSize: 16 , lineHeight:"29px"}} />
                    </Space>
                </a>
            </Dropdown>
            <Dropdown className={style.dropdown} overlay={menuTopic}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space style={{fontSize:"20px"}}>
                        Topic
                        <DownOutlined style={{fontSize: 16 , lineHeight:"29px"}} />
                    </Space>
                </a>
            </Dropdown>

            {/* form in here */}
        </div>
        <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{
                width: 400,
                marginRight: 100,
                borderRadius:10
            }}
        />
    </div>
}

export default memo(Sort);