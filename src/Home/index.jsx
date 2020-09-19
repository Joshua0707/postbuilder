import React from 'react';
import { HomeWrapper } from '../style';
import IdeaBox from './Ideabox';

const Home = ({ posts, match }) => {
    // const { path } = match;
    return (
        <HomeWrapper>
            <IdeaBox />
        </HomeWrapper>
    );
}



export default Home;