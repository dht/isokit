import { formatPrice, formatSeconds } from '../../_utils/format';
import { Gap, LoaderContainer } from '../../nodes/node.Base.style';
import { CustomNodeProps } from '../../nodes/node.types';
import { Loader } from '../Loader/Loader';
import { Value, Wrapper } from './NodeTopBar.style';

export type NodeTopBarProps = CustomNodeProps & {};

export function NodeTopBar(props: NodeTopBarProps) {
  const { data } = props;

  function renderLoader() {
    return (
      <LoaderContainer>
        <Loader isRunning={data.isRunning} />
      </LoaderContainer>
    );
  }

  function renderDuration() {
    if (data && data.duration) {
      return formatSeconds(data.duration) + 's';
    }
  }

  function renderPrice() {
    if (data && data.price) {
      return formatPrice(data.price);
    }
  }

  function renderItems(items: (string | undefined)[]) {
    return items
      .filter((i) => i)
      .map((item, index) => {
        return <Value key={index}>{item}</Value>;
      });
  }

  return (
    <Wrapper className='NodeTopBar-wrapper' data-testid='NodeTopBar-wrapper'>
      {renderItems([data.modelName, renderDuration(), renderPrice()])}
      <Gap />
      {renderLoader()}
    </Wrapper>
  );
}

export default NodeTopBar;
