import { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import {
  viewSubContent,
  deleteSubContent,
} from "../../../../services/api/programsApi";
import useModal from "../../../../hooks/useModal";
import useDialog from "../../../../hooks/useDialog";
import { toast } from "react-toastify";
import ReusableModal from "../../../../Components/ReusableModal";
import CreateSubContent from "./CreateSubContent";
import EditSubContent from "./EditSubContent";
import ViewSubcontent from "../Subcontent/ViewSubcontent";
import CreateAssesment from "../Assesment/createAssesment";

const SubContent = ({ id, courseId }) => {
  const [data, setData] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const getData = async (id) => {
    await viewSubContent(id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  const { Modal, setShowModal } = useModal();
  const { Modal: View, setShowModal: ShowView } = useModal();
  const { Modal: CreateAssess, setShowModal: ShowCreateAssess } = useModal();
  const { Modal: Edit, setShowModal: ShowEdit } = useModal();
  const { Dialog: Delete, setShowModal: ShowDelete } = useDialog();

  const openDetails = (itemId) => {
    setSelectedItem(itemId);
    ShowView(true);
  };

  const openEdit = (item) => {
    setSelectedItem(item);
    ShowEdit(true);
  };

  const openDelete = (itemId) => {
    setSelectedId(itemId);
    ShowDelete(true);
  };

  const deleteThisSubContent = () => {
    setIsBusy(true);
    deleteSubContent(selectedId)
      .then((data) => {
        toast.success(data.message);
        setIsBusy(false);
        getData(id);
        ShowDelete(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsBusy(false);
      });
  };

  return (
    <div className="!syne">
      <div className="flex items-center gap-x-3">
        <div
          className="flex items-center gap-x-2 cursor-pointer fw-600 text-primary !syne"
          onClick={() => setShowModal(true)}
        >
          <IoAddCircle className="text-xl" /> Add SubContent
        </div>
        <div
          className="flex items-center gap-x-2 cursor-pointer fw-600 text-primary !syne"
          onClick={() => ShowCreateAssess(true)}
        >
          <IoAddCircle className="text-xl" /> Add Assessment
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {!!data?.length &&
          data.map((item) => (
            <div
              className="flex justify-between items-center cursor-pointer shadow p-2 rounded"
              key={item.id}
            >
              <div
                className="flex gap-x-2 flex-1"
                onClick={() => openDetails(item.id)}
              >
                <span className="w-3 h-3 circle mt-2 bg-primary"></span>
                <p className="fs-600">{item.title}</p>
                {item?.mediaType === "assessment" && (
                  <p className="px-3 fs-300 bg-primary text-white rounded-lg">
                    Assessment
                  </p>
                )}
              </div>
              <div className="flex items-center gap-x-4">
                <p>{item.duration} Min(s)</p>
                <div
                  className="flex items-center gap-x-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaRegEdit
                    className="cursor-pointer text-lg text-gray-600 hover:text-primary"
                    onClick={() => openEdit(item)}
                  />
                  <RiDeleteBin6Line
                    className="cursor-pointer text-lg text-gray-600 hover:text-red-500"
                    onClick={() => openDelete(item.id)}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>

      <Modal title={"Add Sub Content"} size={"lg"} type={"withCancel"}>
        <CreateSubContent
          id={id}
          courseId={courseId}
          close={() => setShowModal(false)}
          refetch={() => getData(id)}
        />
      </Modal>

      <View title={"Course Sub Content"} size={"lg"} type={"withCancel"}>
        <ViewSubcontent id={selectedItem} />
      </View>

      <Edit title={"Edit Sub Content"} size={"md"} type={"withCancel"}>
        <EditSubContent
          item={selectedItem}
          close={() => ShowEdit(false)}
          refetch={() => getData(id)}
        />
      </Edit>

      <Delete title={""} size={"xs"}>
        <ReusableModal
          title={"Are you sure you want to delete this sub content?"}
          actionTitle={"Delete"}
          cancelTitle={"Cancel"}
          closeModal={() => ShowDelete(false)}
          action={deleteThisSubContent}
          isBusy={isBusy}
        />
      </Delete>

      <CreateAssess title={"Add Assessment"} size={"lg"} type={"withCancel"}>
        <CreateAssesment
          id={id}
          courseId={courseId}
          close={() => ShowCreateAssess(false)}
          refetch={() => getData(id)}
        />
      </CreateAssess>
    </div>
  );
};

export default SubContent;
