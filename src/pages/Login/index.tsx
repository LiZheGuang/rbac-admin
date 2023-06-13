import {
    AlipayCircleOutlined,
    LockOutlined,
    PlusOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
  } from '@ant-design/icons';
  import {
    LoginForm,
    ProFormRadio,
    ProFormText,

  } from '@ant-design/pro-components';
  import { Button, message, Space } from 'antd';
  import { useState } from 'react';
  
  const iconStyles = {
    marginInlineStart: '16px',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };
  
  

  
  export default () => {
    const [type, setType] = useState('ProForm');
   
    
  
    const FormComponents = LoginForm
  
    return (
        <>
          {' '}
        
          <FormComponents
            title="登录CMS"
            subTitle="基于NODE技术栈的CMS登录用户身份权限系统"
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'用户名: admin or user'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'密码: ant.design'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </FormComponents>
        </>
      );
  
  };