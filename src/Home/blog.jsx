import React from 'react';
import './blog.css';
import { Link, Redirect } from 'react-router-dom';
import { PostView  } from '../PostView/postview';
import img from '../Assets/unlock.png';
import { GoHeart, GoComment } from 'react-icons/go';

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

export const BlogView = ({ post, match }) => (
    <main className="bg-vw grid">
        <div className="bg-img-bx">
             <img src={img} alt="blog image" />
         </div>
        <div className="bg-cn-bx">
            <div className="bg-cn">
                <Link to={`${match.path}/${post.id}`}><header> { post.post[0].content } </header></Link>
                <span>Published on { new Date(post.dateCreated).toGMTString().substring(0, 16) }</span>
            </div>
            <div className='bg-pref-bx'>
                <span> <GoHeart /> 20k </span>
                <span> <GoHeart /> 20k </span>
                <span> <GoComment /> 20k </span>
            </div>
        </div>
    </main>
)


export const BlogViewContainer = ({ posts, match }) =>{
 return (
        <div className="bg-vw--bx">
            {
                posts.map((post, index) => <BlogView key={index} post={post} match={match} />)
            }
        </div>
    )
};
