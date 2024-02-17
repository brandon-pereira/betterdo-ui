import { LayoutGroup } from 'framer-motion';
import { cloneElement, Children } from 'react';

import {
    Container,
    TabsBody,
    TabBodyItem,
    TabsHeader,
    ActiveTabHeaderBackground,
    TabHeaderItem
} from './Tabs.styles';

interface Props {
    selectedIndex?: number;
    onChange: (num: number) => void;
    color?: string;
    children: React.ReactElement[];
    titles: string[];
}
function Tabs({ selectedIndex, onChange, color, children, titles }: Props) {
    return (
        <Container>
            <LayoutGroup>
                <TabsHeader color={color}>
                    {titles.map((title, index) => (
                        <TabHeaderItem
                            key={index}
                            $selected={selectedIndex === index}
                            onClick={() => onChange(index)}
                            color={color}
                        >
                            {title}
                            {selectedIndex === index && (
                                <ActiveTabHeaderBackground
                                    color={color}
                                    layout
                                    layoutId="active-tab"
                                    inherit={false}
                                />
                            )}
                        </TabHeaderItem>
                    ))}
                </TabsHeader>
            </LayoutGroup>
            <TabsBody>
                {Children.map(children, (value, index) => {
                    return cloneElement(value, {
                        $selected: index === selectedIndex
                    });
                })}
            </TabsBody>
        </Container>
    );
}

export const Tab = TabBodyItem;
export default Tabs;
