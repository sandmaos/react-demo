import emailjs from 'emailjs-com';
emailjs.init('s49GCA5_ifW6j1cHO');

export const authPassCode = () => {
    const verify_code = Math.floor(100000 + Math.random() * 900000);
    const templateParams = {
        to_name: 'Jay Zeng',
        from_name: 'http://localhost:3000/',
        message: '叶湘伦的七里香',
        to_email: 'taskforcemw@gmail.com',
        verify_code: verify_code
    };

    return new Promise((resolve, reject) => {
        emailjs.send('service_asyaqtv', 'template_oi5zd4h', templateParams)
            .then(() => {
                resolve({ msg: 'success', code: verify_code });
            })
            .catch(() => {
                reject({ msg: 'failed', code: '' });
            });
    })
}

export const authUpdatePwd = (...params) => {
    const [token]=params;
    const templateParams = {
        to_name: 'Jay Zeng',
        from_name: 'http://localhost:3000/',
        message: '叶湘伦的七里香',
        to_email: 'taskforcemw@gmail.com',
        verify_code: `http://localhost:3000/update_pwd/${token}`
    };

    return new Promise((resolve, reject) => {
        emailjs.send('service_asyaqtv', 'template_oi5zd4h', templateParams)
            .then(() => {
                resolve({ msg: 'success'});
            })
            .catch(() => {
                reject({ msg: 'failed' });
            });
    })
}