import React from 'react';
import RootLayout from '../components/layout';

const DMCARequestPage = () => {
    return (
        <RootLayout>
            <div className="helper-pages dmca-request-page">
                <h1>DMCA Takedown Request</h1>
                <br></br>
                <p>
                    If you believe that your copyrighted work is being infringed on our website, please send a DMCA
                    Takedown Request to our designated agent. We take copyright infringement very seriously and will respond promptly to
                    valid requests.
                </p>
                <h3>How to File a DMCA Takedown Request</h3>
                <p>
                    To file a DMCA Takedown Request, please provide the following information:
                </p>
                <ul>
                    <li>A description of the copyrighted work that you claim has been infringed.</li>
                    <li>A description of the material that you claim is infringing and where it is located on our site.</li>
                    <li>Your address, telephone number, and email address.</li>
                    <li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
                    <li>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>
                    <li>Your electronic or physical signature.</li>
                </ul>
                <p>
                    Please send your DMCA Takedown Request to the following address:
                </p>
                <address>
                    DMCA Agent<br />
                    <br />
                    WePlayDOS.games<br />
                    Email: <a href="mailto:contact@weplaydos.games">contact@weplaydos.games</a>
                </address>
                <p>
                    We will review your request and take appropriate action as required by the DMCA.
                </p>
            </div>
        </RootLayout>
    );
};

export default DMCARequestPage;
