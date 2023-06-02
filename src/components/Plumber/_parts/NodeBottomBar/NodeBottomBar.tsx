import { useMemo } from 'react';
import { CustomNodeProps } from '../../nodes/node.types';
import { Value, Wrapper } from './NodeBottomBar.style';

export type NodeBottomBarProps = CustomNodeProps & {};

export function NodeBottomBar(props: NodeBottomBarProps) {
  const { data } = props;

  const items = useMemo(() => {
    return [
      data.model?.modelType,
      data.model?.modelName,
      add(data.model?.temperature, ' temp'),
      add(data.tokenCount, 'tokens'),
      data.api?.apiType,
      data.api?.formatInput,
    ].filter((i) => i);
  }, [data]);

  function renderItems() {
    return items
      .filter((i) => i)
      .map((item, index) => {
        return <Value key={index}>{item}</Value>;
      });
  }

  return (
    <Wrapper className='NodeBottomBar-wrapper' data-testid='NodeBottomBar-wrapper'>
      {renderItems()}
    </Wrapper>
  );
}

const add = (value: string, units: string) => {
  if (!value) {
    return '';
  }

  return `${value} ${units}`;
};

export default NodeBottomBar;
