import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import {Route, Switch} from 'react-router-dom'
import Calculator from './conteiners/Calculator/Calculator'
import Converter from "./conteiners/Converter/Converter";
import Area from './components/Мeasurement/Area/Area'



class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/area" component={Area}/>
                    <Route path="/converter" component={Converter}/>
                    {/*<Route path="/temperature" component={Calculator}/>*/}
                    {/*<Route path="/volume" component={Calculator}/>*/}
                    {/*<Route path="/data" component={Calculator}/>*/}
                    <Route path="/" exact component={Calculator}/>
                </Switch>
            </Layout>
        )
    }
}

export default App;
