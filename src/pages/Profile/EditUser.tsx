import { useState } from "react";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { IconX } from "../../utils/svg";

const EditUser = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Modal
        isShown={openModal}
        element={
          <div className="w-[621px] p-10">
            <div className="flex justify-between items-center w-full mb-7">
              <h3 className="text-[32px] font-bold text-argenpesos-textos ">
                Editar información
              </h3>
              <div
                onClick={() => setOpenModal(false)}
                className="cursor-pointer z-[200]"
              >
                <IconX />
              </div>
            </div>

            <div className="flex flex-row gap-3 justify-end">
              <Button
                text="Cancelar"
                className="w-[110px] bg-argenpesos-white border-argenpesos-textos text-argenpesos-textos border-[1px] h-[38px] mx-0"
              />
              <Button className="w-[110px] h-[38px] mx-0" text="Guardar" />
            </div>
          </div>
        }
      ></Modal>
      <div>
        <p
          onClick={() => setOpenModal(true)}
          className="text-[14px] lg:text-[16px] font-book text-argenpesos-red mb-8 cursor-pointer"
        >
          Editar información
        </p>
      </div>
    </>
  );
};

export default EditUser;
