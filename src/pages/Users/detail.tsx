import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { request, useParams } from '@umijs/max';
const iconStyles = {
  marginInlineStart: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const { id } = useParams();
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
        <ProCard direction="column" ghost>
          <ProCard>
            <>
              <div
                style={{
                  margin: 24,
                }}
              >
                <FormComponents
                  onFinish={async (values: any) => {
                    console.log(values);
                    // message.success('提交成功');
                  }}
                  initialValues={{
                    name: '蚂蚁设计有限公司',
                    useMode: 'chapter',
                  }}
                >
                  <ProForm.Group>
                    <ProFormText
                      width="md"
                      name="name"
                      label="用户昵称"
                      tooltip="最长为 24 位"
                      placeholder="请输入名称"
                    />
                    <ProFormText
                      width="md"
                      name="company"
                      label="用户身份"
                      placeholder="请输入名称"
                    />
                  </ProForm.Group>
                  <ProForm.Group>
                    <ProFormText width="md" name="id" label="用户账号" />
                    <ProFormText width="md" name="id" label="用户UID" />
                  </ProForm.Group>
                  <ProFormText
                    name="project"
                    width="md"
                    disabled
                    label="用户权限"
                    initialValue="xxxx项目"
                  />
                  <ProFormCheckbox.Group
                    name="checkbox"
                    layout="horizontal"
                    label="用户权限"
                    request={async () => {
                      let url = 'http://localhost:8080/users/permission';
                      let permissionRespone = await request(url);
                      //    函数过滤
                      let lableData = permissionRespone.map(
                        (item: any, index: number) => {
                          return { label: item.name, value: item.id ,msg:item.description};
                        },
                      );
                      console.log(lableData);
                      // http://localhost:8080/users/permission
                      return lableData
                    }}
                    options={['农业', '制造业', '互联网']}
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
