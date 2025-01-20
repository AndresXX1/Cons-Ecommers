export interface IStore {
  id: number;
  store: string;
  address: string;
  phone?: number;
  map?: string;
}

const stores: IStore[] = [
  {
    id: 1,
    store: "LOMAS",
    address: "Calle 844 Nº2364",
    phone: 5491132524297,
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.7439913767926!2d-58.401153924611656!3d-34.76204127289793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd2eb35b4caa3%3A0x1340aa21851ff4e4!2sArgenpesos%20Lomas%20de%20Zamora!5e0!3m2!1ses!2sar!4v1732402990565!5m2!1ses!2sar"
  },
  {
    id: 2,
    store: "LANUS",
    address: "9 de Julio 1101, Esquina 29 de septiembre",
    phone: 5491132524303,
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1639.9560830901569!2d-58.39061808819808!3d-34.70739526334492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccd2311f52659%3A0xf2c12c2fca9dffd7!2sAv.%209%20de%20Julio%20%26%2029%20de%20Septiembre%2C%20B1824%20Lan%C3%BAs%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1732402624631!5m2!1ses!2sar"
  },
  {
    id: 3,
    store: "AVELLANEDA",
    address: "Av. Mitre 531",
    phone: 5491132525817,
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d205.11013614926603!2d-58.36775323535528!3d-34.66070856232686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a33353b4e5da03%3A0x15e9476702e15a2f!2sAAF%2C%20Av.%20Bartolom%C3%A9%20Mitre%20531%2C%20B1870%20Avellaneda%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1732402703868!5m2!1ses!2sar"
  },
  {
    id: 4,
    store: "SAN JOSE",
    address: "Salta 87",
    phone: 5491121654919,
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104830.37947968546!2d-58.42729830273434!3d-34.807215899999974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb87faf13bfd%3A0xd03f06627ac3cdfa!2sArgenpesos%20San%20Jos%C3%A9!5e0!3m2!1ses!2sar!4v1732403950390!5m2!1ses!2sar"
  },
  {
    id: 5,
    store: "SOLANO",
    address: "Calle 844 Nº2364",
    phone: 5491126649025,
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204.81568060912184!2d-58.31060464541048!3d-34.779494157548804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32c6914a051fd%3A0x9bb20f852b24e21a!2sAv.%20844%202364%2C%20B1881%20San%20Francisco%20Solano%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1732402923119!5m2!1ses!2sar"
  },
  {
    id: 6,
    store: "VARELA",
    address: "Monteagudo 3053 ex 345",
    phone: 5491132524920,
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104830.37947968546!2d-58.42729830273434!3d-34.807215899999974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32960cd69b3d5%3A0xc287eb2e85b5f76d!2sArgenpesos%20Florencio%20Varela!5e0!3m2!1ses!2sar!4v1732403826468!5m2!1ses!2sar"
  },
  {
    id: 7,
    store: "BERAZATEGUI",
    address: "Av.14 N°5022",
    phone: 5491165510676,
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.802515513673!2d-58.20697573975864!3d-34.76056723498963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32f495065dca1%3A0x1d7ae10f38c5656f!2sAv.%2014%205022%2C%20B1880%20Berazategui%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1732403765233!5m2!1ses!2sar"
  },
  {
    id: 8,
    store: "QUILMES",
    address: "Av. Rivadavia 96",
    phone: 5491162229929,
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.2908694995185!2d-58.25916937882546!3d-34.72306192009727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32e6aeb9261f5%3A0x5c41b37044021b7b!2sAv.%20Rivadavia%2096%2C%20B1879%20Quilmes%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1732403737693!5m2!1ses!2sar"
  },
  {
    id: 9,
    store: "LAFERRERE",
    address: "Av. Luro 6096",
    phone: 5491171448047,
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.2357588565337!2d-58.58583574906921!3d-34.74965350538301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc5a5cacefc65%3A0x36223fdc3d62728a!2sARQ%2C%20Av.%20Luro%206096%2C%20B1757%20Gregorio%20de%20Laferrere%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1732403702158!5m2!1ses!2sar"
  },
  {
    id: 10,
    store: "LINIERS",
    address: "Av. Rivadavia 11640",
    phone: 5491126689818,
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.6033489326474!2d-58.53069052461754!3d-34.639462672941505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc83f7d73ffff%3A0x9432e50fcb789198!2sAv.%20Rivadavia%2011640%2C%20C1408ABQ%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1732403644612!5m2!1ses!2sar"
  },
  {
    id: 11,
    store: "SAN JUSTO",
    address: "Arieta 3320",
    phone: 5491165510706,
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.9927076658632!2d-58.5584625918725!3d-34.68013351738789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc6265ca1feab%3A0x7cf9be926ec4682c!2sDr.%20Ignacio%20Arieta%203320%2C%20B1754AQH%20San%20Justo%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1732403608864!5m2!1ses!2sar"
  },
  {
    id: 12,
    store: "MORENO",
    address: "Av. Libertador 165",
    phone: 5491171448039,
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.26568207455!2d-58.79331672461706!3d-34.64799267293846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9451172eee71%3A0xc136c128873b51!2sAv.%20del%20Libertador%20165%2C%20B1744%20AAB%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1732403568921!5m2!1ses!2sar"
  },
  {
    id: 13,
    store: "SAN MIGUEL",
    address: "Presidente Perón 1185",
    phone: 5491132523061,
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.3130528238053!2d-58.707373873616!3d-34.54562831667997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbd0eb44c210d%3A0x9eab370e9a254be6!2sAv.%20Pte.%20J.%20D.%20Per%C3%B3n%201185%2C%20B1663GHA%20San%20Miguel%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1732403480699!5m2!1ses!2sar"
  },
  {
    id: 14,
    store: "SAN FERNANDO",
    address: "Constitución 198",
    phone: 5491126531114,
    map:"https://www.google.com/maps/embed/v1/place?q=argenpesos+san+fernando&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
  },
  {
    id: 15,
    store: "LA GRAN DULCE",
    address: "Av. 27 de Febrero & Av.Gral. Paz",
    phone: 0,
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.996644582062!2d-58.46487422461429!3d-34.70526457291803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccc20ad6918d1%3A0x2f9288394af2aea!2sAv.%2027%20de%20Febrero%20%26%20Av.%20Gral.%20Paz%2C%20B1827%20Villa%20Celina%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1732403363602!5m2!1ses!2sar"
  },
];

