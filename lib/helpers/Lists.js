import cities from './cities.js';
import states from './states.js';

var lists = {};

lists.titles = [
  {
    id: 'admin',
    label: 'Admin',
  },
  {
    id: 'lead_ambassador',
    label: 'Lead Ambassador',
  },
  {
    id: 'ambassador',
    label: 'Lead Ambassador',
  },
  {
    id: 'none',
    label: '',
  },
];

lists.skill_subjects = [
  {
    id: 'trad',
    label: 'Trad',
  },
  {
    id: 'sport',
    label: 'Sport',
  },
  {
    id: 'lead',
    label: 'Lead Climbing',
  },
  {
    id: 'toprope',
    label: 'Top Roping',
  },
  {
    id: 'gym',
    label: 'Gym Climbing',
  },
  {
    id: 'bouldering',
    label: 'Bouldering',
  },
  {
    id: 'mountaineering',
    label: 'Mountaineering',
  },
  {
    id: 'mountaineering',
    label: 'Mountaineering',
  },
  {
    id: 'ice',
    label: 'Ice Climbing',
  },
  {
    id: 'multipitch',
    label: 'Multi-Pitch',
  },
  {
    id: 'alpine',
    label: 'Alpine',
  },
  {
    id: 'aid',
    label: 'Aid Climbing',
  },
  {
    id: 'bigwall',
    label: 'Big Wall',
  },
];

lists.regions = [
  {
    id: 'rockies',
    label: 'Rocky Mountains',
  },
  {
    id: 'canada',
    label: 'Canada',
  },
  {
    id: 'ny',
    label: 'Greater NY Area',
  },
  {
    id: 'inw',
    label: 'Inland Northwest',
  },
  {
    id: 'midalantic',
    label: 'Mid-Alantic',
  },
  {
    id: 'midwest',
    label: 'midwest',
  },
  {
    id: 'newengland',
    label: 'New England',
  },
  {
    id: 'outsideUS',
    label: 'Outside of the US',
  },
  {
    id: 'southeast',
    label: 'Southeast',
  },
  {
    id: 'southwest',
    label: 'Southwest',
  },
  {
    id: 'pnw',
    label: 'Pacific Northwest',
  },
];

lists.gear = [
  {
    id: 'single-rack',
    label: 'Single Rack',
  },
  {
    id: 'double-rack',
    label: 'Double Rack',
  },
  {
    id: 'crashpad',
    label: 'Crashpad',
  },
  {
    id: 'sport-rack',
    label: 'Sport Rack',
  },
  {
    id: 'harness-shoes',
    label: 'Harness & Shoes',
  },
];

lists.states = states;

lists.cities = cities;

export default lists;
