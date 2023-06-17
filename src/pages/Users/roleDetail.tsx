import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { request, useParams } from '@umijs/max';
import { message } from 'antd';
type TS_USER_ROLE = {
  roleId: number;
  name: string;
  msg: string;
  permissions: string;
};
export default () => {
  const { roleId } = useParams();
  const FormComponents = ProForm;
  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        tabProps={{
          type: 'editable-card',
          hideAdd: true,
          onEdit: (e, action) => console.log(e, action),
        }}
      >
        {roleId}
        <ProCard direction="column" ghost>
          <ProCard>
            <>
              <div
                style={{
                  margin: 24,
                }}
              >
                <FormComponents
                  request={async () => {
                    if (roleId) {
                      let userRoleResponse: any = await request<{
                        data: TS_USER_ROLE;
                      }>(`http://localhost:8080/users/userRole`, {
                        method: 'GET',
                        params: {
                          roleId: roleId,
                        },
                      });
                      userRoleResponse = userRoleResponse[0];
                      let { permissions } = userRoleResponse;
                      permissions = permissions.split(',');
                      userRoleResponse.permissions = permissions.map(
                        (item: string) => {
                          return Number(item);
                        },
                      );
                      return userRoleResponse;
                    }
                    return true;
                  }}
                  onFinish={async (values: any) => {
                    if (roleId) {
                      console.log('编辑');
                      return;
                    } else {
                      const doc = await request(
                        'http://localhost:8080/users/createRole',
                        {
                          method: 'POST',
                          data: { ...values },
                        },
                      );
                    }

                    message.success('提交成功');
                  }}
                >
                  <ProForm.Group>
                    <ProFormText
                      width="md"
                      name="name"
                      label="用户身份"
                      placeholder="请输入名称"
                      disabled={roleId == undefined ? false : true}
                    />
                    <ProFormText
                      width="md"
                      name="msg"
                      label="身份简介"
                      placeholder="请输入名称"
                    />
                  </ProForm.Group>

                  <ProFormCheckbox.Group
                    name="permissions"
                    layout="horizontal"
                    label="权限选择"
                    request={async (label, value) => {
                      let url = 'http://localhost:8080/users/permission';
                      let permissionRespone = await request(url);
                      //    函数过滤
                      let lableData = permissionRespone.map(
                        (item: any, index: number) => {
                          return {
                            label: item.name,
                            value: item.id,
                            msg: item.description,
                          };
                        },
                      );
                      return lableData;
                    }}
                    // options={['1']}
                  />
                </FormComponents>
              </div>
            </>
          </ProCard>
        </ProCard>
      </PageContainer>
    </div>
  );
};
