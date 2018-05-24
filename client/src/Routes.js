import App from './components/App.jsx';

export default [
  {
    name: 'login',
    path: '/',
    secured: false,
    component: App,
    exact: true
  },
  {
    name: 'raffle',
    path: '/raffle',
    secured: true,
    component: App,
    exact: true
  },
  {
    name: 'raffle',
    path: '*',
    secured: true,
    component: App,
    exact: true
  }
]