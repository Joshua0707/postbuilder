import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomeWrapper } from '../style';
import { BlogDetailsContainer , BlogViewContainer} from './blog';
import IdeaBox from './Ideabox';
import PrefView from './PrefView';

const Home = ({ posts, match }) => {
    const { path } = match;
    return (
        <HomeWrapper>
            <Switch>
                <Route exact path={path} render={({ match }) => (
                    <React.Fragment>
                        <PrefView />
                        <IdeaBox />
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



export default Home;