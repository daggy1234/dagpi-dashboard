import AWS from 'aws-sdk';
// load configurations file

AWS.config.update({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: 'us-east-2'
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

const sendEmailText = (to: string, subject: string, message: string) => {
    const params = {
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: message
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        },
        ReturnPath: 'Dagpi.xyz <noreply@dagpi.xyz>',
        Source: 'Dagpi.xyz <noreply@dagpi.xyz>'
    };

    ses.sendEmail(params, (err, data) => {
        if (err) {
            return console.log(err, err.stack);
        } else {
            console.log('Email sent.', data);
        }
    });
};

export default sendEmailText;
