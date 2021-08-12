import React, { useCallback, useState } from 'react';
import { Checkbox, Cell, Input, Button, Toast } from 'zarm';
import CustomIcon from '@/components/CustomIcon';
import s from './style.module.less';
import Captcha from 'react-captcha-code';
import { post } from '@/utils';
import cx from 'classnames';

const Login = () => {
	const [username, setUsername] = useState(''); // 账号
	const [password, setPassword] = useState(''); // 密码
	const [verify, setVerify] = useState(''); // 验证码
	const [captcha, setCaptcha] = useState(''); //验证码变化后存储值
	const [type, setType] = useState('login'); // 登录注册类型
	const handleChange = useCallback((captcha) => {
		console.log('captcha', captcha);
		setCaptcha(captcha);
	});
	const onSubmit = async () => {
		if (!username) {
			Toast.show('请输入账号');
			return;
		}
		if (!password) {
			Toast.show('请输入密码');
			return;
		}

		try {
			// 判断登录注册
			if (type === 'login') {
				const { data } = await post('/api/user/login', {
					username,
					password,
				});
				//将token写入localStorage
				localStorage.setItem('token', data.data.token);
				Toast.show(data.msg);
			} else {
				if (!verify) {
					Toast.show('请输入验证码');
					return;
				}
				if (verify !== captcha) {
					Toast.show('验证码错误');
					return;
				}
				const { data } = await post('/api/user/register', {
					username,
					password,
				});
				Toast.show(data.msg);
				setType('login');
			}
		} catch (error) {
			Toast.show('系统错误');
		}
	};
	return (
		<div className={s.auth}>
			<div className={s.head} />
			<div className={s.tab}>
				<span
					className={cx({ [s.active]: type == 'login' })}
					onClick={() => setType('login')}
				>
					登录
				</span>
				<span
					className={cx({ [s.active]: type == 'register' })}
					onClick={() => setType('register')}
				>
					注册
				</span>
			</div>
			<div className={s.form}>
				<Cell icon={<CustomIcon type="zhanghao" />}>
					<Input
						clearable
						type="text"
						placeholder="请输入账号"
						onChange={(value) => setUsername(value)}
					></Input>
				</Cell>
				<Cell icon={<CustomIcon type="mima" />}>
					<Input
						clearable
						type="password"
						placeholder="请输入密码"
						onChange={(value) => setPassword(value)}
					></Input>
				</Cell>
				{type == 'register' ? (
					<Cell icon={<CustomIcon type="mima" />}>
						<Input
							clearable
							type="text"
							placeholder="请输入验证码"
							onChange={(value) => setVerify(value)}
						></Input>
						<Captcha charNum={4} onChange={handleChange} />
					</Cell>
				) : null}
			</div>
			<div className={s.operation}>
				<div className={s.agree}>
					<Checkbox />
					<label className="text-light">
						阅读并同意<a>《Tally条款》</a>
					</label>
				</div>
				<Button block theme="primary" onClick={onSubmit}>
					{type == 'register' ? '注册' : '登录'}
				</Button>
			</div>
		</div>
	);
};

export default Login;
