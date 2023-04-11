import React, { useCallback, useState } from "react"
import { Button, Card, Popover, Avatar, List, Comment } from "antd"
import PropTypes from "prop-types"
import {
    RetweetOutlined,
    HeartOutlined,
    MessageOutlined,
    EllipsisOutlined,
    HeartTwoTone,
} from "@ant-design/icons"
import ButtonGroup from "antd/lib/button/button-group"
import { useSelector } from "react-redux"
import PostImages from "./PostImages"
import CommentForm from "./CommentForm"

const PostCard = ({ post }) => {
    const [liked, setLiked] = useState(false)
    const [commentFormOpened, setCommentFormOpened] = useState(false)

    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev)
    }, [])

    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev)
    }, [])

    const id = useSelector((state) => state.user.me?.id)
    return (
        <div style={{ marginBottom: 20 }}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    liked ? (
                        <HeartTwoTone key="heart" twoToneColor="#eb2f96" onClick={onToggleLike} />
                    ) : (
                        <HeartOutlined key="heart" onClick={onToggleLike} />
                    ),
                    <MessageOutlined key="comment" onClick={onToggleComment} />,
                    <Popover
                        key="more"
                        content={
                            <ButtonGroup>
                                {id && post.User.id === id ? (
                                    <>
                                        <Button>수정</Button>
                                        <Button>삭제</Button>
                                    </>
                                ) : (
                                    <Button>신고</Button>
                                )}
                            </ButtonGroup>
                        }
                    >
                        <EllipsisOutlined />
                    </Popover>,
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={post.content}
                />
            </Card>
            {commentFormOpened && (
                <>
                    <CommentForm post={post} />
                    <List
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    ></List>
                </>
            )}
        </div>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

export default PostCard
