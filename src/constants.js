export const LOCAL_STORAGE_TOKEN_KEY = "TOKEN";

export const customStyles = {
  content: {
    height: "70%",
    weight: "100%",
    maxWidth: "600px",
    borderRadius: "25px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    padding: "20px",
    boxSizing: "border-box",
  },
};

export const consultationsFilesModal = {
  content: {
    height: "max-content",
    minWidth: "300px",
    maxWidth: "1140px",
    borderRadius: "25px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    backgroundColor: "rgb(202, 214, 255)",
    padding: "20px",
    boxSizing: "border-box",
  },
};

export const maxContent = {
  content: {
    height: "max-content",
    maxWidth: "1140px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgb(98, 142, 255)",
    backgroundColor: "rgb(245, 245, 245)",
    width: "90%",
    borderRadius: "25px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
  },
};

export const API_HOST = import.meta.env.VITE_API_HOST;

export const miniCustomStyles = {
  content: {
    height: "55%",
    width: "90%",
    maxWidth: "500px",
    borderRadius: "25px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    padding: "20px",
    boxSizing: "border-box",
  },
};

export const microCustomStyles = {
  content: {
    height: "max-content",
    width: "90%",
    maxWidth: "400px",
    borderRadius: "25px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    padding: "20px",
    boxSizing: "border-box",
    backgroundColor: "#bdd0ff",
  },
};

