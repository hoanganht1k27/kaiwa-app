//Layout
import DefaultLayout from '~/components/Layout/DefaultLayout';

// Pages
import Home from '~/pages/Home';

// Provider

// Public Page
const publicRoutes = [{ path: '/', component: Home, layout: DefaultLayout }];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
