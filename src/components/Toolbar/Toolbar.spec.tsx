import { ToolbarDriver } from './Toolbar.driver';
import Chance from 'chance';

const chance = new Chance();

describe('Toolbar', () => {
    let driver: ToolbarDriver;

    beforeAll(() => {
        driver = new ToolbarDriver();
    });

    it('should render button', () => {
        const label = chance.word();

        const element = driver.given
            .props({
                title: label,
            })
            .when.rendered();

        const wrapperClassName = element.get.wrapperClassName();
        const innerText = element.get.label();

        expect(wrapperClassName).toContain('Toolbar-wrapper');
        expect(innerText).toBe(label);
    });

    it('should click button', () => {
        const callback = jest.fn();

        driver.given
            .props({
                onClick: callback,
            })
            .when.rendered()
            .when.clicked();

        expect(callback).toHaveBeenCalledTimes(1);
    });
});

describe('Toolbar snapshots', () => {
    let driver: ToolbarDriver;

    beforeAll(() => {
        driver = new ToolbarDriver();
    });

    it('should match snapshot', () => {
        expect(driver.when.snapshot()).toMatchSnapshot();
    });
});
