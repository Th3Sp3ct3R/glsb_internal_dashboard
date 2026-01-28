import { Route, Switch } from 'wouter'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Devices from './pages/Devices'
import DeviceDetail from './pages/DeviceDetail'
import Accounts from './pages/Accounts'
import AccountDetail from './pages/AccountDetail'

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/devices" component={Devices} />
        <Route path="/devices/:id" component={DeviceDetail} />
        <Route path="/accounts" component={Accounts} />
        <Route path="/accounts/:id" component={AccountDetail} />
        <Route>404 - Page Not Found</Route>
      </Switch>
    </Layout>
  )
}

export default App
