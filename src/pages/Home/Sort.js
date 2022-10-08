import { memo } from "react";
import { DownOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

import { Dropdown, Menu, Space, Input } from 'antd';
import style from '~/assets/css/home.module.css'
import { menu, menuTopic } from './Menu';
import Level from "./Level";
import Topic from "./Topic";
const { Search } = Input;



function Sort({onSearch, setAll, setLevel, setTopic}) {
    return <div className={style.search}>
        <div >
            <Dropdown className={style.dropdown} overlay={<Menu items={[]}></Menu>}>
                <Link onClick={(e) =>{
                    e.preventDefault()
                    setAll();
                } 
                }>
                    <Space style={{fontSize:"20px"}}>
                        All
                        {/* <DownOutlined /> */}
                    </Space>
                </Link>
            </Dropdown>
            <Dropdown className={style.dropdown} overlay={<Level setLevel={setLevel}/>}>
                <Link onClick={(e) =>{
                    e.preventDefault();

                } }>
                    <Space style={{fontSize:"20px"}}>
                        Level
                        <DownOutlined style={{fontSize: 16 , lineHeight:"29px"}} />
                    </Space>
                </Link>
            </Dropdown>
            <Dropdown className={style.dropdown} overlay={<Topic setTopic={setTopic}></Topic>}>
                <Link onClick={(e) =>{
                    e.preventDefault();
                
                }}>
                    <Space style={{fontSize:"20px"}}>
                        Topic
                        <DownOutlined style={{fontSize: 16 , lineHeight:"29px"}} />
                    </Space>
                </Link>
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