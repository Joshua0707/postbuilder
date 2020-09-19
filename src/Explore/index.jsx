import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomeWrapper } from '../style';
import { BlogDetailsContainer , BlogViewContainer} from '../Home/blog';
import PrefView from './PrefView';

const Explore = ({ posts, match }) => {
    const { path } = match;
    return (
        <HomeWrapper>
            <Switch>
                <Route exact path={path} render={({ match }) => (
                    <React.Fragment>
                        <PrefView />
                        <BlogViewContainer posts={posts} match={match} />
                    </React.Fragment>
                )} />
                <Route path={`${path}/:id`} render={({ match }) => {
                    const index = posts.findIndex(item => item.id === match.params.id);
                    return <BlogDetailsContainer post={posts[index]} />
                }} />
            </Switch>
        </HomeWrapper>
    );
}



export default Explore;