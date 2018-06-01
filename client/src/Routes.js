import Home from './components/landingPage/Home';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import PublicProfile from './components/profile/PublicProfile';
import Events from './components/events/Events';
import CreateEvent from './components/events/CreateEvent';
import SearchEscorts from './components/search/SearchEscorts';
import SearchEvents from './components/search/SearchEvents';
import NotFound from './components/NotFound';

export default [
  {
    name: 'login',
    path: '/',
    secured: false,
    component: Home,
    exact: true
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    secured: true,
    component: Dashboard,
    exact: true
  },
  {
    name: 'profile',
    path: '/profile',
    secured: true,
    component: Profile,
    exact: true
  },
  {
    name: 'publicProfile',
    path: '/publicProfile',
    secured: true,
    component: PublicProfile,
    exact: true
  },
  {
    name: 'events',
    path: '/events',
    secured: true,
    component: Events,
    exact: true
  },
  {
    name: 'new-event',
    path: '/new-event',
    secured: true,
    component: CreateEvent,
    exact: true
  },
  {
    name: 'search',
    path: '/search-event',
    secured: true,
    component: SearchEvents,
    exact: true
  },
  {
    name: 'search',
    path: '/search-escort',
    secured: true,
    component: SearchEscorts,
    exact: true
  },
  {
    name: 'raffle',
    path: '*',
    secured: true,
    component: NotFound,
    exact: true
  }
]