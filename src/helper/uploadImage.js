const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_NAME_CLOUDINARY}/image/upload`

const uploadImage = async (image) => {
    const formData = new FormData()

    formData.append("file",image)
    formData.append("upload_preset",'ecommerce_product_image')

    const response = await fetch(url, {
        method: 'POST',
        body: formData
    }) 

    return response.json()
}


export default uploadImage