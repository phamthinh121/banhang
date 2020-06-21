const postProductBtn = document.getElementById('post-product');
postProductBtn.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const saleOff = document.getElementById('saleOff').value;
    const category = document.getElementById('category').value;
    const anhsp = document.getElementById('anhsp').value;
    const owner = document.getElementById('owner').value;
    const formData = new FormData();
    console.log(title);
    formData.append('title', title);
    formData.append('description', description)
    formData.append('price', price)
    formData.append('saleOff', saleOff)
    formData.append('category', category)
    formData.append('anhsp', anhsp.files[0])
    formData.append('owner', owner);
    fetch('/create-product', {
        
    })
})