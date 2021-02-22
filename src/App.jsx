import { Suspense, lazy } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"


const Header= lazy(import(/* webpackPrefetch: true */"./components/Header"))
const Home= lazy(import(/* webpackPrefetch: true */'./pages/Home'))
const Books= lazy(import(/* webpackPrefetch: true */'./pages/Books'))
const CreateBook= lazy(import(/* webpackPrefetch: true */'./pages/CreateBook'))
const NotFound= lazy(import(/* webpackPrefetch: true */"./pages/NotFound"))

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Suspense fallback={<Home />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/books" component={Books} />
            <Route path="/create" component={CreateBook} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  )
}

export default App
