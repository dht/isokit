import Bezier from '../Bezier/Bezier.container';
import ControlsBez from '../Controls/ControlsBez.container';
import ControlsPos from '../Controls/ControlsPos.container';
import ObjectSelector from '../ObjectSelector/ObjectSelector.container';
import Pad from '../Pad/Pad.container';
import PlayLine from '../PlayLine/PlayLine.container';
import Playback from '../Playback/Playback.container';
import Timeline from '../Timeline/Timeline.container';
import Easing from '../Toolbar/Easing.container';
import Toolbar from '../Toolbar/Toolbar.container';
import { Center, Content, Row, Wrapper } from './SceneBuilder.style';
import classnames from 'classnames';

export type SceneBuilderProps = {
  isPadOn: boolean;
  isBezierOn: boolean;
  isPerspectiveOn: boolean;
  isDimmerOn: boolean;
};

export function SceneBuilder(props: SceneBuilderProps) {
  const { isPadOn, isBezierOn, isPerspectiveOn, isDimmerOn } = props;

  function renderMainButton() {
    return isPadOn ? <Pad /> : <Playback />;
  }

  function renderBezier() {
    return isBezierOn ? <Bezier /> : <ControlsBez />;
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
          <Center>
            <ControlsPos />
            <Easing />
            {renderBezier()}
          </Center>
          <Toolbar />
          {renderMainButton()}
        </Row>
      </Content>
    </Wrapper>
  );
}

export default SceneBuilder;
