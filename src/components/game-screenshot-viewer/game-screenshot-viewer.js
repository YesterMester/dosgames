import React from 'react';
import { Modal, Button, AspectRatio } from '@carbon/react';
import { ArrowLeft, ArrowRight } from '@carbon/icons-react';
import { GatsbyImage } from 'gatsby-plugin-image';

const GameScreenshotModal = ({ game, isModalOpen, setIsModalOpen, currentImageIndex, setCurrentImageIndex,screenshotsData }) => {
    const closeModal = () => setIsModalOpen(false);

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : game.screenshots.length - 1
        );
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex < game.screenshots.length - 1 ? prevIndex + 1 : 0
        );
    };

    return (
        <Modal
            className="game-screenshot-modal"
            size="sm"
            passiveModal
            open={isModalOpen}
            onRequestClose={closeModal}
            modalHeading={game.title}
            modalLabel="Screenshots"
        >
            <AspectRatio ratio="16x9" as="div">
                 <GatsbyImage image={screenshotsData[currentImageIndex]} alt={`${game.title}-screenshot}`} />
            </AspectRatio>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <Button kind="ghost" renderIcon={ArrowLeft} iconDescription="Previous" hasIconOnly onClick={prevImage} />
                <Button kind="ghost" renderIcon={ArrowRight} iconDescription="Next" hasIconOnly onClick={nextImage} />
            </div>
        </Modal>
    );
};

export default GameScreenshotModal;