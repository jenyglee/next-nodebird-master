import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Router from 'next/router';

import { loadMyInfoAPI, signUpAPI } from '../apis/user';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import User from '../interfaces/user';

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { data: me } = useQuery<User>('user', loadMyInfoAPI);
  console.log('me', me);
  useEffect(() => {
    if (me) {
      console.log('redirects to /');
      Router.replace('/');
    }
  }, [me]);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, password);
    setLoading(true);
    signUpAPI({ email, password, nickname })
      .then(() => {
        Router.replace('/');
      })
      .catch((error) => {
        alert(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email, nickname, password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>???????????? | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">?????????</label>
          <br />
          <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
        </div>
        <div>
          <label htmlFor="user-nick">?????????</label>
          <br />
          <Input name="user-nick" value={nickname} required onChange={onChangeNickname} />
        </div>
        <div>
          <label htmlFor="user-password">????????????</label>
          <br />
          <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor="user-password-check">??????????????????</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && <ErrorMessage>??????????????? ???????????? ????????????.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            ????????? ?????? ??? ?????? ?????? ???????????????.
          </Checkbox>
          {termError && <ErrorMessage>????????? ??????????????? ?????????.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            ????????????
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  const response = await loadMyInfoAPI();
  if (response.data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Signup;
