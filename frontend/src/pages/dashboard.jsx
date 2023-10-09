import { useState } from 'react'
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";

import '../App.css'

//Function
import { updaloadFile } from '../context/auth'

// Components
import { Input } from "../components/Input";
import { Button } from '../components/Button'

export function Dashboard() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [csvFile, setCsvFile] = useState(false);

	const history = useHistory();

	// Hooks
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const onSubmit = async () => {
		if (csvFile.type !== 'text/csv') {
			setError("Invalid type of file")
		}

		await updaloadFile(csvFile, setError, setSuccess)
	};

	return (
		<div className='container'>
			<div>
				Made by Victor
			</div>
			<h1>CSV MANIPULATION</h1>
			<div className="card">
				<div>
					<form className="login__form" onSubmit={handleSubmit(onSubmit)}>
						<Input.File
							placeholder="Add csv file"
							name="csv_file"
							required
							errorMessage={errors.password?.message}
							register={register}
							onChange={(e) => {
								setCsvFile(e.currentTarget.files[0]);
							}}
						/>
						<div className='flex-align'>
							<Button type="submit" isLoading={loading} >
								UPLOAD
							</Button>
							{error !== null ? (
								<span style={{ color: '#df9292' }}>{error}</span>
							) : null}
							{success !== null ? (
								<span style={{ color: '#9affa5', marginTop: '20px' }}>{success}</span>
							) : null}
						</div>
					</form>

				</div>
			</div>
			<a onClick={() => history.push('/list')} style={{ cursor: 'pointer' }}>
				GO TO LIST
			</a>
			<p className="read-the-docs">
				Click <a href="">here</a> to see github repository
			</p>
		</div>
	)
}