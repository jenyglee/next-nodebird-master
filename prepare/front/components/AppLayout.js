import { useState } from "react"
import Link from "next/link"
import PropTypes from "prop-types"
import { Menu, Input, Row, Col } from "antd"
import UserProfile from "./../components/UserProfile"
import LoginForm from "./../components/LoginForm"
import { useSelector } from "react-redux"
import styled from "styled-components"

const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`

const AppLayout = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="/">
                    <Link href="/">
                        <a>노드버드</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/profile">
                    <Link href="/profile">
                        <a>프로필</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="search">
                    <SearchInput enterButton />
                </Menu.Item>
                <Menu.Item key="/signup">
                    <Link href="/signup">
                        <a>회원가입</a>
                    </Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                {/* xs : 모바일(screen < 576px), sm : 태블릿(screen ≥ 576px), md : 작은 데스크탑(screen ≥ 768px) */}
                {/* lg : 데스크탑(screen ≥ 992px), xl : 큰 데스크탑(screen ≥ 1200px), xxl : 매우 큰 데스크탑(screen ≥ 1600px) */}
                <Col xs={24} md={6}>
                    {isLoggedIn ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://www.zerocho.com" target="_blank" rel="noreferrer noopener">
                        Made by ZeroCho
                    </a>
                </Col>
            </Row>
        </div>
    )
}

AppLayout.proptypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout
