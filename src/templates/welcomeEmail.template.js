const getSignUpEmail = (name) => {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Yamaha Music</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f5f5f5;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #673AB7; /* Purple header color from the image */
            color: white;
            text-align: center;
            padding: 20px 10px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .header h2 {
            margin: 5px 0 0;
            font-size: 18px;
            font-weight: normal;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #333;
            font-size: 20px;
            margin-bottom: 15px;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
            margin: 20px 0;
        }
        .welcome-box {
            margin: 20px auto;
            padding: 15px;
            font-size: 18px;
            font-weight: bold;
            color: #673AB7; /* Purple text for branding */
            background-color: #f3e5f5; /* Light purple background */
            border: 2px solid #673AB7;
            border-radius: 8px;
            text-align: center;
        }
        .button {
            display: inline-block;
            margin: 20px auto;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: #3F51B5; /* Darker purple for buttons */
            border-radius: 5px;
            text-decoration: none;
        }
        .button:hover {
            background-color: #303F9F; /* Slightly darker hover effect */
        }
        .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #777;
        }
        .footer a {
            color: #673AB7; /* Purple links */
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Welcome to Yamaha Music!</h1>
            <h2>Complaint Tracking Solution</h2>
        </div>
        <div class="content">
            <p>Hi ${name},</p>
            <p>We’re thrilled to have you on board! Welcome to Yamaha Music's **Complaint Tracking Solution**, where we ensure your issues are resolved efficiently and smoothly.</p>
            <div class="welcome-box">
                Your journey towards seamless support starts here!
            </div>
            <p>You can log in to your account anytime to track your complaints, manage your queries, and explore our solutions. We’re here to provide you with the best experience possible.</p>
            <a href="[Login URL]" class="button">Log in to Your Account</a>
            <p>If you have any questions or need assistance, our support team is just a click away.</p>
        </div>
        <div style="margin-top: 30px; font-size: 14px; color: #555;">
            <p><strong>Best regards,</strong></p>
            <p><strong>The Yamaha Music Team</strong></p>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Yamaha Music. All Rights Reserved. <br>
            <a href="https://www.yamaha.com/">Visit our website</a>
        </div>
    </div>
</body>
</html>`;
};

export default getSignUpEmail;
