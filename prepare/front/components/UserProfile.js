import React from "react"
import { Card, Avatar, Button } from "antd"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logoutRequestAction } from "../reducers/user"

const UserProfile = () => {
    const dispatch = useDispatch()
    const { me } = useSelector((state) => state.user)

    const onLogOut = useCallback(() => {
        dispatch(logoutRequestAction())
    }, [])
    return (
        <Card
            actions={[
                <div key="twit">
                    짹짹 <br />0
                </div>,
                <div key="following">
                    팔로잉 <br />0
                </div>,
                <div key="followers">
                    팔로워 <br />0
                </div>,
            ]}
        >
            <Card.Meta avatar={<Avatar>ZC</Avatar>} title="ZeroCho" />
            <Button onClick={onLogOut}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile
