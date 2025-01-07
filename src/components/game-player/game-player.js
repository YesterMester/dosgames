import { Information, Maximize, Save } from "@carbon/icons-react";
import { Button, InlineNotification, Toggletip, ToggletipButton, ToggletipContent } from "@carbon/react";
import React, { useEffect, useRef, useState } from "react";
import { openDB } from 'idb';

const MOUSE_SENSITIVITY = 0.3;
function ensureScriptLoaded(src, callback) {
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (!existingScript) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            if (callback) callback();
        };
        document.body.appendChild(script);
    } else if (existingScript && callback) {
        callback();
    }
}

export const isGamePresentInDB = async (bundleUrl) => {
    const db = await openDB('js-dos-cache (guest)', 1);
    if(!db.objectStoreNames.contains('files')) {
        return false;
    }
    const store = db.transaction('files').objectStore('files');
    const allSaves = await store.getAllKeys();
    // console.log("bundleUrl",bundleUrl)
    const savedGame = allSaves.find((save) => {
        return save.includes(bundleUrl.replace('/roms/', '')) && save.includes('guest');
    });
    // console.log("savedGame",savedGame);
    if (savedGame) {
        return true;
    }
    return false;
}

function GamePlayer({ bundleUrl }) {
    const rootRef = useRef(null);
    const [dos, setDos] = useState(null);
    const [isDosLoaded, setIsDosLoaded] = useState(false);
    const [isGameSaved, setIsGameSaved] = useState(false);


    const saveGame = async () => {

        if (dos) {
            console.log('Saving game...');
            await dos.save();
        }
    }

    useEffect(() => {
        ensureScriptLoaded('/js-dos/dist/js-dos.js', () => {
            setIsDosLoaded(true);
        });

    }, []);

    useEffect(() => {
        let instance;
        if (bundleUrl && isDosLoaded) {
            if (!rootRef.current) {
                return;
            }

            const root = rootRef.current;
            // Ensure Dos is used as a function here
            instance = window.Dos(root, {
                url: bundleUrl,
                kiosk: true,
                theme: 'night',
                backendLocked: true,
                autoStart: true,
            });
            instance.setMouseSensitivity(MOUSE_SENSITIVITY);
            setDos(instance);
        }

        isGamePresentInDB(bundleUrl).then((isSaved) => {
            setIsGameSaved(isSaved);
        });

        return () => {
            if (instance) {
                instance.stop();
            }
        };
    }, [bundleUrl, isDosLoaded]); // Added bundleUrl as a dependency if needed

    return (
        <>
            {isGameSaved &&
                <center>
                    <InlineNotification className="game-saved-notification" kind="info" title="Saved game loaded" subtitle="Your previously saved progress will load when the game starts. Keep Playing!"></InlineNotification>
                </center>
            }
            <Button
                as={"span"}
                kind="ghost"
                // disabled
                // renderIcon={GameWireless}
                className="game-controls"
                style={{ fontSize: '1.2rem' }}
            >
                Game controls &nbsp;
                <Toggletip defaultOpen>
                    <ToggletipButton label="How save works?">
                        <Information />
                    </ToggletipButton>
                    <ToggletipContent>
                        <p>Save game works only if there is an in-game save mechanism.</p>
                        <p>Save the game while you are playing (in-game save) and then click Save button <Save />.</p>
                        <p>Next time, before the game loads, saved game is automatically loaded.</p>
                    </ToggletipContent>
                </Toggletip>
            </Button>
            <Button kind="tertiary"
                renderIcon={Maximize}
                iconDescription="Go Full Screen"
                hasIconOnly
                className="game-controls"
                onClick={() => { dos && dos.setFullScreen(true) }}
            >
                Go Full Screen

            </Button>
            <Button kind="tertiary"
                renderIcon={Save}
                iconDescription="Save Game"
                hasIconOnly
                className="game-controls"
                onClick={() => { saveGame() }}
            >
                Save Game
            </Button>


            <div className="js-game-player" ref={rootRef}></div>

        </>
    );
}

export default GamePlayer;