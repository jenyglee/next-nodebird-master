import { Button, Form, Input } from "antd"
import Link from "next/link"
import { useCallback, useState, useMemo } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import useInput from "./hooks/useInput"

const ButtonWrapper = styled.div`
    margin-top: 10px;
`

const FormWrapper = styled(Form)`
    padding: 10px;
`

const LoginForm = ({ setIsLoggedIn }) => {
    const [id, onChangeId] = useInput("")
    const [password, onChangePassword] = useInput("")
    const style = useMemo(() => {
        marginTop: 10
    }, [])

    const onSubmitForm = useCallback(() => {
        setIsLoggedIn(true)
    }, [id, password])

    return (
        <FormWrapper
        // onFinish={onSubmitForm}
        >
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input name="user-id" value={id} onChange={onChangeId} required />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input
                    name="user-password"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    required
                />
            </div>
            {/* 리렌더링 할 때마다 style의 객체가 계속 리렌더링 되므로 style={{}}는 쓰지말자 */}
            <ButtonWrapper style={style}>
                <Button type="primary" htmlType="submit" loading={false}>
                    로그인
                </Button>
                <Link href="/signup">
                    <a>
                        <Button>회원가입</Button>
                    </a>
                </Link>
            </ButtonWrapper>
        </FormWrapper>
    )
}

LoginForm.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
}

export default LoginForm