interface SelectProps {
  // options?: IStore[];
  placeholder?: string;
  onChange: (store: IStore) => void;
}

const Stores: React.FC<SelectProps> = ({
  // options = stores,
  placeholder = "Seleccione una tienda",
  onChange,
}) => {
  const handleSelectChange = (value: number) => {
    const selectedStore = stores.find((store) => store.id === value); // Buscamos el objeto correspondiente
    if (selectedStore && onChange) {
      onChange(selectedStore); // Llamamos a onChange con el objeto completo
    }
  }
  return (
    // <div className="w-[160px] h-[40px] border-[1px] border-argenpesos-gray3 ml-5 flex items-center justify-between px-4 rounded-[8px] mt-6 lg:w-[174px] lg:h-[46px] cursor-pointer">
    <select
      className="w-[160px] h-[40px] border-[1px] border-argenpesos-gray3 ml-5 flex items-center justify-between px-4 rounded-[8px] mt-6 lg:w-[274px] lg:h-[46px] cursor-pointer"
      defaultValue=""
      onChange={(e) => handleSelectChange(Number(e.target.value))}
      // onChange={(e) => onChange(Number(e.target.value))}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {stores.map((store) => (
        <option key={store.id} value={store.id}>
          {store.store}
        </option>
      ))}
    </select>
    // </div>
  );
};

export default Stores;
