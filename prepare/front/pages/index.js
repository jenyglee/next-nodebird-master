import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
        (state) => state.post,
    );

    useEffect(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST,
        });
    }, []);

    useEffect(() => {
        function onScroll() {
            if (
                window.scrollY + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 300
            ) {
                if (hasMorePosts && !loadPostsLoading) {
                    console.log('로딩상태 ; ', loadPostsLoading);
                    console.log('불러오기');
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMorePosts, loadPostsLoading]);

    return (
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </AppLayout>
    );
};

export default Home;
