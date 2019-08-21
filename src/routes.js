import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const SamplePage = lazy(() => import('./SmartComponents/SamplePage/SamplePage'));
const paths = {
    samplepage: '/'
};

const Routes = () => {
    return (
        <Suspense fallback={ <div>Loading</div> }>
            <Switch>
                <Route path={ paths.samplepage } component={ SamplePage } rootClass='samplepage'/>
                <Route path="*" component={ SamplePage }/>
            </Switch>
        </Suspense>
    );
};

export default Routes;
