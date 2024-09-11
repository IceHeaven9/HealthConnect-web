import { ToastContainer } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import { HamburgerMenu } from "../components/HamburgerMenu";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { IoIosArrowDown } from "react-icons/io";

export const ConsultationPage = () => {
  return (
    <main>
      <HamburgerMenu />
      <div className="h-min w-max pl-4 pr-4 pt-1 text-lightBlue"></div>
      <div className="flex items-center justify-start text-center text-lightBlue h-min p-4 mb-8">
        <ToastContainer />
        <button className="text-center pr-12">
          <IoMdArrowRoundBack size={30} />
        </button>
        <p className="text-4xl font-bold font-roboto mt-1"> Mis consultas</p>
      </div>
      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Buscar consulta..."
          className="bg-lightCakeBlue rounded-xl p-2 w-1/2"
        />
      </div>
      <div>
        <Accordion>
          <AccordionItem
            header={
              <div className="flex gap-1">
                <div>CONSULTAS PENDIENTES</div>
                <IoIosArrowDown />
              </div>
            }
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </AccordionItem>

          <AccordionItem header="">
            Quisque eget luctus mi, vehicula mollis lorem. Proin fringilla vel
            erat quis sodales. Nam ex enim, eleifend venenatis lectus vitae,
            accumsan auctor mi.
          </AccordionItem>

          <AccordionItem header="Why do we use it?">
            Suspendisse massa risus, pretium id interdum in, dictum sit amet
            ante. Fusce vulputate purus sed tempus feugiat.
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
};
