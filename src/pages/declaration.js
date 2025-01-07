import React from 'react';
import RootLayout from '../components/layout';
const DeclarationPage = () => {
    return (
        <RootLayout>
            <div className="helper-pages declaration-page">
                <h1>Declaration</h1>
                <br></br>
                <h3>Ownership of Emulation Software and Videogames</h3>
                <p>
                    WePlayDOS.games does not hold the copyright for emulation software or videogames available on this site.
                </p>
                <h3>Compliance with Laws</h3>
                <p>
                    To adhere to the valid laws of India, all content on this website abides by the following rules:
                </p>
                <ul>
                    <li>We exclusively emulate videogame consoles that were introduced to the market at least 20 years ago, devoid of valid patent protection.</li>
                    <li>Emulation is carried out using only free software, such as GNU GPL (General Public License) or unmodified freeware.</li>
                </ul>
                <h3>Content Removal and Copyright Requests</h3>
                <p>
                    We reserve the right to remove any download at any time upon the request of the copyright holder.
                </p>
                <p>
                    All games found on WePlayDOS.games are owned by us in the form they were originally distributed by the original publisher.
                </p>
                <h3>Copyright Holder Requests</h3>
                <p>
                    If you are the copyright holder of any game on this site and wish to have it removed, please contact us at the email address
                    <a href="mailto:contact@weplaydos.games">contact@weplaydos.games</a>, and we will promptly remove the specified game.
                </p>
            </div>
        </RootLayout>
    );
};

export default DeclarationPage;
