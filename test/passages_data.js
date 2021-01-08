const Passage = require("../models/passage");

const subjectIds = [
  { subject: "Chemistry/Physics", id: "5ff6dc15cca00e2cd0484aa1" },
  { subject: "Biology/Biochemistry", id: "5ff6dc15cca00e2cd0484aa1" },
  { subject: "CARS", id: "5ff6dc15cca00e2cd0484aa3" },
  { subject: "Psychology/Sociology", id: "5ff6dc15cca00e2cd0484aa4" },
];

// PASSAGES
const passages = [
  // chemistry/physics
  new Passage({
    subject: subjectIds[0].id,
    passage: `A chemical bond is a lasting attraction between atoms, ions or molecules that enables the formation of chemical compounds. The bond may result from the electrostatic force of attraction between oppositely charged ions as in ionic bonds or through the sharing of electrons as in covalent bonds. The strength of chemical bonds varies considerably; there are "strong bonds" or "primary bonds" such as covalent, ionic and metallic bonds, and "weak bonds" or "secondary bonds" such as dipole–dipole interactions, the London dispersion force and hydrogen bonding.`,
    passagename: "chemical bond",
  }),
  new Passage({
    subject: subjectIds[0].id,
    passage: `Electromagnetism is a branch of physics involving the study of the electromagnetic force, a type of physical interaction that occurs between electrically charged particles. The electromagnetic force is carried by electromagnetic fields composed of electric fields and magnetic fields, and it is responsible for electromagnetic radiation such as light. It is one of the four fundamental interactions (commonly called forces) in nature, together with the strong interaction, the weak interaction, and gravitation.[1] At high energy the weak force and electromagnetic force are unified as a single electroweak force.`,
    passagename: "electromagnetism",
  }),
  new Passage({
    subject: subjectIds[0].id,
    passage: `An electromagnetic field (also EM field) is a classical (i.e. non-quantum) field produced by accelerating electric charges.[1] It is the field described by classical electrodynamics and is the classical counterpart to the quantized electromagnetic field tensor in quantum electrodynamics. The electromagnetic field propagates at the speed of light (in fact, this field can be identified as light) and interacts with charges and currents. Its quantum counterpart is one of the four fundamental forces of nature (the others are gravitation, weak interaction and strong interaction.)`,
    passagename: "electromagnetic fields",
  }),

  //   BIOLOGY /BIOCHEMISTRY
  new Passage({
    subject: subjectIds[1].id,
    passage: `Biology is the natural science that studies life and living organisms, including their physical structure, chemical processes, molecular interactions, physiological mechanisms, development and evolution.[1] Despite the complexity of the science, certain unifying concepts consolidate it into a single, coherent field. Biology recognizes the cell as the basic unit of life, genes as the basic unit of heredity, and evolution as the engine that propels the creation and extinction of species. Living organisms are open systems that survive by transforming energy and decreasing their local entropy[2] to maintain a stable and vital condition defined as homeostasis.[3]`,
    passagename: "BIology",
  }),
  new Passage({
    subject: subjectIds[1].id,
    passage: `Physiology (/ˌfɪziˈɒlədʒi/; from Ancient Greek φύσις (physis) 'nature, origin', and -λογία (-logia) 'study of'[1]) is the scientific study of functions and mechanisms in a living system.[2][3] As a sub-discipline of biology, physiology focuses on how organisms, organ systems, individual organs, cells, and biomolecules carry out the chemical and physical functions in a living system.[4] According to the classes of organisms, the field can be divided into medical physiology, animal physiology, plant physiology, cell physiology, and comparative physiology.[4]`,
    passagename: "Physiology",
  }),

  new Passage({
    subject: subjectIds[1].id,
    passage: `Organisms are classified by taxonomy into groups such as multicellular animals, plants, and fungi; or unicellular microorganisms such as protists, bacteria, and archaea.[1] All types of organisms are capable of reproduction, growth and development, maintenance, and some degree of response to stimuli. Humans, squids, mushrooms, and vascular plants are examples of multicellular organisms that differentiate specialized tissues and organs during development.`,
    passagename: "Organisms",
  }),

  //   CARS
  new Passage({
    subject: subjectIds[2].id,
    passage: `Cars came into global use during the 20th century, and developed economies depend on them. The year 1886 is regarded as the birth year of the modern car when German inventor Karl Benz patented his Benz Patent-Motorwagen. Cars became widely available in the early 20th century. One of the first cars accessible to the masses was the 1908 Model T, an American car manufactured by the Ford Motor Company. Cars were rapidly adopted in the US, where they replaced animal-drawn carriages and carts, but took much longer to be accepted in Western Europe and other parts of the world.[citation needed]`,
    passagename: "cars",
  }),
  new Passage({
    subject: subjectIds[2].id,
    passage: `The vehicle propulsion is provided by an engine or motor, usually an internal combustion engine or an electric motor, or some combination of the two, such as hybrid electric vehicles and plug-in hybrids. For legal purpose, motor vehicles are often identified within a number of vehicle classes including cars, buses, motorcycles, off-road vehicles, light trucks and regular trucks. These classifications vary according to the legal codes of each country. ISO 3833:1977 is the standard for road vehicle types, terms and definitions.[2] Generally, to avoid requiring handicapped persons from having to possess an operator's license to use one, or requiring tags and insurance, powered wheelchairs will be specifically excluded by law from being considered motor vehicles.`,
    passagename: "motor Vehicle",
  }),
  new Passage({
    subject: subjectIds[2].id,
    passage: `The vehicle propulsion is provided by an engine or motor, usually an internal combustion engine or an electric motor, or some combination of the two, such as hybrid electric vehicles and plug-in hybrids. For legal purpose, motor vehicles are often identified within a number of vehicle classes including cars, buses, motorcycles, off-road vehicles, light trucks and regular trucks. These classifications vary according to the legal codes of each country. ISO 3833:1977 is the standard for road vehicle types, terms and definitions.[2] Generally, to avoid requiring handicapped persons from having to possess an operator's license to use one, or requiring tags and insurance, powered wheelchairs will be specifically excluded by law from being considered motor vehicles.`,
    passagename: "Vehicle Propulsion",
  }),
];

module.exports = passages;
