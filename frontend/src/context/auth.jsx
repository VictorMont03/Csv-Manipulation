import api from '../services/api'

export const updaloadFile = async (csv_file, setError, setSuccess) => {
	try {
		// Crie um objeto FormData
		const formData = new FormData();

		// Anexe o arquivo CSV ao objeto FormData
		formData.append('file', csv_file);

		const response = await api.post("/files", formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		console.log(response);

		if (response.status === 200) {
			setError(null)
			setSuccess('File uploaded, click on go to list to see the infos and do a search')
		}

		return response;
	} catch (err) {
		setError('Error on upload file');
		console.log(err);

		return;
	}
};