export const specialtiesResume = [
  {
    id: 1,
    name: "Cardiología",
    icon: "/images/specialtyIcons/cardiologia.png",
    resume:
      "Nos encargamos del estudio, diagnóstico y tratamiento de las enfermedades del corazón y el sistema circulatorio. Nuestros cardiólogos tratan afecciones como hipertensión, insuficiencia cardíaca, arritmias, infartos y enfermedades coronarias, buscando prevenir complicaciones y mejorar la calidad de vida de los pacientes.",
  },
  {
    id: 2,
    name: "Dermatología",
    icon: "/images/specialtyIcons/cabello.png",
    resume:
      "Nos centramos en el diagnóstico y tratamiento de enfermedades de la piel, cabello y uñas. Nuestros dermatólogos tratan desde problemas comunes como el acné, hasta enfermedades más complejas como psoriasis, dermatitis, cáncer de piel y trastornos capilares.",
  },
  {
    id: 3,
    name: "Endocrinología",
    icon: "/images/specialtyIcons/endocrinologia.png",
    resume:
      "Abordamos los trastornos del sistema endocrino, que regula las hormonas en el cuerpo. Nuestros endocrinólogos tratan enfermedades como la diabetes, trastornos tiroideos, problemas de crecimiento, menopausia, y otras condiciones hormonales que afectan el metabolismo y la salud general.",
  },
  {
    id: 4,
    name: "Gastroenterología",
    icon: "/images/specialtyIcons/estomago.png",
    resume:
      "Estamos especializados en el diagnóstico y tratamiento de enfermedades del sistema digestivo, que incluye el esófago, estómago, intestinos, hígado, páncreas y vías biliares. Tratamos afecciones como úlceras, reflujo ácido, síndrome de intestino irritable y enfermedades hepáticas.",
  },
  {
    id: 5,
    name: "Geriatría",
    icon: "/images/specialtyIcons/geriatria.png",
    resume:
      "Estamos enfocados en el cuidado integral de los adultos mayores, abordando tanto las enfermedades propias de la vejez como los aspectos preventivos para mejorar la calidad de vida. Nuestros geriatras tratan enfermedades crónicas, caídas, demencia, y problemas de movilidad.",
  },
  {
    id: 6,
    name: "Ginecología",
    icon: "/images/specialtyIcons/utero.png",
    resume:
      "Nos especializamos en la salud del sistema reproductor femenino, abarcando desde la adolescencia hasta la menopausia. Nuestros ginecólogos tratan problemas como irregularidades menstruales, quistes ováricos, infecciones, planificación familiar, y también realizan controles preventivos como el papanicolau.",
  },
  {
    id: 7,
    name: "Hematología",
    icon: "/images/specialtyIcons/hematologia.png",
    resume:
      "Estudiamos y tratamos las enfermedades de la sangre, médula ósea y órganos relacionados. Nuestros hematólogos manejan trastornos como la anemia, leucemia, linfomas y problemas de coagulación, asegurándose de que los sistemas sanguíneos funcionen correctamente.",
  },
  {
    id: 8,
    name: "Infectología",
    icon: "/images/specialtyIcons/sistema-inmune.png",
    resume:
      "Dedicados a la prevención, diagnóstico y tratamiento de enfermedades causadas por agentes infecciosos como bacterias, virus, hongos y parásitos. Nuestros infectólogos manejan enfermedades como el VIH, tuberculosis, infecciones tropicales y pandemias globales.",
  },
  {
    id: 9,
    name: "Medicina interna",
    icon: "/images/specialtyIcons/organos.png",
    resume:
      "Estamos encargados del diagnóstico y tratamiento no quirúrgico de enfermedades en adultos. Nuestros internistas manejan enfermedades crónicas y complejas como diabetes, hipertensión, enfermedades pulmonares y renales, ofreciendo una visión integral del paciente.",
  },
  {
    id: 10,
    name: "Nefrología",
    icon: "/images/specialtyIcons/nefrologia.png",
    resume:
      "Nos especializamos en el estudio de las enfermedades del riñón y sus tratamientos. Nuestros nefrólogos tratan insuficiencia renal, cálculos renales, infecciones urinarias recurrentes y ofrecen seguimiento a pacientes en diálisis o con trasplantes de riñón.",
  },
  {
    id: 11,
    name: "Neumología",
    icon: "/images/specialtyIcons/neumologia.png",
    resume:
      "Diagnosticamos y tratamos las enfermedades del sistema respiratorio, incluyendo pulmones y vías respiratorias. Nuestros neumólogos atienden problemas como asma, bronquitis crónica, EPOC, neumonía y cáncer de pulmón, trabajando para mejorar la respiración y la calidad de vida.",
  },
  {
    id: 12,
    name: "Neurología",
    icon: "/images/specialtyIcons/neurologia.png",
    resume:
      "Nos dedicamos al estudio y tratamiento de trastornos del sistema nervioso central y periférico. Nuestros neurólogos tratan enfermedades como migrañas, epilepsia, Parkinson, esclerosis múltiple y accidentes cerebrovasculares, mejorando el funcionamiento neurológico del paciente.",
  },
  {
    id: 13,
    name: "Oftalmología",
    icon: "/images/specialtyIcons/oftalmologia.png",
    resume:
      "Estamos especializados en el diagnóstico y tratamiento de las enfermedades del ojo, desde problemas de visión hasta condiciones más complejas como cataratas, glaucoma, desprendimiento de retina y trastornos oculares hereditarios. Nuestros oftalmólogos también realizan cirugías para corregir la visión.",
  },
  {
    id: 14,
    name: "Oncología",
    icon: "/images/specialtyIcons/oncologia.png",
    resume:
      "Estudiamos y tratamos el cáncer en sus diferentes formas, ya sea a través de quimioterapia, radioterapia, inmunoterapia o cirugía. Nuestros oncólogos brindan atención integral a los pacientes con cáncer, incluyendo su diagnóstico, tratamiento y cuidados paliativos en etapas avanzadas.",
  },
  {
    id: 15,
    name: "Pediatría",
    icon: "/images/specialtyIcons/pediatria.png",
    resume:
      "Nos dedicamos al cuidado integral de bebés, niños y adolescentes, abordando tanto enfermedades comunes como el seguimiento del crecimiento y desarrollo. Nuestros pediatras manejan infecciones, problemas respiratorios, alergias, vacunación y detección temprana de trastornos genéticos.",
  },
  {
    id: 16,
    name: "Psiquiatría",
    icon: "/images/specialtyIcons/psiquiatria.png",
    resume:
      "Estudiamos y tratamos los trastornos mentales, emocionales y del comportamiento. Nuestros psiquiatras diagnostican y tratan condiciones como depresión, ansiedad, trastornos bipolares, esquizofrenia y adicciones, utilizando terapias farmacológicas y psicoterapéuticas.",
  },
  {
    id: 17,
    name: "Reumatología",
    icon: "/images/specialtyIcons/reumatologia.png",
    resume:
      "Nos especializamos en el tratamiento de enfermedades que afectan las articulaciones, músculos y huesos, así como enfermedades autoinmunes. Nuestros reumatólogos tratan artritis reumatoide, lupus, osteoporosis y otras afecciones crónicas que pueden causar dolor y movilidad limitada.",
  },
  {
    id: 18,
    name: "Traumatología",
    icon: "/images/specialtyIcons/hueso-roto.png",
    resume:
      "Nos ocupamos del diagnóstico y tratamiento de lesiones y trastornos del sistema musculoesquelético, especialmente los relacionados con huesos, ligamentos, tendones y músculos. Nuestros traumatólogos tratan fracturas, esguinces, lesiones deportivas y realizan cirugías ortopédicas.",
  },
  {
    id: 19,
    name: "Urología",
    icon: "/images/specialtyIcons/urologia.png",
    resume:
      "Estamos dedicados al tratamiento de trastornos del sistema urinario en hombres y mujeres, y del sistema reproductor masculino. Nuestros urólogos manejan problemas como infecciones urinarias, incontinencia, cálculos renales y disfunción eréctil.",
  },
  {
    id: 20,
    name: "Otorrinolaringología",
    icon: "/images/specialtyIcons/oido.png",
    resume:
      "Nos enfocamos en el diagnóstico y tratamiento de enfermedades que afectan el oído, nariz y garganta, así como trastornos relacionados con el equilibrio y el habla. Nuestros otorrinolaringólogos tratan problemas como sinusitis, otitis, vértigo, y ronquidos.",
  },
];
