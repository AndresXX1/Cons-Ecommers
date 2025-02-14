export interface Province {
  id: number;
  province: string;
  cities: string[];
}

export const provinces: Province[] = [
  {
    id: 1,
    province: "Buenos Aires",
    cities: [
      "La Plata",
      "Mar del Plata",
      "Bahía Blanca",
      "Lanús",
      "Avellaneda",
      "Quilmes",
      "Merlo",
      "Tigre",
      "Pilar",
      "Lomas de Zamora",
      "San Isidro",
      "Tres de Febrero",
      "Almirante Brown",
      "Vicente López",
      "San Martín",
      "Morón",
      "Berazategui",
      "Ensenada",
      "Campana",
      "Zárate",
      "San Fernando",
      "Malvinas Argentinas",
      "Florencio Varela",
      "Escobar",
    ],
  },
  {
    id: 2,
    province: "Catamarca",
    cities: [
      "San Fernando del Valle de Catamarca",
      "Fiambalá",
      "Belén",
      "Bañados de Abajo",
      "Andalgalá",
      "Santa María",
      "Pomán",
      "Chumbivilcas",
      "Tinogasta",
      "El Alto",
    ],
  },
  {
    id: 3,
    province: "Chaco",
    cities: [
      "Resistencia",
      "Barranqueras",
      "Presidencia Roque Sáenz Peña",
      "Villa Ángela",
      "Charata",
      "Las Breñas",
      "Makallé",
      "Quitilipi",
      "Pampa del Indio",
      "General San Martín",
    ],
  },
  {
    id: 4,
    province: "Chubut",
    cities: [
      "Puerto Madryn",
      "Comodoro Rivadavia",
      "Trelew",
      "Rawson",
      "Esquel",
      "Dolavon",
      "Gaiman",
      "Sarmiento",
      "Tecka",
      "Río Pico",
    ],
  },
  {
    id: 5,
    province: "Córdoba",
    cities: [
      "Córdoba",
      "Villa María",
      "Río Cuarto",
      "Cosquín",
      "San Francisco",
      "Villa Carlos Paz",
      "Morteros",
      "Bell Ville",
      "La Falda",
      "Rio Tercero",
    ],
  },
  {
    id: 6,
    province: "Corrientes",
    cities: [
      "Corrientes",
      "Goya",
      "Esquina",
      "Mercedes",
      "Bella Vista",
      "Saladas",
      "San Luis del Palmar",
      "Ituzaingó",
      "Colonia Carlos Pellegrini",
      "Monte Caseros",
    ],
  },
  {
    id: 7,
    province: "Entre Ríos",
    cities: [
      "Paraná",
      "Concordia",
      "Gualeguaychú",
      "Colón",
      "Concepción del Uruguay",
      "La Histórica",
      "Diamante",
      "Villaguay",
      "Crespo",
      "Nogoyá",
    ],
  },
  {
    id: 8,
    province: "Formosa",
    cities: [
      "Formosa",
      "Clorinda",
      "Pirané",
      "Laguna Blanca",
      "El Colorado",
      "Herradura",
      "Villa Escolar",
      "Ibarreta",
      "Las Lomitas",
      "San Francisco del Laishi",
    ],
  },
  {
    id: 9,
    province: "Jujuy",
    cities: [
      "San Salvador de Jujuy",
      "Perico",
      "Palpala",
      "La Quiaca",
      "Humahuaca",
      "Tilcara",
      "Libertador General San Martín",
      "San Pedro",
      "El Carmen",
      "Maimará",
    ],
  },
  {
    id: 10,
    province: "La Pampa",
    cities: [
      "Santa Rosa",
      "General Pico",
      "Toay",
      "Intendente Alvear",
      "Realicó",
      "Macachín",
      "Victorica",
      "Ceballos",
      "Uriburu",
      "La Adela",
    ],
  },
  {
    id: 11,
    province: "La Rioja",
    cities: [
      "La Rioja",
      "Chilecito",
      "Sanagasta",
      "Vigasto",
      "Famatina",
      "Aimogasta",
      "Villa Unión",
      "San Blas de los Sauces",
      "General Felipe Varela",
    ],
  },
  {
    id: 12,
    province: "Mendoza",
    cities: [
      "Mendoza",
      "San Rafael",
      "Godoy Cruz",
      "Las Heras",
      "Maipú",
      "Luján de Cuyo",
      "Guaymallén",
      "Rivadavia",
      "Tunuyán",
      "San Martín",
    ],
  },
  {
    id: 13,
    province: "Misiones",
    cities: [
      "Posadas",
      "Oberá",
      "Eldorado",
      "Puerto Iguazú",
      "San Vicente",
      "Apóstoles",
      "Leandro N. Alem",
      "Montecarlo",
      "Candelaria",
      "Garupá",
    ],
  },
  {
    id: 14,
    province: "Neuquén",
    cities: [
      "Neuquén",
      "Cutral-Co",
      "Plottier",
      "San Martín de los Andes",
      "Zapala",
      "Senillosa",
      "Picún Leufú",
      "El Chocón",
      "San Patricio del Chañar",
      "Aluminé",
    ],
  },
  {
    id: 15,
    province: "Río Negro",
    cities: [
      "Viedma",
      "General Roca",
      "Cipolletti",
      "Bariloche",
      "Allen",
      "Villa Regina",
      "Las Grutas",
      "Río Colorado",
      "Catriel",
      "El Bolsón",
    ],
  },
  {
    id: 16,
    province: "Salta",
    cities: [
      "Salta",
      "Orán",
      "Rosario de la Frontera",
      "Tartagal",
      "Metán",
      "San Ramón de la Nueva Orán",
      "La Caldera",
      "Cafayate",
      "Campo Quijano",
      "General Güemes",
    ],
  },
  {
    id: 17,
    province: "San Juan",
    cities: [
      "San Juan",
      "Rawson",
      "Jáchal",
      "Ullum",
      "Caucete",
      "Rivadavia",
      "Chimbas",
      "Zonda",
      "25 de Mayo",
      "Sarmiento",
    ],
  },
  {
    id: 18,
    province: "San Luis",
    cities: [
      "San Luis",
      "Villa Mercedes",
      "La Punta",
      "Fraga",
      "Merlo",
      "Concarán",
      "Justo Daract",
      "Beazley",
      "El Trapiche",
      "La Toma",
    ],
  },
  {
    id: 19,
    province: "Santa Cruz",
    cities: [
      "Río Gallegos",
      "El Calafate",
      "Caleta Olivia",
      "Las Heras",
      "Puerto San Julián",
      "Pico Truncado",
      "Los Antiguos",
      "Gobernador Gregores",
      "Perito Moreno",
      "Cañadón Seco",
    ],
  },
  {
    id: 20,
    province: "Santa Fe",
    cities: [
      "Santa Fe",
      "Rosario",
      "Rafaela",
      "Venado Tuerto",
      "Reconquista",
      "San Lorenzo",
      "Cañada de Gómez",
      "Villa Gobernador Gálvez",
      "Las Parejas",
      "Funes",
    ],
  },
  {
    id: 21,
    province: "Santiago del Estero",
    cities: [
      "Santiago del Estero",
      "La Banda",
      "Termas de Río Hondo",
      "Frías",
      "Añatuya",
      "Selva",
      "Quimilí",
      "Colonia Dora",
      "Beltrán",
      "Sumampa",
    ],
  },
  {
    id: 22,
    province: "Tierra del Fuego",
    cities: [
      "Ushuaia",
      "Rio Grande",
      "Tolhuin",
      "Punta Arenas",
      "Las Heras",
      "Río Grande",
      "Cerro Castillo",
    ],
  },
  {
    id: 23,
    province: "Tucumán",
    cities: [
      "San Miguel de Tucumán",
      "Tafí Viejo",
      "Concepción",
      "Famaillá",
      "Yerba Buena",
      "Simoca",
      "Lules",
      "Bella Vista",
      "Aguilares",
      "Monteros",
    ],
  },
];
