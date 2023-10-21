import emailjs from 'emailjs-com';
emailjs.init('s49GCA5_ifW6j1cHO');

export default () => {
    const verify_code = Math.floor(100000 + Math.random() * 900000);
    const templateParams = {
        to_name: 'Jay Zeng',
        from_name: 'http://localhost:3000/',
        message: '叶湘伦的七里香',
        to_email: 'taskforcemw@gmail.com',
        verify_code: verify_code
    };
    // try {
    //     const response = await emailjs.send('service_asyaqtv', 'template_oi5zd4h', templateParams)
    //     console.log('Email sent:', response);
    //     return 'success';
    // } catch (error) {
    //     console.error('Error sending email:', error);
    //     return 'failed';
    // }
    return new Promise((resolve, reject) => {
        emailjs.send('service_asyaqtv', 'template_oi5zd4h', templateParams)
            .then(() => {
                resolve({ msg: 'success', code: verify_code });
            })
            .catch(() => {
                reject({ msg: 'failed', code: verify_code });
            });
    })

}