
const displayPicUpload = (file) => {
	if (!file) return null;
	const fileType = file.type;
	const imgReader = new FileReader();
	imgReader.readAsBinaryString(file);
	imgReader.onload = (e) => {
		return `data:${fileType}:base64,${btoa(e.target.result)}`;
	};
};


export default displayPicUpload;