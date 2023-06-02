import classnames from 'classnames';
import CameraInfoContainer from '../CameraInfo/CameraInfo.container';
import ControlsContainer from '../Controls/Controls.container';
import ControlsBez from '../Controls/ControlsBez.container';
import ObjectSelector from '../ObjectSelector/ObjectSelector.container';
import PlayLine from '../PlayLine/PlayLine.container';
import Playback from '../Playback/Playback.container';
import TimeInfoContainer from '../TimeInfo/TimeInfo.container';
import Timeline from '../Timeline/Timeline.container';
import Easing from '../Toolbar/Easing.container';
import ParamsContainer from '../Toolbar/Params.container';
import Toolbar from '../Toolbar/Toolbar.container';
import Txt from '../Txt/Txt';
import UIPermutation from '../UIPermutation/UIPermutation.container';
import {
  Center,
  Content,
  Data,
  FullScreen,
  Reload,
  Row,
  TogglePanel,
  Wrapper,
} from './SceneBuilder.style';
import SheetContainer from '../Sheet/Sheets.container';
import { useToggle } from 'react-use';

export type SceneBuilderProps = {
  isPerspectiveOn: boolean;
  isDimmerOn: boolean;
  dotId?: string;
  layerId?: string;
};

export function SceneBuilder(props: SceneBuilderProps) {
  const { isPerspectiveOn, isDimmerOn, dotId } = props;
  const [nudge, toggle] = useToggle(false);

  function renderCentralLeft() {
    return <ControlsContainer />;
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
    return (
      <Playback>
        <UIPermutation />
      </Playback>
    );
  }

  function onFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  function onReload() {
    localStorage.clear();
    document.location.reload();
  }

  const className = classnames('SceneBuilder-wrapper', {
    perspective: isPerspectiveOn,
    dimmer: isDimmerOn,
    nudge,
  });

  return (
    <Wrapper className={className} data-testid='SceneBuilder-wrapper'>
      <FullScreen onClick={onFullScreen} />
      <TogglePanel onClick={toggle} />
      <Reload onClick={onReload} />
      <Content className='content'>
        <PlayLine />
        <Timeline />
        <Row>
          <ObjectSelector />
          <CameraInfoContainer />
          <ParamsContainer />
          <Center>
            {renderCentralLeft()}
            {renderCentralRight()}
          </Center>
          <Toolbar />
          {renderMainButton()}
        </Row>
      </Content>
      <Txt />
      <Data>
        <SheetContainer />
      </Data>
    </Wrapper>
  );
}

export default SceneBuilder;
