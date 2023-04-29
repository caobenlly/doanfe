import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import React, { useState } from "react";
import { cloneDeep } from "lodash";
import axios from "axios";
import { messageError } from "../../../assets/comonFc";
import { useEffect } from "react";

function ImageUpload({ show, closePreview, dataFile, max = 4 }) {
  const [files, setFiles] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  useEffect(() => {
    setFiles([]);
    setSelectedRowKeys([])
    setSelectedRow([])
  }, []);
  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    const cloneData = cloneDeep(files);
    fileList.forEach(async (i) => {
      const formData = new FormData();
      formData.append("file", i);
      await axios
        .post("https://hiphope.site/api/v1/Storage/file", formData)
        .then((response) => {
          cloneData.push({
            src: response.data,
            key: files.length,
          });
          console.log(cloneData);
          setFiles(cloneData);
        });
    });
  };

  const handleButtonClick = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.multiple = true;
    inputElement.accept = "image/*";
    inputElement.addEventListener("change", handleFileChange);
    inputElement.click();
  };
  function handleDelete(i) {
    const dataClone = cloneDeep(files);
    dataClone.splice(i, 1);
    setFiles(dataClone);
  }
  const columns = [
    {
      with: 50,
    },
    {
      title: "Ảnh",
      dataIndex: "src",
      width: 250,
      alight: "center",
      render: (values) => (
        <img
          style={{ width: "150px", height: "100px" }}
          src={values}
          alt="lỗi"
        />
      ),
    },
    {
      title: "Thao tác",
      width: "50",
      render: (val, row, index) => (
        <span style={{ cursor: "pointer" }} onClick={() => handleDelete(index)}>
          <DeleteOutlined />
        </span>
      ),
    },
  ];
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRow(selectedRows);
    },
  };
  function handleDataFiles() {
    if (selectedRow.length > max) {
      messageError(`Tối đa chỉ được chọn ${max} ảnh`);
      return;
    }
    dataFile(selectedRow);
    closePreview();
  }
  return (
    <Modal
      open={show}
      onCancel={closePreview}
      onOk={handleDataFiles}
      width={400}
    >
      <div>
        <Button
          type="primary"
          style={{
            marginBottom: 16,
            marginRight: 20,
          }}
          onClick={handleButtonClick}
          icon={<PlusOutlined />}
        >
          Upload ảnh
        </Button>
        <Table
          rowSelection={{
            fixed: "left",
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={files}
          pagination={false}
        />
      </div>
    </Modal>
  );
}

export default ImageUpload;
