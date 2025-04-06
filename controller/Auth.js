import jwt from 'jsonwebtoken';

export const getAccessToken = async (code) => {
    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
    })

    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
    })

    if (!response.ok) {
        throw new Error('Failed to fetch access token');
    }

    const data = await response.json();
    return data;
}


const getUserInfo = async (accessToken) => {
    const response = await fetch('https://api.linkedin.com/v2/userinfo', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    })

    if (!response.ok) {
        throw new Error('Failed to fetch user info');
    }

    const data = await response.json();
    return data;
}



export const linkedInCallback = async (req, res) => {

    try {
        const { code } = req.query;
        const accessToken = await getAccessToken(code);
        // console.log(accessToken);
        const userInfo = await getUserInfo(accessToken.access_token);
        console.log(userInfo);
        const token = jwt.sign({ userId: userInfo.sub }, "ayushdubeykyahorahahai", { expiresIn: '1h' });

        res.cookie('token', token, {
            domain: '.axturo.com',
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1 * 24 * 60 * 60 * 1000
        });


      
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


