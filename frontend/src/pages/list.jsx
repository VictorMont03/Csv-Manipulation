import { useState, useEffect } from 'react'
import '../App.css'
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import api from '../services/api';

import Avatar from "react-avatar";
import SearchIcon from '../assets/search-icon.svg'
import ArrowLeftIcon from '../assets/arrow-left-icon.svg'

// Components
import { Input } from "../components/Input";

export function List() {
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState([]);

	// Hooks
	const {
		register,
		formState: { errors },
	} = useForm();

	const history = useHistory();

	useEffect(() => {
		setLoading(true);

		async function fetchData() {
			await api.get('users').then(res => {
				setUsers(res.data);

				setLoading(false)
			})
		}

		fetchData();
	}, [])

	const onSubmit = async (e) => {
		let search = e.target.value

		await api.get(`users?q=${search}`).then(res => {
			setUsers(res.data);

			setLoading(false)
		})
	};

	return (
		<div className='container'>
			<div className="go-back" onClick={() => history.goBack()}>
				<img src={ArrowLeftIcon} alt="Close icon" />
			</div>
			<form className="login__form  search_form">
				<Input
					placeholder="Search"
					name="search"
					type="text"
					leftElement={<img src={SearchIcon} alt="Search icon" />}
					required
					onChange={(e) => {
						onSubmit(e)
					}}
					register={register}
				/>
			</form>
			<div className="card" id='custom-scroll'>
				{users.length > 0 ? users.map((user, i) => (
					<div className='card-children' style={{ marginBottom: '40px' }}>
						<div className="profile__wrapper">
							<div style={{ display: 'flex' }}>
								<Avatar name={user?.name} size="55" color="#c4c2c2" round />
								<div style={{ marginLeft: '15px', display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
									<p className="profile__title">{user.name}</p>
									<p className="profile__subtitle">User on csv manipulation</p>
								</div>
							</div>
						</div>
						<div className='users-infos'>

							<div className='info'>
								<h2>Name</h2>
								<p>{user.name}</p>
							</div>
							<div className='info'>
								<h2>City</h2>
								<p>{user.city}</p>
							</div>
							<div className='info'>
								<h2>Country</h2>
								<p>{user.country}</p>
							</div>
							<div className='info'>
								<h2>Favorite sport</h2>
								<p>{user.favorite_sport}</p>
							</div>
						</div>
						{i === users.length - 1 ? null : (<hr style={{ marginTop: '40px', opacity: '0.2' }} />)}
					</div>
				)) : (
					<h1>No user found</h1>
				)}
			</div>
			<p className="read-the-docs">
				Click <a href="">here</a> to see github repository
			</p>
		</div>
	)
}