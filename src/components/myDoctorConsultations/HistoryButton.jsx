import Modal from "react-modal";
import PropTypes from "prop-types";
import { customStyles } from "../../constants";
import { IoClose } from "react-icons/io5";
import { SearchBar } from "../myConsultations/SearchBar";
import { fetchHistoryConsultations } from "./fetch/historyFetch";
import { notify } from "../../utils/notify";

export const HistoryButton = ({
  openModal,
  closeModal,
  isModalOpen,
  token,
  navigate,
  currentUser,
  historyConsultations,
  setHistoryConsultations,
}) => {
  return (
    <>
      <button
        className="bg-lightBlue text-smokeWhite w-full font-bold text-base p-2 rounded-lg active:scale-95 transition-transform transform"
        onClick={() => openModal()}
      >
        Historial de consultas
      </button>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={() => {
          fetchHistoryConsultations(token, currentUser.decoded.id)
            .then((historyConsultations) => {
              setHistoryConsultations(historyConsultations);
            })
            .catch((error) => notify(error.message));
        }}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button onClick={closeModal}>
          <IoClose size={30} />
        </button>
        <h2 className="text-3xl font-bold text-center text-lightBlue font-roboto my-6">
          Historial de consultas
        </h2>
        <SearchBar />
        <section className="w-full">
          {historyConsultations.length === 0 ? (
            <article>
              <div className="flex flex-col rounded-2xl m-6 bg-smokeWhite shadow-xl">
                <div className="flex flex-col p-8">
                  <div className="text-md font-inter font-bold text-center text-[#374151]">
                    No hay consultas disponibles
                  </div>
                  <div className="flex justify-end pt-6"></div>
                </div>
              </div>
            </article>
          ) : (
            historyConsultations
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((consultation) => (
                <article key={consultation.id}>
                  <div className="flex flex-col rounded-2xl m-6 bg-smokeWhite shadow-xl">
                    <div className="flex flex-col p-8">
                      <div className="text-lg flex justify-between items-center font-bold text-[#374151] pb-6">
                        {new Date(consultation.date).toLocaleDateString(
                          "es-ES",
                        )}
                        <div className="text-sm text-warning">
                          {consultation.status.toUpperCase()}
                        </div>
                      </div>
                      <div className="text-md text-start font-inter font-bold text-[#374151]">
                        {consultation.title.toUpperCase()}
                      </div>
                      <div className="flex justify-end pt-6">
                        <button
                          className="bg-[#628eff] text-[#f5f5f5] w-full font-bold text-base p-2 rounded-lg active:scale-95 transition-transform transform"
                          onClick={() =>
                            navigate(`/consultation/${consultation.id}/details`)
                          }
                        >
                          Ver Ficha
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
          )}
        </section>
      </Modal>
    </>
  );
};

HistoryButton.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    decoded: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  historyConsultations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setHistoryConsultations: PropTypes.func.isRequired,
};
