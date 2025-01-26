import { Modal } from "antd";

export const showDeleteConfirm = (
  handleRowDeleteRow: () => void,
  id: string,
) => {
  const { confirm } = Modal;
  confirm({
    title: "حذف ردیف",
    content: (
      <span>
        آیا از حذف ردیف شماره{" "}
        <span className="text-red-500 text-[17px] font-bold">{id}</span> اطمینان
        دارید؟
      </span>
    ),
    okText: "بله",
    okType: "danger",
    cancelText: "خیر",
    onOk() {
      handleRowDeleteRow();
    },
  });
};
