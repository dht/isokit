import classnames from 'classnames';
import CameraInfoContainer from '../CameraInfo/CameraInfo.container';
import ControlsBez from '../Controls/ControlsBez.container';
import ObjectSelector from '../ObjectSelector/ObjectSelector.container';
import Pad from '../Pad/Pad.container';
import PlayLine from '../PlayLine/PlayLine.container';
import Playback from '../Playback/Playback.container';
import TimeInfoContainer from '../TimeInfo/TimeInfo.container';
import Timeline from '../Timeline/Timeline.container';
import Easing from '../Toolbar/Easing.container';
import Toolbar from '../Toolbar/Toolbar.container';
import { controls } from './SceneBuilder.controls';
import { Center, Content, Row, SmallPrint, Subtext, Text, Wrapper } from './SceneBuilder.style';

export type SceneBuilderProps = {
  isPadOn: boolean;
  isPerspectiveOn: boolean;
  isDimmerOn: boolean;
  dotId?: string;
  layerId?: string;
};

export function SceneBuilder(props: SceneBuilderProps) {
  const { isPadOn, isPerspectiveOn, isDimmerOn, dotId, layerId = 'dots' } = props;

  function renderCentralLeft() {
    const Cmp = controls[layerId];

    if (!Cmp) {
      return null;
    }

    return <Cmp />;
  }

  function renderCentralRight() {
    if (!dotId) {
      return <TimeInfoContainer />;
    }

    return (
      <>
        <Easing />
        <ControlsBez />;
      </>
    );
  }

  function renderMainButton() {
    return isPadOn ? <Pad /> : <Playback />;
  }

  const className = classnames('SceneBuilder-wrapper', {
    perspective: isPerspectiveOn,
    dimmer: isDimmerOn,
  });

  return (
    <Wrapper className={className} data-testid='SceneBuilder-wrapper'>
      <Content className='content'>
        <PlayLine />
        <Timeline />
        <Row>
          <ObjectSelector />
          <CameraInfoContainer />
          <Center>
            {renderCentralLeft()}
            {renderCentralRight()}
          </Center>
          <Toolbar />
          {renderMainButton()}
        </Row>
      </Content>
      <Text>MODELZ</Text>
      <Subtext>== Get yours today ==</Subtext>
      <SmallPrint>
        Regular maintenance and servicing of the modelz hovercraft are essential for optimal
        performance and safety. VR training on Vision Ultra is required to operate a hovercraft in
        the case of engine failure.
      </SmallPrint>
    </Wrapper>
  );
}

export default SceneBuilder;
