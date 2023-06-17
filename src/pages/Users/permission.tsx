import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProCard,
  ProTable,
  TableDropdown,
} from '@ant-design/pro-components';
import { Link, request } from '@umijs/max';
import { Button, Tag, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

function requestPersion() {}

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

function ProCardTemplate({ keyParm, onRef }: { keyParm: string; onRef: any }) {
  const [permission, setPermission] = useState({});
  let actionRef = useRef<ActionType>();

  useEffect(() => {
    let int = async () => {
      let res = await request<{
        data: GithubIssueItem[];
      }>('http://localhost:8080/users/permission', {
        //   params,
      });
      setPermission(res);
    };
    int();
  }, []);

  useEffect(() => {
    onRef(actionRef);
    return () => {
      onRef(null);
    };
  }, [onRef]);

  const columnsOne: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'id',
      dataIndex: 'id',
      copyable: true,
      ellipsis: true,
      search: false,
      tip: '标题过长会自动收缩',
    },
    {
      title: '权限',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '权限简介',
      width: 300,
      dataIndex: 'description',
      ellipsis: true,
    },
    //   {
    //     disable: true,
    //     title: '权限',
    //     dataIndex: 'state',
    //     filters: false,
    //     onFilter: false,
    //     ellipsis: true,
    //     search: false,
    //     valueType: 'select',
    //     valueEnum: {
    //       all: { text: '超长'.repeat(50) },
    //       open: {
    //         text: '未解决',
    //         status: 'Error',
    //       },
    //       closed: {
    //         text: '已解决',
    //         status: 'Success',
    //         disabled: true,
    //       },
    //       processing: {
    //         text: '解决中',
    //         status: 'Processing',
    //       },
    //     },
    //   },
    //   {
    //     disable: true,
    //     title: '标签',
    //     dataIndex: 'labels',
    //     search: false,
    //     renderFormItem: (_, { defaultRender }) => {
    //       return defaultRender(_);
    //     },
    //     render: (_, record) => (
    //       <Space>
    //         {record.labels.map(({ name, color }) => (
    //           <Tag color={color} key={name}>
    //             {name}
    //           </Tag>
    //         ))}
    //       </Space>
    //     ),
    //   },

    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          href={record.url}
          target="_blank"
          rel="noopener noreferrer"
          key="view"
        >
          查看
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];

  const columns: ProColumns<any>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '身份id',
      dataIndex: 'roleId',
      copyable: true,
      ellipsis: true,
      search: false,
      tip: '标题过长会自动收缩',
    },
    {
      title: '身份',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '对应权限',
      width: 300,

      dataIndex: 'permissions',
      ellipsis: true,
      render: (_, record, n, action) => {
        const { permissions } = record as any;
        let permissionsFinds: { [key: string]: any } = permission;
        let arrsFilter = [];
        if (permissions) {
          let arrs = permissions.split(',');
          let permMap = new Map();
          for (let i = 0; i < permissionsFinds.length; i++) {
            permMap.set(permissionsFinds[i].id, permissionsFinds[i]);
          }

          for (let i = 0; i < arrs.length; i++) {
            if (permMap.has(Number(arrs[i]))) {
              let prem = permMap.get(Number(arrs[i]));
              arrsFilter.push(prem);
              //   console.log();
            }
          }

          return (
            <>
              {arrsFilter.map((item) => {
                {
                  item;
                }
                let { name } = item;
                return (
                  <Tag color="blue" key={name}>
                    {name}
                  </Tag>
                );
              })}
            </>
          );
        } else {
          return '';
        }
      },
    },
    //   {
    //     disable: true,
    //     title: '权限',
    //     dataIndex: 'state',
    //     filters: false,
    //     onFilter: false,
    //     ellipsis: true,
    //     search: false,
    //     valueType: 'select',
    //     valueEnum: {
    //       all: { text: '超长'.repeat(50) },
    //       open: {
    //         text: '未解决',
    //         status: 'Error',
    //       },
    //       closed: {
    //         text: '已解决',
    //         status: 'Success',
    //         disabled: true,
    //       },
    //       processing: {
    //         text: '解决中',
    //         status: 'Processing',
    //       },
    //     },
    //   },
    //   {
    //     disable: true,
    //     title: '标签',
    //     dataIndex: 'labels',
    //     search: false,
    //     renderFormItem: (_, { defaultRender }) => {
    //       return defaultRender(_);
    //     },
    //     render: (_, record) => (
    //       <Space>
    //         {record.labels.map(({ name, color }) => (
    //           <Tag color={color} key={name}>
    //             {name}
    //           </Tag>
    //         ))}
    //       </Space>
    //     ),
    //   },

    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <Link key="edit" to={'/user/role/' + record.roleId}>
          编辑
        </Link>,
        <Link key="view" to={'/user/role/' + record.roleId}>查看</Link>,
      ],
    },
  ];

  if (keyParm === '1') {
    return (
      <ProCard>
        <ProTable<GithubIssueItem>
          columns={columnsOne}
          search={false}
          actionRef={actionRef}
          cardBordered
          request={async (params = {}, sort, filter) => {
            let data = await request<{
              data: GithubIssueItem[];
            }>('http://localhost:8080/users/permission', {
              //   params,
            });
            return {
              data: data as any,
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: true,
              // 不传会使用 data 的长度，如果是分页一定要传
              // total: number,
            };
          }}
          editable={{
            type: 'multiple',
            onSave: async (key, row) => {
              console.log(key);
              console.log(row);
              const { name, description } = row as any;
              await request('http://localhost:8080/users/addPerminssion', {
                method: 'POST',
                data: {
                  permissionName: name,
                  detail: description,
                },
              });
              message.success('提交成功');
              actionRef.current?.reload();
            },
          }}
          rowKey="name"
          options={{
            setting: {
              listsHeight: 400,
            },
          }}
          form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            syncToUrl: (values, type) => {
              if (type === 'get') {
                return {
                  ...values,
                  created_at: [values.startTime, values.endTime],
                };
              }
              return values;
            },
          }}
          dateFormatter="string"
          headerTitle="权限列表"
          toolBarRender={() => [
            <Button
              key="button"
              icon={<PlusOutlined />}
              onClick={() => {
                actionRef.current?.addEditRecord?.({
                  name: '新的一行',
                  description: '权限简介',
                });
              }}
              type="primary"
            >
              新建
            </Button>,
          ]}
        />
      </ProCard>
    );
  }
  return (
    <ProCard>
      <ProTable
        columns={columns}
        search={false}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          let data = await request('http://localhost:8080/users/userRole', {
          });
          return {
            data: data as any,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            // total: number,
          };
        }}
        rowKey="name"
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        dateFormatter="string"
        headerTitle="权限列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              // actionRef.current?.addEditRecord?.({
              //   name: '新的一行',
              //   description: '权限简介',
              // });
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
    </ProCard>
  );
}
export default () => {
  const [keytab, setKeytab] = useState<string>('1');
  const childInputRef = useRef(null) as any;
  const setChildRef = (ref: any) => {
    if (ref?.current && ref?.current != null) {
      if (ref.current && ref.current != null) {
        // console.log(ref.current);
        childInputRef.current = ref.current;
      }
    }
  };
  // 在需要时调用子组件内部的useref
  const handeRef = () => {
    childInputRef.current?.reload();
    console.log(childInputRef);
  };
  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        tabActiveKey={keytab}
        header={{
          title: '页面标题',
          breadcrumb: {},
        }}
        tabList={[
          {
            tab: '权限列表',
            key: '1',
          },
          {
            tab: '用户身份',
            key: '2',
          },
        ]}
        onTabChange={(key) => {
          handeRef();
          setKeytab(key);
        }}
      >
        <ProCard direction="column" ghost gutter={[0, 16]}>
          <ProCardTemplate onRef={setChildRef} keyParm={keytab} />
        </ProCard>
      </PageContainer>
    </div>
  );
};
