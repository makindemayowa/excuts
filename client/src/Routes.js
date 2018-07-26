import Home from './components/landingPage/Home';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import Login from './components/landingPage/Login';
import Signup from './components/landingPage/Signup';
import PublicProfile from './components/profile/PublicProfile';
import ProfileById from './components/profile/ProfileById';
import Events from './components/events/Events';
import EventDetails from './components/events/EventDetails';
import CreateEvent from './components/events/CreateEvent';
import SearchEscorts from './components/search/SearchEscorts';
import SearchEvents from './components/search/SearchEvents';
import NotFound from './components/NotFound';
import Verify from './components/Verify';
import VerifyMail from './components/VerifyMail';
import Contact from './components/common/Contact';
import Safety from './components/common/Safety';
import DateRequests from './components/dateRequests/DateRequests';
import Interests from './components/events/Interests';
import Search from './components/search/Search';

export default [
  {
    name: 'home',
    path: '/',
    secured: false,
    component: Home,
    exact: true
  },
  {
    name: 'login',
    path: '/login',
    secured: false,
    component: Login,
    exact: true
  },
  {
    name: 'signup',
    path: '/signup',
    secured: false,
    component: Signup,
    exact: true
  },
  {
    name: 'contact',
    path: '/contact',
    secured: false,
    component: Contact,
    exact: true
  },
  {
    name: 'search',
    path: '/search',
    secured: true,
    component: Search,
    exact: true
  },
  {
    name: 'safety',
    path: '/safety',
    secured: false,
    component: Safety,
    exact: true
  },
  {
    name: 'dashboard',
    path: '/people',
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
    name: 'profileById',
    path: '/publicProfile/:id',
    secured: true,
    component: ProfileById,
    exact: true
  },
  {
    name: 'events',
    path: '/dashboard',
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
    name: 'event-detail',
    path: '/event/:id',
    secured: true,
    component: EventDetails,
    exact: true
  },
  {
    name: 'event-interests',
    path: '/interests/:id',
    secured: true,
    component: Interests,
    exact: true
  },
  {
    name: 'searchEvent',
    path: '/search-event',
    secured: true,
    component: SearchEvents,
    exact: true
  },
  {
    name: 'searchEscort',
    path: '/search-escort',
    secured: true,
    component: SearchEscorts,
    exact: true
  },
  {
    name: 'daterequests',
    path: '/date-requests',
    secured: true,
    component: DateRequests,
    exact: true
  },
  {
    name: 'verify',
    path: '/verify',
    secured: true,
    component: Verify,
    exact: true
  },
  {
    name: 'verifymail',
    path: '/email/verify/:token',
    secured: false,
    component: VerifyMail,
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