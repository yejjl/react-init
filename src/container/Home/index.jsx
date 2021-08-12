import React from 'react';
import { Icon } from 'zarm';
import s from './style.module.less';

const Home = () => {
	return (
		<div className={s.Home}>
			<div className={s.header}>
				<div className={s.dataWrap}>
					<span className={s.expense}>
						总支出：<b>￥ 200</b>
					</span>
					<span className={s.income}>
						总收入：<b>￥ 200</b>
					</span>
				</div>
				<div className={s.typeWrap}>
					<div className={s.left}>
						<span className={s.title}>
							类型
							<Icon className={s.arrow} type="arrow-bottom" />
						</span>
					</div>
					<div className={s.right}>
						<span className={s.time}>
							2022-6
							<Icon className={s.arrow} type="arrow-bottom" />
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
