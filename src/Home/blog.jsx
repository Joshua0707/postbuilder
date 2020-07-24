import React from 'react';
import './blog.css';
import { Link, Redirect } from 'react-router-dom';
import { PostView  } from '../PostView/postview';

const BlogDetails = ({ post }) => (
    <main className="bg-dt">
        <PostView post={post.post} />
    </main>
);

export const BlogDetailsContainer = ({ post }) => (
    <div className="bg-dt--bx">
        {
            post ? <BlogDetails post={post} /> : <Redirect to="/home" />
        }

    </div>
);

const BlogView = ({ post, match }) => (
    <main className="bg-vw">
        <Link to={`${match.path}/${post.id}`}><header> { post.post[0].content } </header></Link>
        <span>Published on { new Date(post.dateCreated).toGMTString().substring(0, 16) }</span>
    </main>
);

export const BlogViewContainer = ({ posts, match }) => (
    <div className="bg-vw--bx">
        {
            posts.map((post, index) => <BlogView key={index} post={post} match={match} />)
        }
    </div>
);
