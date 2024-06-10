const nodemailer = require('nodemailer');
require('dotenv').config()
const fs = require('fs');


const mailSender = async () => {
    const mails = [
        'khushirai.emaster@gmail.com',
        'kv.opash@gmail.com',
        'hr@tecxar.io',
        'krina.bundela@artoonsolutions.com',
        'hr@avologypro.com',
        'jayeshm@systemintegration.in',
        'hr@nstacksoftech.com',
        'seerat@formics.io',
        'hr@formics.io',
        'hr@silverwebbuzz.com'

    ];

    const emailCredentials = {
        user: 'shivam22@navgurukul.org',
        pass: process.env.password
    };

    let mailCount = 0;

    for (const mail of mails) {
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: emailCredentials.user,
                    pass: emailCredentials.pass
                }
            });

            const body = `<p>Hello sir/ma'am,</p>
                <p>
                I started my coding journey at Navgurukul, where they provide free coding lessons to middle-class students. I then completed my MERN stack training at HyperVerge Academy Bootcamp, which supports students who are passionate about learning coding.
                
                I am a motivated and skilled MERN stack developer with expertise in Node.js, JavaScript, Express.js, MongoDB, Python, and HTML/CSS. I have a strong passion for web development and a proven ability to deliver high-quality projects. Dedicated and detail-oriented, I thrive in collaborative team environments. I am currently seeking new opportunities to further enhance my skills and contribute to a dynamic organization.
                <p>I am attaching my resume below.</p>
                <p><b>Regards,</b><br>Shivam Kumar<br>+91-9304352368<br>Personal mail :- shivam22@navgurukul.org</p>`;

            const info = await transporter.sendMail({
                from: '"Shivam Kumar" <shivam22@navgurukul.org>',
                to: mail,
                subject: 'Application for the job of MERN Stack developer position.',
                text: 'This is mail by me',
                html: body,
                attachments: [
                    {
                        filename: 'Shivam_Resume01.pdf',
                        content: fs.createReadStream('./Shivam_Resume01.pdf')
                    }
                ]
            });

            console.log(info);
            mailCount++;
        } catch (error) {
            console.log(error);
        }
    }

    console.log(mailCount, ' mail has been sent');
};

mailSender();
