import React, {Component} from 'react';
import axios from "../../../axios";
import Post from '../../../components/Post/Post';
import {Link, Route} from "react-router-dom";

import './Posts.css';
import FullPost from "../FullPost/FullPost";

class Posts extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Prince',
                    };
                });
                this.setState({
                    posts: updatedPosts
                });
            })
            .catch(error => {
                console.log(error)
            });

    }

    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id
        });
    }
    render() {
        const posts = this.state.posts.map(post => {
            return <Link key={post.id} to={'/posts/'+ post.id}><Post
                title={post.title}
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}/></Link>
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost}/>
            </div>
        )
    }
}

export default Posts;