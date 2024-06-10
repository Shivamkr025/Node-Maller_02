const nodemailer = require('nodemailer');
require('dotenv').config()
const fs = require('fs');


const mailSender = async () => {
    const mails = [
        'shivanigautam@ducktaleit.com',
        'hr.nectarbits@gmail.com',
        'soniya@competentgroove.com',
        'aanchal.tomar@xicom.biz',
        'akanksha@opportunityhubb.com',
        'rallanmamta@seasiainfotech.com',
        'shwetas@impingeonline.com',
        'mandeep@webspero.com',
        'kamakshi.zigsaw@gmail.com',
        'sudhanshu@cyberpuzzlenet.com',
        'sakshidhanjal@devherds.com',
        'preeti@rocked.us',
        'itw.nishitad@gmail.com',
        'kalpana@antiersolutions.com',
        'aarushi.pundir@vinnisoft.org',
        'hr.mohali@myvirtualteams.com',
        'bmcloudc@gmail.com',
        'khatripoonam69@gmail.com',
        'bhavna.phulwani@nexuslink.in',
        'ishita.codebrew@gmail.com',
        'nandini.agrawal@octalsoftware.com',
        'savita@spineor.com',
        'ashmita.chhaparwal@angara.com',
        'shivani@moontechnolabs.com',
        'gurleen.kaur@weoinfotech.com',
        'careers@shineinfosoft.in',
        'shivani.singh@plaxonic.com',
        'jasminerathee@zapbuild.com',
        'shefhali@cwebconsultants.com',
        'radhika.malhotra@ditstek.com',
        'seerat@formics.io',
        'careers@radicalloop.com',
        'devi.modi@aipxperts.com',
        'muskan.handa@recro.io',
        'mehak.bansal@firminiq.com',
        'manind@resourcesvalley.in',
        'saryuthakur.ameotech@gmail.com',
        'himanigupta@luminoguru.com',
        'kajal.k@richestsoft.in',
        'kalyani@unoiatech.com',
        'sakshi@cronj.com',
        'hrekrocx@gmail.com',
        'krina.bundela@artoonsolutions.com',
        'rimal.ghuman@ensuesoft.com',
        'hr@tecxar.io',
        'kesha.pandya@artoonsolutions.com'
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

            const body = `<b>Hii,</b>

                <p>
                    I hope this email finds you well. I am writing to express my interest in the MERN Stack Developer position at your company. With a strong background in backend development, I am excited about the opportunity to contribute to your innovative team.
                </p>
                
                <b>key skills :</b>
                <p>
                    * Proficient in Node.js and server-side JavaScript.<br>
                    * Expertise in API development and database management.<br>
                    * Strong problem-solving abilities and a commitment to code quality.<br>

                    I am confident that my technical skills and passion for clean, efficient code align with the needs of your company. I am eager to bring my expertise to your team and contribute to the success of your projects.<br>

                    Thank you for considering my application. I have attached my resume for your review, and I look forward to the opportunity to discuss how my skills can benefit your company.
                </p>
               
                <p><b>Regards,</b>
                <br>Shivam Kumar
                <br>+91-9304352368
                <br>Linkedin :- 'https://www.linkedin.com/in/shivam-kumar-b2827b242/'</p>`;

            const info = await transporter.sendMail({
                from: '"Shivam Kumar" <shivam22@navgurukul.org>',
                to: mail,
                subject: 'Application for the MERN Stack Developer Position',
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
