import { useState } from 'react';


// CSS:
import './App.css';

// Google fonts:
import WebFont from 'webfontloader';

// Imports:
import Map from './components/Map.js';
import CurrentData from './components/CurrentData.js';
import Cards from './components/Cards.js';
import Searchbar from './components/Searchbar.js';

WebFont.load({
  google: {
    families: [
      'Inter:200,600',
      'Montserrat:200',
      'Noto+Sans:ital,wght@0,200;0,600;1,300',
      'PT+Serif:700',
      'Playfair+Display:400,700',
      'Quicksand',
      'Space+Grotesk:wght@300;400;500;600'
    ],
  },
});


function App() {

      // Mapping of city names to timezone strings
    // Need to adjust capitalizaton so that second word is also capitalised
    const cityToTimezoneMap = {
      Berlin: 'Europe/Berlin',
      Abidjan: 'Africa/Abidjan',
      Algiers: 'Africa/Algiers',
      Bissau: 'Africa/Bissau',
      Cairo: 'Africa/Cairo',
      Casablanca: 'Africa/Casablanca',
      Ceuta: 'Africa/Ceuta',
      ElAaiun: 'Africa/El_Aaiun',
      Johannesburg: 'Africa/Johannesburg',
      Juba: 'Africa/Juba',
      Khartoum: 'Africa/Khartoum',
      Lagos: 'Africa/Lagos',
      Maputo: 'Africa/Maputo',
      Monrovia: 'Africa/Monrovia',
      Nairobi: 'Africa/Nairobi',
      Ndjamena: 'Africa/Ndjamena',
      SaoTome: 'Africa/Sao_Tome',
      Tripoli: 'Africa/Tripoli',
      Tunis: 'Africa/Tunis',
      Windhoek: 'Africa/Windhoek',
      Adak: 'America/Adak',
      Anchorage: 'America/Anchorage',
      Araguaina: 'America/Araguaina',
      BuenosAires: 'America/Argentina/Buenos_Aires',
      Catamarca: 'America/Argentina/Catamarca',
      Cordoba: 'America/Argentina/Cordoba',
      Jujuy: 'America/Argentina/Jujuy',
      LaRioja: 'America/Argentina/La_Rioja',
      Mendoza: 'America/Argentina/Mendoza',
      RioGallegos: 'America/Argentina/Rio_Gallegos',
      Salta: 'America/Argentina/Salta',
      SanJuan: 'America/Argentina/San_Juan',
      SanLuis: 'America/Argentina/San_Luis',
      Tucuman: 'America/Argentina/Tucuman',
      Ushuaia: 'America/Argentina/Ushuaia',
      Asuncion: 'America/Asuncion',
      Bahia: 'America/Bahia',
      BahiaBanderas: 'America/Bahia_Banderas',
      Barbados: 'America/Barbados',
      Belem: 'America/Belem',
      Belize: 'America/Belize',
      BoaVista: 'America/Boa_Vista',
      Bogota: 'America/Bogota',
      Boise: 'America/Boise',
      CambridgeBay: 'America/Cambridge_Bay',
      CampoGrande: 'America/Campo_Grande',
      Cancun: 'America/Cancun',
      Caracas: 'America/Caracas',
      Cayenne: 'America/Cayenne',
      Chicago: 'America/Chicago',
      Chihuahua: 'America/Chihuahua',
      CiudadJuarez: 'America/Ciudad_Juarez',
      CostaRica: 'America/Costa_Rica',
      Cuiaba: 'America/Cuiaba',
      Danmarkshavn: 'America/Danmarkshavn',
      Dawson: 'America/Dawson',
      DawsonCreek: 'America/Dawson_Creek',
      Denver: 'America/Denver',
      Detroit: 'America/Detroit',
      Edmonton: 'America/Edmonton',
      Eirunepe: 'America/Eirunepe',
      ElSalvador: 'America/El_Salvador',
      FortNelson: 'America/Fort_Nelson',
      Fortaleza: 'America/Fortaleza',
      GlaceBay: 'America/Glace_Bay',
      GooseBay: 'America/Goose_Bay',
      GrandTurk: 'America/Grand_Turk',
      Guatemala: 'America/Guatemala',
      Guayaquil: 'America/Guayaquil',
      Guyana: 'America/Guyana',
      Halifax: 'America/Halifax',
      Havana: 'America/Havana',
      Hermosillo: 'America/Hermosillo',
      Indianapolis: 'America/Indiana/Indianapolis',
      Knox: 'America/Indiana/Knox',
      Marengo: 'America/Indiana/Marengo',
      Petersburg: 'America/Indiana/Petersburg',
      TellCity: 'America/Indiana/Tell_City',
      Vevay: 'America/Indiana/Vevay',
      Vincennes: 'America/Indiana/Vincennes',
      Winamac: 'America/Indiana/Winamac',
      Inuvik: 'America/Inuvik',
      Iqaluit: 'America/Iqaluit',
      Jamaica: 'America/Jamaica',
      Juneau: 'America/Juneau',
      Louisville: 'America/Kentucky/Louisville',
      Monticello: 'America/Kentucky/Monticello',
      LaPaz: 'America/La_Paz',
      Lima: 'America/Lima',
      LosAngeles: 'America/Los_Angeles',
      Maceio: 'America/Maceio',
      Managua: 'America/Managua',
      Manaus: 'America/Manaus',
      Martinique: 'America/Martinique',
      Matamoros: 'America/Matamoros',
      Mazatlan: 'America/Mazatlan',
      Menominee: 'America/Menominee',
      Merida: 'America/Merida',
      Metlakatla: 'America/Metlakatla',
      MexicoCity: 'America/Mexico_City',
      Miquelon: 'America/Miquelon',
      Moncton: 'America/Moncton',
      Monterrey: 'America/Monterrey',
      Montevideo: 'America/Montevideo',
      NewYork: 'America/New_York',
      Nome: 'America/Nome',
      Noronha: 'America/Noronha',
      Beulah: 'America/North_Dakota/Beulah',
      Center: 'America/North_Dakota/Center',
      NewSalem: 'America/North_Dakota/New_Salem',
      Nuuk: 'America/Nuuk',
      Ojinaga: 'America/Ojinaga',
      Panama: 'America/Panama',
      Paramaribo: 'America/Paramaribo',
      Phoenix: 'America/Phoenix',
      // eslint-disable-next-line no-useless-computed-key
      ["Port-au-Prince"]: 'America/Port-au-Prince',
      PortoVelho: 'America/Porto_Velho',
      PuertoRico: 'America/Puerto_Rico',
      PuntaArenas: 'America/Punta_Arenas',
      RankinInlet: 'America/Rankin_Inlet',
      Recife: 'America/Recife',
      Regina: 'America/Regina',
      Resolute: 'America/Resolute',
      RioBranco: 'America/Rio_Branco',
      Santarem: 'America/Santarem',
      Santiago: 'America/Santiago',
      SantoDomingo: 'America/Santo_Domingo',
      SaoPaulo: 'America/Sao_Paulo',
      Scoresbysund: 'America/Scoresbysund',
      Sitka: 'America/Sitka',
      StJohns: 'America/St_Johns',
      SwiftCurrent: 'America/Swift_Current',
      Tegucigalpa: 'America/Tegucigalpa',
      Thule: 'America/Thule',
      Tijuana: 'America/Tijuana',
      Toronto: 'America/Toronto',
      Vancouver: 'America/Vancouver',
      Whitehorse: 'America/Whitehorse',
      Winnipeg: 'America/Winnipeg',
      Yakutat: 'America/Yakutat',
      Baghdad: 'Asia/Baghdad',
      Baku: 'Asia/Baku',
      Bangkok: 'Asia/Bangkok',
      Barnaul: 'Asia/Barnaul',
      Beirut: 'Asia/Beirut',
      Bishkek: 'Asia/Bishkek',
      Chita: 'Asia/Chita',
      Damascus: 'Asia/Damascus',
      Dhaka: 'Asia/Dhaka',
      Dili: 'Asia/Dili',
      Dubai: 'Asia/Dubai',
      Dushanbe: 'Asia/Dushanbe',
      Famagusta: 'Asia/Famagusta',
      Hong_Kong: 'Asia/Hong_Kong',
      Jakarta: 'Asia/Jakarta',
      Jerusalem: 'Asia/Jerusalem',
      Kabul: 'Asia/Kabul',
      Karachi: 'Asia/Karachi',
      Kathmandu: 'Asia/Kathmandu',
      Macau: 'Asia/Macau',
      Manila: 'Asia/Manila',
      Pyongyang: 'Asia/Pyongyang',
      Qatar: 'Asia/Qatar',
      Seoul: 'Asia/Seoul',
      Shanghai: 'Asia/Shanghai',
      Singapore: 'Asia/Singapore',
      Tehran: 'Asia/Tehran',
      Tokyo: 'Asia/Tokyo',
      Ulaanbaatar: 'Asia/Ulaanbaatar',
      Azores: 'Atlantic/Azores',
      Bermuda: 'Atlantic/Bermuda',
      Canary: 'Atlantic/Canary',
      CapeVerde: 'Atlantic/Cape_Verde',
      Adelaide: 'Australia/Adelaide',
      Brisbane: 'Australia/Brisbane',
      BrokenHill: 'Australia/Broken_Hill',
      Darwin: 'Australia/Darwin',
      Eucla: 'Australia/Eucla',
      Hobart: 'Australia/Hobart',
      Lindeman: 'Australia/Lindeman',
      LordHowe: 'Australia/Lord_Howe',
      Melbourne: 'Australia/Melbourne',
      Perth: 'Australia/Perth',
      Sydney: 'Australia/Sydney',
      Andorra: 'Europe/Andorra',
      Athens: 'Europe/Athens',
      Belgrade: 'Europe/Belgrade',
      Brussels: 'Europe/Brussels',
      Bucharest: 'Europe/Bucharest',
      Budapest: 'Europe/Budapest',
      Chisinau: 'Europe/Chisinau',
      Dublin: 'Europe/Dublin',
      Gibraltar: 'Europe/Gibraltar',
      Helsinki: 'Europe/Helsinki',
      Istanbul: 'Europe/Istanbul',
      Kaliningrad: 'Europe/Kaliningrad',
      Kirov: 'Europe/Kirov',
      Kyiv: 'Europe/Kyiv',
      Lisbon: 'Europe/Lisbon',
      London: 'Europe/London',
      Madrid: 'Europe/Madrid',
      Malta: 'Europe/Malta',
      Minsk: 'Europe/Minsk',
      Moscow: 'Europe/Moscow',
      Paris: 'Europe/Paris',
      Prague: 'Europe/Prague',
      Riga: 'Europe/Riga',
      Rome: 'Europe/Rome',
      Samara: 'Europe/Samara',
      Saratov: 'Europe/Saratov',
      Simferopol: 'Europe/Simferopol',
      Sofia: 'Europe/Sofia',
      Tallinn: 'Europe/Tallinn',
      Tirane: 'Europe/Tirane',
      Ulyanovsk: 'Europe/Ulyanovsk',
      Vienna: 'Europe/Vienna',
      Vilnius: 'Europe/Vilnius',
      Warsaw: 'Europe/Warsaw',
      Zurich: 'Europe/Zurich',
      Auckland: 'Pacific/Auckland',
      Fiji: 'Pacific/Fiji',
      Honolulu: 'Pacific/Honolulu',
      Nauru: 'Pacific/Nauru',
      // Add more mappings here as needed
    };

  const [clockCards, setClockCards] = useState([]);

  const addNewClockCard = (cardData) => {
    setClockCards([...clockCards, cardData]);
  };

  return (
    <div className='container'>
      <h1 className='title'>World clock</h1>
      <Searchbar addNewClockCard={addNewClockCard} cityToTimezoneMap={cityToTimezoneMap}/>
      <Map/>
      <CurrentData/>
      <Cards clockCards={clockCards}/>
      <footer>© Copyright 2023 Nicole Moncrieffe</footer>
    </div>
  );
}

export default App;
