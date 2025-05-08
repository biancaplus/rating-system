import { useState, useEffect, useMemo, useCallback } from "react";
import { Space, Table, Button, Input, Select, Modal, Form, Upload } from "antd";
import { ExclamationCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { getTeacherList } from "@/api/index.js";
import { debounce } from "lodash";
import { addTeacher, editTeacher, deleteTeacher } from "@/api/index.js";
import { useToast } from "@/context/ToastContext";

export default function TeacherManagent() {
  const { TextArea } = Input;
  const { t, i18n } = useTranslation();
  const { showToast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 10;
  const [sort, setSort] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [form] = Form.useForm();
  const avatar = Form.useWatch("avatar", form);
  const [formLoading, setFormLoading] = useState(false);

  const LanguageWidth = useMemo(() => {
    const language = i18n.language;
    if (language === "ja") {
      return "calc(100vh - 230px)";
    } else {
      return "calc(100vh - 210px)";
    }
  }, [i18n.language]);

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  };

  const columns = [
    {
      title: t("teacherTable.index"),
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 60,
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: t("teacherTable.name"),
      dataIndex: "name",
      key: "name",
      width: 80,
      onCell: () => ({
        style: {
          minWidth: "80px",
          maxWidth: "140px",
          //   overflow: "hidden",
          //   textOverflow: "ellipsis",
          //   whiteSpace: "nowrap",
        },
      }),
    },
    {
      title: t("teacherTable.faculty"),
      dataIndex: "faculty",
      key: "faculty",
      width: 100,
    },
    {
      title: t("teacherTable.title"),
      dataIndex: "title",
      key: "title",
      width: 80,
    },
    {
      title: t("teacherTable.courses"),
      dataIndex: "courses",
      key: "courses",
      width: 140,
    },
    {
      title: t("teacherTable.introduction"),
      dataIndex: "introduction",
      key: "introduction",
      width: 180,
      onCell: () => ({
        style: {
          minWidth: "180px",
        },
      }),
    },
    {
      title: t("teacherTable.avatar"),
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      width: 65,
      render: (_, record) =>
        record.avatar ? (
          <img src={record.avatar} alt="avatar" width={40} />
        ) : (
          <></>
        ),
    },
    {
      title: t("teacherTable.rating_count"),
      dataIndex: "rating_count",
      key: "rating_count",
      width: 80,
      align: "center",
    },
    {
      title: t("teacherTable.rating"),
      dataIndex: "rating",
      key: "rating",
      width: 65,
      align: "center",
    },
    {
      title: t("teacherTable.operation"),
      key: "operation",
      width: 110,
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            color="primary"
            variant="text"
            onClick={() => showModal(false, record)}
          >
            {t("edit")}
          </Button>
          <Button
            size="small"
            color="danger"
            variant="text"
            onClick={() => confirm(record)}
          >
            {t("delete")}
          </Button>
        </Space>
      ),
    },
  ];

  const [modal, contextHolder] = Modal.useModal();
  const confirm = (item) => {
    modal.confirm({
      title: t("prompt"),
      content: (
        <div className="">
          <span className="mb-0 fs-6">{t("confirmDeleteContent")}</span>
          <span className="mb-2 fs-6 fw-bold">（ {item.name} )</span>
        </div>
      ),
      onOk() {
        return handleDelete(item);
      },
      icon: <ExclamationCircleOutlined />,
      okText: t("confirm"),
      cancelText: t("cancel"),
    });
  };

  const showModal = (isAdd = false, item) => {
    setIsAdd(isAdd);
    if (!isAdd) {
      //   setEditItem(item);
      form.setFieldsValue(item);
    } else {
      form.setFieldsValue({
        name: "",
        faculty: "",
        title: "",
        courses: "",
        introduction: "",
        avatar: "",
      });
    }

    setIsModalOpen(true);
  };

  // 文件转 base64 工具函数
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // 拦截上传逻辑，转 base64 并设置到表单字段中
  const handleBeforeUpload = async (file) => {
    console.log("file", file);
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      showToast("error", t("onlyImg"));
      return false;
    }

    const isLt1M = file.size / 1024 / 1024;
    if (!isLt1M) {
      showToast("error", t("imgSize"));
      return false;
    }

    const base64 = await toBase64(file);
    console.log("base64", base64);
    // 设置到表单中
    form.setFieldsValue({ avatar: base64 });
    // showToast("success", "头像上传成功");

    // 阻止默认上传
    return false;
  };

  const handleOk = async () => {
    try {
      await form.validateFields(); // 表单验证通过
      setFormLoading(true);
      if (isAdd) {
        handleAdd();
      } else {
        handleEdit();
      }
    } catch (errorInfo) {
      //表单验证未通过
      showToast("error", errorInfo.errorFields[0].errors[0]);
    }
  };

  const handleCancel = () => {
    form.setFieldsValue({});
    setIsModalOpen(false);
  };

  const handleAdd = () => {
    console.log("新增教师", form.getFieldsValue());
    addTeacher(form.getFieldsValue())
      .then((res) => {
        console.log("res", res);
        if (res.status === 0) {
          setIsModalOpen(false);
          getTeacher();
          showToast("success", t("addSuccess"));
        } else {
          showToast("error", res.message);
        }
      })
      .catch(() => {
        showToast("error", t("addError"));
      })
      .finally(() => {
        setFormLoading(false);
      });
  };

  const handleEdit = () => {
    console.log("编辑教师", form.getFieldsValue());
    editTeacher(form.getFieldsValue())
      .then((res) => {
        console.log("res", res);
        if (res.status === 0) {
          setIsModalOpen(false);
          getTeacher();
          showToast("success", t("editSuccess"));
        } else {
          showToast("error", res.message);
        }
      })
      .catch(() => {
        showToast("error", t("editError"));
      })
      .finally(() => {
        setFormLoading(false);
      });
  };

  const handleDelete = (item) => {
    return deleteTeacher(item.id)
      .then((res) => {
        console.log("res", res);
        if (res.status === 0) {
          showToast("success", t("deleteSuccess"));
          getTeacher();
        } else {
          showToast("error", res.message);
          // 返回Promise.reject()，Modal不会关闭
          return Promise.reject();
        }
      })
      .catch(() => {
        showToast("error", t("deleteError"));
      });
  };

  const sortChange = (value) => {
    setSort(value);
    setCurrentPage(1);
  };
  const searchChange = (value) => {
    setKeywords(value);
    setCurrentPage(1);
  };

  // 防抖：延迟500ms执行
  const debouncedSearch = useMemo(() => debounce(searchChange, 500), []);

  // 清除副作用：组件卸载时取消未完成的 debounce
  useCallback(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const getTeacher = useCallback(async () => {
    setIsLoading(true);
    await getTeacherList(currentPage, pageSize, sort, keywords)
      .then((res) => {
        console.log("res", res);
        let list = (res && res.data.list) || [];
        list.forEach((item) => {
          item.courses = item.courses.join(",");
        });
        setTableData(list);
        setTotalItems(res.data.totalPage * pageSize);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage, pageSize, sort, keywords]);

  useEffect(() => {
    getTeacher();
  }, [getTeacher]);

  return (
    <div className="d-flex flex-column" style={{ height: "100%" }}>
      <div className="d-flex flex-column flex-md-row justify-content-md-between ">
        <div className="condition-wrap d-flex flex-column flex-md-row  align-items-md-center mb-2 fs-7">
          <div className="d-flex align-items-center mb-1 mb-md-0">
            <span>{t("sort")}：</span>
            <Select
              options={[
                { value: 1, label: <span>{t("score")}</span> },
                { value: 2, label: <span>{t("ratingNumber")}</span> },
                { value: 3, label: <span>{t("initials")}</span> },
              ]}
              onChange={sortChange}
              value={sort}
              style={{ width: 140, marginRight: 15 }}
              allowClear
            />
          </div>

          <div className="d-flex align-items-center">
            <span>{t("search")}：</span>
            <Input
              placeholder={t("keywords")}
              value={keywords}
              onChange={(e) => debouncedSearch(e.target.value)}
              style={{ width: 140, marginRight: 15 }}
              allowClear
            />
          </div>
        </div>

        <div className="btn-wrap">
          <Button color="cyan" variant="solid" onClick={() => showModal(true)}>
            {t("add")}
          </Button>
        </div>
      </div>

      <div className="table-wrap flex-grow-1 position-relative">
        <Table
          columns={columns}
          dataSource={tableData}
          rowKey={(record) => record.id}
          scroll={{ y: LanguageWidth }}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: totalItems,
            onChange: (page) => {
              setCurrentPage(page);
            },
          }}
          loading={isLoading}
        />
      </div>

      {contextHolder}

      <Modal
        title={isAdd ? t("add") : t("edit")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t("confirm")}
        cancelText={t("cancel")}
        maskClosable={false}
        confirmLoading={formLoading}
      >
        <div className="d-flex flex-column">
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            style={{ maxWidth: 600 }}
          >
            {!isAdd && (
              <Form.Item name="id" hidden>
                <Input />
              </Form.Item>
            )}

            <Form.Item
              name="name"
              label={t("teacherTable.name")}
              rules={[
                { required: true, message: t("teacherTable.name_required") },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="faculty"
              label={t("teacherTable.faculty")}
              rules={[
                { required: true, message: t("teacherTable.faculty_required") },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="title"
              label={t("teacherTable.title")}
              rules={[
                { required: true, message: t("teacherTable.title_required") },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="courses" label={t("teacherTable.courses")}>
              <TextArea autoSize />
            </Form.Item>
            <Form.Item
              name="introduction"
              label={t("teacherTable.introduction")}
            >
              <TextArea autoSize />
            </Form.Item>
            {/* <Form.Item name="avatar" label={t("teacherTable.avatar")}>
              <Input />
            </Form.Item> */}

            <Form.Item name="avatar" label={t("teacherTable.avatar")}>
              <div>
                <Input hidden />
                <div className="d-flex flex-column">
                  <Upload
                    beforeUpload={handleBeforeUpload}
                    showUploadList={false}
                    accept="image/*"
                  >
                    <Button icon={<UploadOutlined />}>
                      {t("teacherTable.avatar_upload")}
                    </Button>
                  </Upload>

                  {avatar && (
                    <img
                      src={avatar}
                      alt="avatar"
                      style={{
                        marginTop: 16,
                        width: 120,
                        height: 120,
                      }}
                    />
                  )}
                </div>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
