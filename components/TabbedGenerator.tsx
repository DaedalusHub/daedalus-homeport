import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { tabs } from '@/constants/generators';
import { Generator } from './Generator';

export function TabList({ tabList, selectedTab, setSelectedTab }) {
    return (
        <Tab.List className="space-x-4 tabs tabs-boxed  ">
            {tabList.map((tab) => (
                <Tab
                    key={tab.name}
                    className={`tab ${
                        selectedTab === tab.tab ? 'bg-primary' : 'bg-primary-focus'
                    } hover:bg-primary text-primary-content`}
                    onClick={() => setSelectedTab(tab.tab)}
                >
                    {tab.name}
                </Tab>
            ))}
        </Tab.List>
    );
}

export function TabbedGenerator({ generators }) {
    const [selectedTab, setSelectedTab] = useState(tabs[0].tab);
    const [state, setState] = useState(
        Object.values(generators).reduce((acc, generator) => {
            acc[generator.name] = generator.value;
            return acc;
        }, {})
    );

    const setValue = (key, value) => {
        setState((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const getInputValue = (name) => {
        return state[name];
    };

    return (
        <Tab.Group>
            <TabList
                tabList={tabs}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
            <Tab.Panels className="w-fit max-w-full w-9/12 sm:w-11/12 md:w-10/12 xl:w-4/5">
                {tabs.map((tab) => (
                    <Tab.Panel key={tab.tab} className="space-y-6">
                        {Object.values(generators)
                            .filter((generator) => generator.tab === tab.tab)
                            .map((generator) => (
                                <Generator
                                    key={generator.name}
                                    generator={generator}
                                    value={state[generator.name]}
                                    setValue={(value) => setValue(generator.name, value)}
                                    getInputValue={(name) => getInputValue(name)}
                                />
                            ))}
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    );
}
