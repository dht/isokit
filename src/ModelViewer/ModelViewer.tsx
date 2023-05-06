import React, { useEffect } from 'react';
import { animateCamera } from '../isokit.cameras';
import { BabylonScene } from '../isokit.scene';
import { board } from './ModelViewer.board';
import { Hud } from '../Hud/Hud';
import { HudWrapper, LoaderWrapper, Wrapper } from './ModelViewer.style';
import { IHudConfig, IHudItem, IHudTimeline } from '../Hud/Hud.types';
import { Loader } from '../Loader/Loader';
import { useBoard } from '../hooks/useBoard';
import { useCameraPosition } from '../Hud/hooks/useCameraPosition';

export type ModelViewerProps = {
    config: IHudConfig;
    items: IHudItem[];
    timeline: IHudTimeline;
};

export function ModelViewer(props: ModelViewerProps) {
    const { config, items, timeline } = props;

    const {
        width,
        height,
        color,
        glbPath,
        radius = 7,
        alpha = 0,
        beta = 1.5,
    } = config;

    const cameraPosition = useCameraPosition(timeline, {
        radius,
        alpha,
        beta,
    });

    const isReady = useBoard(board(glbPath));

    useEffect(() => {
        if (!isReady) {
            return;
        }

        animateCamera(cameraPosition);
    }, [cameraPosition, isReady]);

    function renderHud() {
        if (!isReady) {
            return (
                <LoaderWrapper>
                    <Loader color={color} text='Loading...' debounce={500} />
                </LoaderWrapper>
            );
        }

        return (
            <HudWrapper>
                <Hud config={config} items={items} timeline={timeline} />
            </HudWrapper>
        );
    }

    return (
        <Wrapper
            className='ModelViewer-wrapper'
            data-testid='ModelViewer-wrapper'
            width={width}
            height={height}
        >
            <BabylonScene />
            {renderHud()}
        </Wrapper>
    );
}

export default ModelViewer;
